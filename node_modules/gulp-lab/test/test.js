var child_process = require('child_process');
var EventEmitter = require('events').EventEmitter;
var Code = require('code');
var Lab = require('lab');
var Gutil = require('gulp-util');
var Glab = require('../index');
var es = require('event-stream');
var sinon = require('sinon');

var lab = exports.lab = Lab.script();
var after = lab.after;
var before = lab.before;
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;

describe('index', function () {

  it('should return stream', function (done) {

    var stream = Glab();

    expect(Gutil.isStream(stream)).to.equal(true);

    done();
  });

  it('should run truthy test by gulp-lab module with String options', function (done) {

    var stream = Glab('-v -l');

    stream.pipe(es.wait(done));
    stream.end(new Gutil.File({path: './test/truthy.js'}));
  });

  it('should run truthy test by gulp-lab module with Array options', function(done) {

    var stream = Glab(['-v', '-l']);

    stream.pipe(es.wait(done));
    stream.end(new Gutil.File({path: './test/truthy.js'}));
  });

  it('should emit an error if options object is passed with missing opts property', function (done) {

    var failure;
    var stream = Glab({
      args: '-s -l'
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/Object property "opts" must be an object!/i);
      done();
    }));
    stream.end();
  });

  it('should emit an error if options object is passed with missing emitLabError property', function (done) {

    var failure;
    var stream = Glab({
      args: '-s -l',
      opts: {}
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/Object property "emitLabError" must be a boolen!/i);
      done();
    }));
    stream.end();
  });

  it('should emit an error if options object is passed with NON boolean emitLabError property', function (done) {

    var failure;
    var stream = Glab({
      args: '-s -l',
      opts: {
        emitLabError: 'true'
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/Object property "emitLabError" must be a boolen!/i);
      done();
    }));
    stream.end();
  });

  it('should emit an error if the test fail', function (done) {

    var failure;
    var stream = Glab({
      args: '-s -l',
      opts: {
        emitLabError: true
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/exited with errors/i);
      done();
    }));
    stream.end(new Gutil.File({path: './test/fail.js'}));
  });

  it('should NOT emit an error if the test fail', function (done) {

    var failure;
    var stream = Glab({
      args: '-s -l',
      opts: {
        emitLabError: false
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure).to.equal(undefined);
      done();
    }));
    stream.end(new Gutil.File({path: './test/fail.js'}));
  });

  it('should emit an error if the test fail - missing args', function (done) {

    var failure;
    var stream = Glab({
      opts: {
        emitLabError: true
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/exited with errors/i);
      done();
    }));
    stream.end(new Gutil.File({path: './test/fail.js'}));
  });

  it('should NOT emit an error if the test fail - missing args', function (done) {

    var failure;
    var stream = Glab({
      opts: {
        emitLabError: false
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure).to.equal(undefined);
      done();
    }));
    stream.end(new Gutil.File({path: './test/fail.js'}));
  });

  it('should emit an error when running fail with Array arguments and filter on tests', function (done) {

    var failure;
    var stream = Glab({
      args: ['-s', '-l', '-g should fail test'],
      opts: {
        emitLabError: true
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/exited with errors/i);
      done();
    }));
    stream.end(new Gutil.File({path: './test/fail.js'}));
  });

  describe('spawning the Lab process', function () {

    var argv;
    var path;
    var spawn;

    before(function (done) {
      var child = new EventEmitter();
      var stream;

      argv = process.execArgv;
      path = process.execPath;
      spawn = sinon.stub(child_process, 'spawn').returns(child);

      process.execArgv = [ '--harmony' ];
      process.execPath = 'nodejs';

      // Returned stream should never do anything since spawn is stubbed out.
      stream = Glab('-d -s -l');
      stream.pipe(es.wait(done));
      stream.end(new Gutil.File({path: '/test/truthy.js' }));
      child.emit('exit', 0);
    });

    after(function (done) {
      spawn.restore();
      process.execArgv = argv;
      process.execPath = path;
      done();
    });

    it('invokes the child with the same node arguments as the parent', function (done) {
      expect(spawn.calledOnce, 'spawn not called').to.be.true;
      expect(spawn.firstCall.args[0], 'wrong command').to.equal('nodejs');
      expect(spawn.firstCall.args[1][0], 'bad argument').to.equal('--harmony');
      done();
    });
  });

});
