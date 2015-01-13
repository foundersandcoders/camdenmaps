var express   = require('express');
var request   = require('request');
var httpProxy = require('http-proxy');
var s3Policy  = require('./server/s3');
var sm        = require('sitemap');
var os        = require('os');
var pXor      = require('protractor-ci');
var CONFIG    = require('config');
var port      = process.env.PORT || 7777;
var app       = express();

pXor.initRecorder();

// proxy api requests
app.all('/proxy/*', function(req, res, next) {
  // transform request URL into remote URL
  var apiUrl = 'http:'+CONFIG.API_URL+'/'+req.params[0];
  var r = null;

  // preserve GET params
  if (req._parsedUrl.search) {
    apiUrl += req._parsedUrl.search;
  }

  // handle POST / PUT
  if (req.method === 'POST' || req.method === 'PUT') {
    r = request[req.method.toLowerCase()]({uri: apiUrl, json: req.body});
  } else {
    r = request(apiUrl);
  }

  // pipe request to remote API
  req.pipe(r).pipe(res);
});

app.use(express.static(__dirname + '/static'));
app.listen(port);
