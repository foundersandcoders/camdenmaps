(function () {
    "use strict";

    var mapConfig = require("./mapConfig.js");

	module.exports = [
        {
            name: 'cacheNearest', 
            method: mapConfig.nearestMapper,
            options: {
                cache: { 
                    cache: 'memory', 
                    expiresIn: 30 * 1000 
                }
            }
        }
	]
}());