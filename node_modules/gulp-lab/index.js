var child_process = require('child_process');
var Through2 = require('through2');
var Join = require('path').join;
var PluginError = require('gulp-util').PluginError;

var PLUGIN_NAME = 'gulp-lab';


function _isObject (val) {

  return Object.prototype.toString.call(val) === '[object Object]';
}

function _isString (val) {

  return typeof val === 'string';
}

/**
 * Merge args with Array or String args from options
 */
function _mergeArgs (args, optionsArgs) {

  if (_isString(optionsArgs)) { // String options

    args = args.concat(optionsArgs.split(' '));

  } else if (Array.isArray(optionsArgs)) { // Array options

    args = args.concat(optionsArgs);
  }

  return args;
}


module.exports = function (options) {

  var paths = [];
  var emitErr = false;

  // We expect that lab was declared as a project dependencies, and run directly its main script
  // this way, it can be executed on every platform.
  var args = [Join(process.cwd(), 'node_modules', 'lab', 'bin', 'lab')];

  return Through2.obj(function (file, enc, cb) {

    paths.push(file.path);

    this.push(file);

    cb();

  }, function (cb) {

    var stream = this;


    if (_isObject(options)) { // Object options

      if (!_isObject(options.opts)) {

        stream.emit('error', new PluginError(PLUGIN_NAME, 'Lab - Object property "opts" must be an object!'));
        cb();
        return;
      }

      if (options.opts && typeof options.opts.emitLabError !== 'boolean') {

        stream.emit('error', new PluginError(PLUGIN_NAME, 'Lab - Object property "emitLabError" must be a boolen!'));
        cb();
        return;
      }

      // args is optional
      args = _mergeArgs(args, options.args);

      // emit lab error?
      emitErr = options.opts.emitLabError;

    } else { // String or Array options

      args = _mergeArgs(args, options);
    }


    // Spawn process
    var child = child_process.spawn(process.execPath, process.execArgv.concat(args.concat(paths)), {stdio: 'inherit'});

    child.on('exit', function (code) {
      if (code !== 0 && emitErr) {
        stream.emit('error', new PluginError(PLUGIN_NAME, 'Lab exited with errors.'));
      }
      cb();
    });

  });
}
