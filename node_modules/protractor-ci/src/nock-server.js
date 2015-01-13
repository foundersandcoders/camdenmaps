var fs     = require('fs');
var nock   = require('nock');
var path   = require('path');
var mkdirp = require('mkdirp');
var Q      = require('q');

var nockRecordingPath = path.resolve(process.cwd(), process.env.MOCK_API_PATH || 'mock-api.json');

var startRecording = function() {
  console.log('child starting recording!!!');
  nock.recorder.rec({
    output_objects: true
    //enable_reqheaders_recording: true
  });
  process.send('nock-recording-started');
}


var writeMocks = function() {
  var dfd = Q.defer();

  console.log('@-->writing mocks!!', nockRecordingPath);

  // create directory if it doesn't exist
  mkdirp.sync(path.dirname(nockRecordingPath));

  var mockData = JSON.stringify(nock.recorder.play());

  fs.writeFile(nockRecordingPath, mockData, function(err) {
    if (err) {
      console.log('@-->unable to save nock file');
      throw err.message;
    } else {
      console.log('@-->nock file saved');
      process.send('nock-recording-finished');
      dfd.resolve();
    }
  });
  return dfd.promise;
}


var startPlayback = function() {
  console.log('@-->playback mode detected');
  console.log('@-->reading mocks!!!', nockRecordingPath);
  var nockDefs = nock.loadDefs(nockRecordingPath);
  var nocks = nock.define(nockDefs);

  process.send('nock-playback-started');
}


// to be used by test server
var initRecorder = function() {
  if (!process.send) { return; };
  process.on('message', function(m) {
    console.log('@-->child received message', m);
    switch (m) {
      case 'start-nock-recording':
        startRecording();
        break;
      case 'stop-nock-recording':
        console.log('writing mocks!!!');
        writeMocks();
        break;
      case 'start-nock-playback':
        console.log('starting playback!!!');
        startPlayback();
        break;
    }
  });
  console.log('sending connection notice!');
  process.send('nock-child-connected');
}

module.exports = initRecorder;
