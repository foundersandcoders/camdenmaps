/***********************************************
*   CACHE.JS
*   Description: 
*
************************************************/

;(function() {
    "use strict";

    var Nodecache = require("node-cache");

    // milliseconds * seconds * minutes * hours * days = 1 week as standard
    // this can be overwritten when calling cache.set (i.e for streetworks)
    var cache = new Nodecache({ stdTTL: 1000 * 60 * 60 * 24 * 7 });

    module.exports = cache;

}());
