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
;(function () {
    "use strict";

    var Config = require("./serverConfig.js"),
        url = Config.map.url,
        serviceArray = Config.map.serviceArrays,
        services = Config.map.query.service,
        locations = Config.map.query.location,
        exactLocations = Config.map.query.uprn;

    module.exports = {

        nearestMapper: function nearestMapper (req, cb, err) {
            var service, location, query, apiUrl;
            service = req.params.service;
            location = req.params.postcode;

            //TODO: green query is not the same, needs to be changed depending on service requested

            //api url routed based on service requested
            apiUrl 
                = (serviceArray.parking.indexOf(service) !== -1)    ? url.parkingApi
                : (serviceArray.recycling.indexOf(service) !== -1)  ? url.recyclingApi
                : url.nearestApi;

            //query constructed based on combination of services and/or address
            if (location === undefined) {
                query = "?" + services + service;
            } else if (service === undefined) {
                query = "?" + locations + location;
            } else {
                query = "?" + locations + location + 
                    "&" + services + service;
            }
 
            return cb(null, apiUrl + query, { "Accept": "application/json" });

        },
        localMapper: function localInfoMapper (req, cb) {
            var uprn = req.params.uprn;

            var query = "?" + exactLocations + uprn + "&tab=m";

            return cb(null, url.nearestApi + query, { "Accept": "application/json" });
        }
    };

}());
