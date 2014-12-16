/***********************************************
*   MAPCONFIG.JS
*   Description: Defines the mapUri functions for routes
*   Use: Imported by routesConfig.js
*
************************************************/
//  TODOS:
//  Factorize this into one repeatable function, this isn't DRY
//
//**********************************************
(function () {
    "use strict";

    var Config = require("./serverConfig.js"),
        url = Config.map.url,
        services = Config.map.query.service,
        locations = Config.map.query.location,
        exactLocations = Config.map.query.uprn;

    module.exports = {

        nearestMapper: function nearestMapper (req, cb) {
            var service = req.params.service,
                location = req.params.postcode;

            if (location === undefined) {
                var query = "?" + services + service;

            } else if (service === undefined) {
                var query = "?" + locations + location;

            } else {
                var query = "?" + locations + location + 
                    "&" + services + service;

            }
            return cb(null, url.nearestApi + query, { "Accept": "application/json" });
        },
        localMapper: function localInfoMapper (req, cb) {
            var uprn = req.params.uprn;

            var query = "?" + exactLocations + uprn + "&tab=m";

            return cb(null, url.nearestApi + query, { "Accept": "application/json" });
        }
    }

}());
