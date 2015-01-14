camdenmaps
==========
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/foundersandcoders/camdenmaps?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/foundersandcoders/camdenmaps.svg?branch=master)](https://travis-ci.org/foundersandcoders/camdenmaps) [![Code Climate](https://codeclimate.com/repos/54b662d26956803c3300e1b5/badges/6f7863dabadfdeacb710/gpa.svg)](https://codeclimate.com/repos/54b662d26956803c3300e1b5/feed)[![Test Coverage](https://codeclimate.com/github/foundersandcoders/camdenmaps/badges/coverage.svg)](https://codeclimate.com/github/foundersandcoders/camdenmaps)

maps.camden.gov.uk site

To run, use command:

```
npm start
```

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

To convert yaml files to json, use command: 
```
node server/lib/yml2swagger.js server/lib/yaml server/public/output
```
where arg[0] is the files to be converted and arg[1] is where the file should be outputed.
```

To run browserify, use command: 
```
gulp browserify
```
or
```
gulp browserify-watch
```

To use the csv to json converter, please run this command:
```
node server/public/js/csvtojson.js
```

To include gov.uk sass files in our project simply import to begin to use!

```
@import '_conditionals';
@import '_typography';
```

For more information on using gov.uk styles see documentation here: https://github.com/alphagov/govuk_frontend_toolkit

