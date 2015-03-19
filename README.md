camdenmaps
==========
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/foundersandcoders/camdenmaps?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/foundersandcoders/camdenmaps.svg?branch=master)](https://travis-ci.org/foundersandcoders/camdenmaps) [![Code Climate](https://codeclimate.com/github/foundersandcoders/camdenmaps/badges/gpa.svg)](https://codeclimate.com/github/foundersandcoders/camdenmaps)

maps.camden.gov.uk site

# Developing

### Installation

Once you have cloned with git, run:

install:

```
npm install gulp -g
npm install
```

Inside ```test/frontend/config```, create a file named ```sauce.conf.json``` containing:
```
{
    "uname": "<your saucelabs username>",
    "akey": "<your saucelabs accesskey>"
}
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

To view performance metrics, start up a selenium server [webdriver-manager start] then use command: 

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


Please run `gulp build` before pushing up to master. Travis will deploy master to heroku, given the tests pass.
