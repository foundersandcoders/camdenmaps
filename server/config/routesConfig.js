/***********************************************
*   ROUTESCONFIG.JS
*   Description: Defines the config for routes.js
*   Use: Imported by routes.js
*
************************************************/
;(function () {
    "use strict";

    var handlers = require("../handlers/handlers.js");
    var ConvertXml = require("../handlers/convertXml.js");
    var MapConfig = require("./mapConfig.js");
    var cache = require("../config/cache.js");


    module.exports = {

        getHome: {
            handler: handlers.getHome
        },
        nearest: {
            services: {
                handler: function (req, rep) {
                    
                    var key = req.raw.req.url;

                    cache.get(key, function (err, value) {
                        
                        // print error if something went wrong
                        if (err) {
                            console.log(err);
                        }

                        // return cached response if it exists
                        if (value.hasOwnProperty(key)) {
                            rep(value[key]);
                        }
                        // route request to proxy by default (if response not cached)
                        rep.proxy({
                            mapUri: MapConfig.nearestMapper,
                            onResponse: ConvertXml.convertToJson
                        });
                    });
                }
            },
            servicesAndLocations: {

                handler: function (req, rep) {
                    var key = req.raw.req.url;

                    cache.get(key, function (err, value) {

                        if (err) {
                            console.log(err);
                        }

                        if (value.hasOwnProperty(key)) {
                            console.log("cached service and location");
                            rep(value[key]);
                        } else {
                            rep.proxy({
                                mapUri: MapConfig.nearestMapper,
                                onResponse: ConvertXml.convertToJson
                            });
                        }
                    });
                }
            },
            servicesAndLocationsLatLng: {

                handler: function (req, rep) {
                    var key = req.raw.req.url;

                    cache.get(key, function (err, value) {

                        if (err) {
                            console.log(err);
                        }

                        if (value.hasOwnProperty(key)) {
                            console.log("cached service and location LatLng");
                            rep(value[key]);
                        } else {
                            rep.proxy({
                                mapUri: MapConfig.nearestMapper,
                                onResponse: ConvertXml.convertToJson
                            });
                        }
                    });
                }
            }
        },
        apiDocs: {
            handler: handlers.showDocsHome
        },
       
        local: {
            information: {
                handler: {
                    proxy: {
                        mapUri: MapConfig.localMapper,
                        onResponse: ConvertXml.convertLocalInformation
                    }
                }
            }
        },
        streetworks: {
            handler: function(req, rep) {
                
                var key = req.raw.req.url;
                
                cache.get(key, function (err, value) {
                    
                    // print error if something went wrong
                    if (err) {
                        console.log(err);
                    }

                    // return cached response if it exists
                    if (value.hasOwnProperty(key)) {
                        rep(value[key]);
                    } 
                    // route request to proxy by default (if response not cached)
                    rep.proxy({
                        mapUri: MapConfig.streetworksMapper,
                        onResponse: ConvertXml.convertStreetworks
                    });
                }); 
            }
        }, 
        staticFiles: {
            handler: {
                directory: {
                    path: "../public",
                    listing: true,
                    index: true
                }
            }
        }
    };
}());
