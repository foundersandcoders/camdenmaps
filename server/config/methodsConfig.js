(function () {
    "use strict";

    var convertToJson= require("../handlers/convertXml.js").convertToJson;

	module.exports = [
        {
            name: 'cacheNearest', 
            method: convertToJson,
            options: {
                cache: { 
                    cache: 'memory', 
                    expiresIn: 30 * 1000 
                }
            }
        }
	]
}());