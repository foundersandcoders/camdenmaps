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
        exactLocations = Config.map.query.uprn;

    //Clears the Cache
    cache.del("abcTest");

    //capitalize first letter of word (norm
    function cap(word) {
        return word[0].toUpperCase() + word.substring(1, word.length).toLowerCase();
    }

    function aliasServices(service) {
        return  service === "Wood"                                  ? "Timber"
                : service === "Batteries"                           ? "Household batteries"
                : service === "Cardboard and Paper"                 ? "Cardboard"
                : service === "Clothing and Textiles"               ? "Textiles and shoes"
                : service === "Nappies"                             ? "Nappies"
                : service ===  "Funiture"                           ? "Furniture (not reusable)"
                : service === "Garden Waste"                        ? "Grass cuttings and leaves"
                : service === "Light bulbs"                         ? "Light bulbs"
                : service === "Glass"                               ? "Glass bottles and jars (all colours)"
                : service === "Clinical Waste"                      ? "Sharps" 
                : service === "Paint"                               ? "Paint"
                : service === "Chemical and hazardous waste"        ? "Household chemicals"
                : service === "Household electronics/appliances"    ? "Microwaves"
                : service === "Aluminium cans"                      ? "Aluminium cans"
                : service === "Vehicles"                            ? "Cars and end of life vehicles"
                : service === "Foil"                                ? "Foil"
                : service === "Scrap metal"                         ? "Scrap metal"
                : service === "Spectacles"                          ? "Spectacles"
                : service === "Cooking oil"                         ? "Cooking oil"
                : service === "Plastic"                             ? "Plastic containers"
                : service;
    }

    module.exports = {

        nearestMapper: function nearestMapper (req, cb, err, next) {

            var key = req.raw.req.url;


            cache.get(key, function (err, value) {
                console.log( "get err" + err);
                if (value.hasOwnProperty("abcTest")) {
                    console.dir( "get value" + value.abcTest.test);
                }
                return (value);
            });

            console.log("not caching in nearestMapper");

            var service, location, query, apiUrl, defaultLocation;
            service = cap(req.params.service);
            location = req.params.postcode;
            defaultLocation = "NW1 0NE";

            //TODO: green query is not the same, needs to be changed depending on service requested

            //api url routed based on service requested
            apiUrl  = (serviceArray.parking.indexOf(service) !== -1)    ? url.parkingApi
                    : (serviceArray.recycling.indexOf(service) !== -1)  ? url.recyclingApi
                    : url.nearestApi;

            
            //change value of services query depending on service being searched
            services    = (serviceArray.recycling.indexOf(service) !== -1) ? "recycle="
                        : services;

           
            //map our service names to camden service names
            service = aliasServices(service);

            //query constructed based on combination of services and/or address
            query   = (location === undefined) ? "?" + services + service + "&" + locations + defaultLocation
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
            var location, query;
            location = req.params.postcode;
            query = "?" + locations + location;
            
            return cb(null, url.streetworksApi + query, { "Accept": "application/json" });
        }
    };

}());
