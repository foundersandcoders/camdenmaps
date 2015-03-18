var browserPref = require('browser-perf');
var creds = require("../config/sauce.conf.json")

var options = {
    selenium: 'http://ondemand.saucelabs.com',
    username: creds.uname,
    accesskey: creds.aKey,
    browsers: ['chrome', 'firefox'],
    actions: 'scroll'
}; 



browserPerf('http://localhost:8080', function(err, res){}, options);