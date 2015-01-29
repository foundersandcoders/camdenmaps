/***********************************************
*   CACHE.JS
*   Description: 
*
************************************************/

var Nodecache = require("node-cache");

// 86400000 is for 24 hours
var cache = new Nodecache({ stdTTL: 86400000 });

module.exports = cache;
