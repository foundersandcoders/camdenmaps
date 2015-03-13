camdenmaps
==========
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/foundersandcoders/camdenmaps?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/foundersandcoders/camdenmaps.svg?branch=master)](https://travis-ci.org/foundersandcoders/camdenmaps) [![Code Climate](https://codeclimate.com/github/foundersandcoders/camdenmaps/badges/gpa.svg)](https://codeclimate.com/github/foundersandcoders/camdenmaps)[![Test Coverage](https://codeclimate.com/github/foundersandcoders/camdenmaps/badges/coverage.svg)](https://codeclimate.com/github/foundersandcoders/camdenmaps)

maps.camden.gov.uk site

# Developing

### Installation

Once you have cloned with git, run:

install:

```
npm install gulp -g
```

and use command:

```
gulp 
```

This will install all dependencies, minify the html, and compile the sass and js files (browserify).



### Tests

To run acceptance tests, use command: 

```
gulp test
```

If you prefer to run all the tests individually, please use these commands:

To run server tests:

```
gulp server-test
```

To run unit tests, use command: 

```
gulp unit-test
```

E2E on saucelabs:

```
gulp e2e
````

E2E locally (with chrome):

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

Travis is set up so that it runs

```
gulp travis
```

before deploying. This compiles the sass, html, and angular files and minifies them before deploying.