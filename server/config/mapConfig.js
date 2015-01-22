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
            var service = req.params.service,
                location = req.params.postcode,
                query;

            if (serviceArray.parking.indexOf(service) !== -1 ) {
                
                
                if (location === undefined) {
                    query = "?" + services + service;

                } else if (service === undefined) {
                    query = "?" + locations + location;

                } else {
                    query = "?" + locations + location + 
                        "&" + services + service;

                }


                return cb(null, url.parkingApi + query, { "Accept": "application/json" });
            }
            else if (serviceArray.recycling.indexOf(service) !== -1 ) {
                
                if (location === undefined) {
                    query = "?" + services + service;

                } else if (service === undefined) {
                    query = "?" + locations + location;

                } else {
                    query = "?" + locations + location + 
                        "&" + services + service;

                }


                return cb(null, url.recyclingApi + query, { "Accept": "application/json" });    
            }else {
                if (location === undefined) {
                    query = "?" + services + service;

                } else if (service === undefined) {
                    query = "?" + locations + location;

                } else {
                    query = "?" + locations + location + 
                        "&" + services + service;

                }


                return cb(null, url.nearestApi + query, { "Accept": "application/json" }); 
            }
        },
        localMapper: function localInfoMapper (req, cb) {
            var uprn = req.params.uprn;

            var query = "?" + exactLocations + uprn + "&tab=m";

            return cb(null, url.nearestApi + query, { "Accept": "application/json" });
        }
    };

}());
