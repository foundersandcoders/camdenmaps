# Protractor CI

[![npm version](https://badge.fury.io/js/protractor-ci.svg)](http://badge.fury.io/js/protractor-ci)

# Warning

This project is **alpha** status. Use at your own risk.

# Goals

* Run E2E tests against all target browsers.
* Run E2E tests on Travis CI.
* Mock requests to external APIs (semi-automatically).

# Installation

~~~bash
npm install protractor-ci --save-dev
~~~

# Workflow

1. [Run E2E tests against locally against live dev API](#run-local-e2e-tests)
   This step records all external API requests for later playback.

2. [Verify test playback](#playback-e2e-tests)
   Uses the recorded mock requests from step 1.

3. [Run E2E tests against Sauce Labs](#playback-e2e-tests-using-saucelabs)
   Uses the recorded mock requests from step 1.

4. [Run E2E tests on Travis CI on deployment](#travis-ci-setup)
   Uses the recorded mock requests from step 1.

# Run Local E2E Tests

Define the task:

~~~javascript
var pXor = require('protractor-ci');

gulp.task('test:e2e:record', function(cb) {
  var opts = {
    nodeApp:   'test/app.js',
    nodeHost:  'localhost',
    nodePort:  7777,
    record:    true,
    mockFile:  'mocks/nock-mocks.json',
    specs: [
      'test/e2e/*.coffee'
    ]
  };

  pXor.e2e.testE2E(opts).then(function() { cb(); });
});
~~~

Run the task:

~~~bash
gulp test:e2e:record
~~~

# Playback E2E Tests

Define the task:

~~~javascript
var pXor = require('protractor-ci');

gulp.task('test:e2e:playback', function(cb) {
  var opts = {
    nodeApp:   'test/app.js',
    nodeHost:  'localhost',
    nodePort:  7777,
    playback:  true,
    mockFile:  'mocks/nock-mocks.json',
    specs: [
      'test/e2e/*.coffee'
    ]
  };

  pXor.e2e.testE2E(opts).then(function() { cb(); });
});
~~~

Run the task:

~~~bash
gulp test:e2e:playback
~~~

# Playback E2E Tests using SauceLabs

~~~javascript
var pXor = require('protractor-ci');

// define task to start sauce connect
gulp.task('start-sauce-connect', function(cb) {
  pXor.e2e.startSauceConnect().then(function() { cb(); });
});

// define test runner
gulp.task('test:e2e:ci', function(cb) {
  var opts = {
    nodeApp:   'test/app.js',
    nodeHost:  'localhost',
    nodePort:  7777,
    playback:  true,
    mockFile:  'mocks/nock-mocks.json',
    specs: [
      'test/e2e/*.coffee'
    ],
    browsers: [{
      browserName:         'chrome',
      build:               process.env.TRAVIS_BUILD_NUMBER,
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
    }, {
      browserName:         'firefox',
      build:               process.env.TRAVIS_BUILD_NUMBER,
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
    }, {
      browserName:         'safari',
      build:               process.env.TRAVIS_BUILD_NUMBER,
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
    }, {
      browserName:         'internet explorer',
      version:             11,
      build:               process.env.TRAVIS_BUILD_NUMBER,
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
    }, {
      browserName:         'internet explorer',
      version:             10,
      build:               process.env.TRAVIS_BUILD_NUMBER,
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
    }, {
      browserName:         'internet explorer',
      version:             9,
      build:               process.env.TRAVIS_BUILD_NUMBER,
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
    }, {
      browserName:         'internet explorer',
      version:             8,
      build:               process.env.TRAVIS_BUILD_NUMBER,
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
    }]
  };

  pXor.e2e.testE2E(opts).then(function() { cb() });
});

~~~

Now open two terminal windows.

In the first terminal:

~~~bash
gulp start-sauce-connect
~~~

Leave the terminal open. The task will let you know when it's ready to start the tests.

In the second terminal:

~~~bash
gulp test:e2e:ci
~~~

# Travis CI Setup

First follow [these instructions](https://docs.saucelabs.com/ci-integrations/travis-ci/).

Next, make sure the `before_install` and `addons` blocks exist in your `.travis.yml` file:

~~~yml
language: node_js
node_js:
- 'x.xx'

env:
  global:
  - secure: xxx
  - secure: yyy
  - NODE_ENV=travis

addons:
  sauce_connect: true

cache:
  directories:
    - node_modules

before_install:
- npm install
- node_modules/.bin/bower install --config.directory=path/to/test/server
~~~

The goal is to ensure that the dev server has everything it needs to be run by Travis. More steps may be required depending on your application.

Then, in your `package.json` file:

~~~javascript
{
  // ...
  "scripts": {
    "test": "gulp test:e2e:ci"
  },
  // ...
}
~~~
