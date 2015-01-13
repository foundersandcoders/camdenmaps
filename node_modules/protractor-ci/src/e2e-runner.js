var Q       = require('q');
var spawn   = require('child_process').spawn;
var fork    = require('child_process').fork;
var exec    = require('child_process').exec;
var sc      = require('sauce-connect-launcher');
var request = require('request');
var t       = require('gulp-util')
var fs      = require('fs');
var path    = require('path');
var mkdirp  = require('mkdirp');

// spawned processes
var testServerFork    = null;
var scSpawn           = null;
var exitCode          = 0;
var mockApi           = null;
var nockRecordingId   = null;

// recursively try until test server is ready. return promise.
var pingTestServer = function(host, port, dfd) {
  // ensure minimum values are provided
  if (!host) { throw "Error: test server host not provided."; }
  if (!port) { throw "Error: test server port not provided."; }

  // first run, init promise, start server
  if (!dfd) { var dfd = Q.defer(); }

  // poll dev server until it response, then resolve promise.
  request('http://'+host+':'+port, function(err) {
    if (err) {
      setTimeout(function() {
        t.log('test server failed, checking again in 100ms');
        pingTestServer(host, port, dfd);
      }, 100);
    } else {
      t.log('test server verified.');
      dfd.resolve()
    }
  });

  return dfd.promise;
};


var setSauceCreds = function() {
  var sauceConfig = {};
  try {
    var sauceConfig = require('./test/config/sauce.json')
  } catch (ex) {}

  if (!process.env.SAUCE_USERNAME) {
    if (sauceConfig.SAUCE_USERNAME) {
      process.env.SAUCE_USERNAME = sauceConfig.SAUCE_USERNAME;
    } else {
      throw "Cannot find SAUCE_USERNAME value in env or test/config/sauce.json";
    }
    }

  if (!process.env.SAUCE_ACCESS_KEY) {
    if (sauceConfig.SAUCE_ACCESS_KEY) {
      process.env.SAUCE_ACCESS_KEY = sauceConfig.SAUCE_ACCESS_KEY;
    } else {
      throw "Cannot find SAUCE_ACCESS_KEY value in env or test/config/sauce.json";
    }
  }
}


var startSauceConnect = function() {
  var dfd = Q.defer();

  setSauceCreds();

  t.log('Starting', t.colors.cyan('Sauce Connect'), '...');

  sc({
    username:         process.env.SAUCE_USERNAME,
    accessKey:        process.env.SAUCE_ACCESS_KEY,
    verbose:          true,
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
    build:            process.env.TRAVIS_BUILD_NUMBER
  }, function(err, scProcess) {
    if (err) {
      t.log(t.colors.red('Error:'), 'Sauce connect failed to start:', t.colors.cyan(err.message));
      dfd.reject();
      throw err.message;
    }

    t.log(t.colors.cyan('Sauce Connect'), 'started.');
    scSpawn = scProcess;
    dfd.resolve();
  });

  return dfd.promise;
}


var startE2EServer = function(appPath, host, port, mockFilePath) {
  var env = process.env;
  var dfd = Q.defer();

  console.log('@-->mock file path', mockFilePath);

  env.PORT              = port;
  env.MOCK_API_PATH     = mockFilePath;
  env.NOCK_RECORDING_ID = nockRecordingId;
  testServerFork        = fork(appPath, [], {env: env});

  // ensure test server is running before anything else
  //pingTestServer(host, port).then(function() {
    //dfd.resolve();
  //});

  dfd.resolve();

  return dfd.promise;
}


var killE2EServer = function() {
  var dfd = Q.defer();

  t.log('Killing',  t.colors.cyan('E2E Server'));

  if (testServerFork) {
    testServerFork.on('close', function(code, signal) {
      t.log(t.colors.cyan('E2E server'), 'is dead.');
      dfd.resolve();
    });
    testServerFork.kill('SIGTERM');
  } else {
    dfd.resolve();
  }

  return dfd.promise;
}


var runE2ETest = function(conf, browser, specs, port, config) {
  var dfd = Q.defer();
  var env = JSON.parse(JSON.stringify(process.env));

  env.CAPABILITIES      = JSON.stringify(browser);
  env.SPECS             = JSON.stringify(specs);
  env.TEST_PORT         = JSON.stringify(port);
  env.NOCK_RECORDING_ID = JSON.stringify(nockRecordingId);
  env.CONFIG            = JSON.stringify(config);

  console.log('conf', conf);

  console.log('@-->spawning child pxor process!!');

  var protractorSpawn = spawn('protractor', [conf], {env: env});

  // pipe io to this process
  protractorSpawn.stdout.pipe(process.stdout);
  protractorSpawn.stderr.pipe(process.stderr);
  //process.stdin.pipe(protractorSpawn.stdin);

  protractorSpawn.on('exit', function(code, signal) {
    t.log('Killing protractor spawn with exit code', t.colors.red(code));
    if (code !== 0) {
      t.log(t.colors.red('Failure detected.'), 'This process will fail with code', t.colors.red(code));
      exitCode = code;
    }

    protractorSpawn.kill(0);
    dfd.resolve();
  });

  protractorSpawn.on('close', function(code, signal) {
    t.log('protractor spawn is dead.');
  });

  return dfd.promise;
}


var killSCSpawn = function() {
  var dfd = Q.defer();
  if (scSpawn) {
    t.log('@-->Closing Sauce Connect process.');
    scSpawn.close(function() {
      t.log('@-->Sauce Connect is dead.');
      cb();
    });
    scSpawn.kill('SIGTERM');
  } else {
    t.log('@-->No Sauce Connect to kill.');
    dfd.resolve();
  }

  return dfd.promise;
}


var runE2ETestSuite = function(browsers, conf, specs, port) {
  var dfd = Q.defer();
  var tests = [];

  if (browsers) {
    tests = tests.concat(browsers.map(function(b) {
      return function(prev) {
        return runE2ETest(conf, b, specs, port);
      }
    }));
  } else {
    tests.push(function(prev) {
      return runE2ETest(conf, null, specs, port)
    });
  }

  tests.push(function() {
    dfd.resolve();
  });

  tests.reduce(Q.when, Q());

  return dfd.promise;
}


var partial = function(func) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}

var sendRecordSignal = function() {
  console.log('@-->listening for connection notice...');
  var dfd = Q.defer();
  // TODO: define condition for this

  // verify signal received, return dfd
  testServerFork.on('message', function(m) {
    console.log('@-->caught signal from child!!', m)
    switch (m) {
      case 'nock-child-connected':
        // send record signal
        testServerFork.send('start-nock-recording');
        break;

      case 'nock-recording-started':
        console.log('@-->recording started!!!');
        dfd.resolve();
        break;
    }
  });

  return dfd.promise;
}

var sendStopRecordSignal = function() {
  var dfd = Q.defer();

  console.log('@-->sending stop record signal');

  // verify signal received, return dfd
  testServerFork.on('message', function(m) {
    console.log('@-->received message', m);
    switch (m) {
      case 'nock-recording-finished':
        dfd.resolve();
        break;
    }
  });

  // send record signal
  testServerFork.send('stop-nock-recording');

  return dfd.promise;
}


var sendPlaybackSignal = function() {
  var dfd = Q.defer();

  // verify signal received, return dfd
  testServerFork.on('message', function(m) {
    switch (m) {
      case 'nock-child-connected':
        testServerFork.send('start-nock-playback');
        break;
      case 'nock-playback-started':
        dfd.resolve();
        break;
    }
  });

  return dfd.promise;
}

var setRecordingId = function(opts) {
  var dfd = Q.defer();
  var idFile = process.cwd() + '/' + path.dirname(opts.mockFile) + '/.nock-recording-id';

  mkdirp.sync(path.dirname(opts.mockFile));

  if (opts.record) {
    // create net recording id
    nockRecordingId = "nock-recording-"+new Date().getTime();
    console.log('@-->setting new recording id', nockRecordingId);

    fs.writeFile(idFile, nockRecordingId, function(err) {
      if (err) {
        throw err;
        dfd.reject();
      }
      console.log('@-->nock id saved');
      dfd.resolve();
    });

  } else if (opts.playback) {
    // create directory if it doesn't exist
    console.log('@-->reading nock id from file');
    console.log('id file', idFile);

    fs.readFile(idFile, 'utf8', function(err, data) {
      if (err) {
        throw err;
        dfd.reject()
      }
      console.log('setting nock recording id to', data);
      nockRecordingId = data;
      dfd.resolve()
    });

    dfd.resolve();
  } else {
    //throw "Error: recording ID should not be set if not recording or playing back nock data";
    nockRecordingId = "nock-recording-"+new Date().getTime();
    dfd.resolve();
  }

  return dfd.promise;
}

var testE2E = function(opts) {
  var dfd       = Q.defer();
  var chain     = null;
  var e2EConfig = opts.e2EConfig;
  var specs     = opts.specs.map(function(item) {
    return process.cwd() + '/' + item;
  });

  console.log('@-->specs', specs);

  if (opts.record && !opts.nodeApp) {
    throw "Error: can only record when server is forked from this process."
  }

  if (!e2EConfig) {
    e2EConfig = __dirname + '/config.js';
  }

  console.log('@-->e2e config', e2EConfig);

  // should start server and record
  if (opts.record) {
    chain = [
      partial(setRecordingId, opts),
      sendRecordSignal,
      partial(runE2ETestSuite, opts.browsers, e2EConfig, specs, opts.nodePort),
      sendStopRecordSignal,
      killE2EServer,
      killSCSpawn
    ];
  } else if (opts.playback) {
    chain = [
      partial(setRecordingId, opts),
      sendPlaybackSignal,
      partial(runE2ETestSuite, opts.browsers, e2EConfig, specs, opts.nodePort),
      killE2EServer,
      killSCSpawn
    ];
  } else {
    chain = [
      partial(setRecordingId, opts),
      partial(runE2ETestSuite, opts.browsers, e2EConfig, specs, opts.nodePort),
      killE2EServer,
      killSCSpawn
    ];
  }

  // start sauce connect?
  if (opts.startSauceConnect) {
    chain.unshift(startSauceConnect);
  } else {
    t.log(t.colors.cyan('startSauceConnect'), 'is false. Bypassing sauce connect server.');
  }

  // start node server if defined
  if (!opts.nodeApp) {
    // ensure that node server is running before anything
    t.log(t.colors.cyan('nodeApp'), 'option not found. Piggybacking existing server.');
    chain.unshift(partial(pingTestServer, opts.nodeHost, opts.nodePort));
  }

  // resolve after all events finish
  chain.push(function() { dfd.resolve(); });

  // run chain of events sequentially
  chain.reduce(Q.when, Q());

  if (opts.nodeApp) {
    // just fucking start fuck
    startE2EServer(opts.nodeApp, opts.nodeHost, opts.nodePort, opts.mockFile, opts.config);
  }

  return dfd.promise;
};


process.on('exit', function () {
  if (testServerFork) {
    t.log('@-->exiting with code', exitCode);
    killE2EServer().then(function() { process.exit(exitCode); });
  }
});


module.exports = {
  testE2E:           testE2E,
  startSauceConnect: startSauceConnect,
};
