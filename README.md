camdenmaps
==========
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/foundersandcoders/camdenmaps?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/foundersandcoders/camdenmaps.svg?branch=master)](https://travis-ci.org/foundersandcoders/camdenmaps) [![Code Climate](https://codeclimate.com/github/foundersandcoders/camdenmaps/badges/gpa.svg)](https://codeclimate.com/github/foundersandcoders/camdenmaps)


This is a repository for Camden Council's ["Where's My Nearest" service.](http://maps.camden.gov.uk)

# Developing

### Pre-installation
1. If you haven't already, install [Node.js and npm](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).
2. Clone the project from git with:
```git clone https://github.com/foundersandcoders/camdenmaps.git && cd camdenmaps"```


### Installation

Once you have cloned with git, run:


```
npm install gulp -g
npm install
```

and use command:

```
gulp
```

This will minify the html, and compile the sass and js files (browserify).


### Tests

To run acceptance tests, use command:

```
gulp test
```

To view performance metrics, start up a selenium server:
```
gulp wd-start
```

and then in another terminal, use command:

```
gulp performance
```


If you prefer to run all the tests individually, please use these commands:

To run server tests:

```
gulp server-unit
```
and
```
gulp server-integration
```
To run end-to-end tests on Saucelabs, edit ```test/frontend/config/sauce.conf.json``` to contain your SauceLabs account details:
```
{
    "uname": "<your saucelabs username>",
    "akey": "<your saucelabs accesskey>"
}
```
and run:

```
gulp e2e
```

To run end-to-end tests on a local installation of chrome:

```
gulp e2e-local
```

### Building while developing

Browserify must be run when altering the angular files.

```
gulp watchify
```


When altering and .scss files, you must compile it to css with:

```
gulp sass-dev
```


### Travis

Before deploying to Travis, make sure to run `gulp build`. This compiles the sass, html, and angular files and minifies them before deploying.
