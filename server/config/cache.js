/***********************************************
*   CACHE.JS
*   Description: 
*
************************************************/

var Nodecache = require("node-cache");
var cache = new Nodecache({ stdTTL: 10000000000000000 });

module.exports = cache;