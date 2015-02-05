/***********************************************
*   MAPCONFIG.JS
*   Description: Defines the mapUri functions for routes
*   Use: Imported by routesConfig.js
*
************************************************/

;(function () {
    "use strict";

    var Config = require("./serverConfig.js"),
        convertToJson= require("../handlers/convertXml.js").convertToJson,
        url = Config.map.url,
        serviceArray = Config.map.serviceArrays,
        services = Config.map.query.service,
        locations = Config.map.query.location,
        cache = require("./cache.js"),
        lngs = Config.map.query.lng,
        lats = Config.map.query.lat,
        exactLocations = Config.map.query.uprn,
        cap = require("../lib/capitalize.js"),
        aliasServices = require("../lib/alias.js");

    module.exports = {

        nearestMapper: function nearestMapper (req, cb, err, next) {

            var service, location, query, lat, lng, apiUrl, defaultLocation;
            service = cap(req.params.service);
            location = req.params.postcode;
            defaultLocation = "NW1 0NE";
            lat = req.params.latitude;
            lng = req.params.longitude;

            //TODO: green query is not the same, needs to be changed depending on service requested

            //api url routed based on service requested
            apiUrl  = (serviceArray.parking.indexOf(service) !== -1)    ? url.parkingApi
                    : (serviceArray.recycling.indexOf(service) !== -1)  ? url.recyclingApi
                    : url.nearestApi;

            
            //change value of services query depending on service being searched
            services    = (serviceArray.recycling.indexOf(service) !== -1) ? "recycle="
                        : "find=";

           
            //map our service names to camden service names
            service = aliasServices(service);

            //query constructed based on combination of services and/or address
            query   = (lat !== undefined) ? "?" + services + service + "&" + lats + lat + "&" + lngs + lng
                    : (location === undefined) ? "?" + services + service + "&" + locations + defaultLocation
                    : (service === undefined)  ? query = "?" + locations + location 
                    : "?" + locations + location + "&" + services + service;

            console.log(apiUrl + query); 
            //redirect request to proxy
            return cb(null, apiUrl + query, { "Accept": "application/json" });

        },
        localMapper: function localInfoMapper (req, cb) {
            var uprn = req.params.uprn;
            var query = "?" + exactLocations + uprn + "&tab=m";

            return cb(null, url.nearestApi + query, { "Accept": "application/json" });
        },
        streetworksMapper: function streetworksMapper (req, cb, err) {
            var location, query, lat, lng;
            location = req.params.postcode;
            lat = req.params.latitude;
            lng = req.params.longitude;
            query = (req.params.location) ? "?" + locations + location
                                        : "?" + lats + lat + "&" + lngs + lng;

            console.log(url.streetworksApi + query); 
            return cb(null, url.streetworksApi + query, { "Accept": "application/json" });
        }
    };

}());
