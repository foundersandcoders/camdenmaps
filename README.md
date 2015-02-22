camdenmaps
==========
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/foundersandcoders/camdenmaps?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/foundersandcoders/camdenmaps.svg?branch=master)](https://travis-ci.org/foundersandcoders/camdenmaps) [![Code Climate](https://codeclimate.com/repos/54b662d26956803c3300e1b5/badges/6f7863dabadfdeacb710/gpa.svg)](https://codeclimate.com/repos/54b662d26956803c3300e1b5/feed)[![Test Coverage](https://codeclimate.com/github/foundersandcoders/camdenmaps/badges/coverage.svg)](https://codeclimate.com/github/foundersandcoders/camdenmaps)

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

to install dependencies, run the sass compiler and browserify the app.

### Tests

To run acceptance tests, use command: 
```
npm test
```

To run server tests, use command: 
```
gulp server-test
```

To run unit tests, use command: 
```
gulp unit-test
```
### Yaml to JSON

When altering the Swagger config yaml file, you can covert it to JSON using:

```
gulp convertyaml
```

### Browserify

Browserify must be run when altering the angular files. 

To run browserify, use command: 

```
gulp browserify
```

or
```
gulp watchify
```

### Sass

When altering and .scss files, you must compile it to css with:

```
gulp sass-dev
```

### CSV to JSON

When altering the CSV file for constructing the services menu, convert it to JSON with this command:
```
gulp csvtojson
```


