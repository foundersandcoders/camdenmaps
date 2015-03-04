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
    var cache = require("../lib/cacheprotocol.js");
    var mapUri = require("../lib/mapUri.js");
    var parsers = require("../lib/parsers.js");
    var cap = require("../lib/capitalize.js");

    module.exports = {

        staticFiles: {
            handler: {
                directory: {
                    path: "../public",
                    listing: true,
                    index: true
                }
            }
        },
        angularDirectiveFiles: {
            handler: {
                directory: {
                    path: "../angular/directives",
                    listing: true,
                    index: true
                }
            }
        },
        getHome: {
            handler: handlers.getHome
        },
        nearest: {
            services: {
                handler: function (req, rep) {
                    
                    var converter, service;
                    service = cap(req.params.service);
                    var key = req.raw.req.url;
           
                    converter = parsers.whichParser(req.params.service); 
                    
                    cache.getCache(req, key, rep, mapUri.mapUri, converter, {
                        mapUri: MapConfig.nearestMapper,
                        onResponse: ConvertXml.convertToJson
                    });

                }
            },
        },
        streetworks: {
            handler: function(req, rep) {
                
                var key = req.raw.req.url;
                
                cache.getCache(req, key, rep, mapUri.mapStreetworks, parsers.streetworksApiParser, {
                    mapUri: MapConfig.streetworksMapper,
                    onResponse: ConvertXml.convertStreetworks
                });
            }
        }, 
        apiDocs: {
            handler: handlers.showDocsHome
        },
        local: {
            information: {
                handler: function(req, rep) {
                    
                    var key = req.raw.req.url;
                    
                    cache.getCache(req, key, rep, mapUri.mapLocalInformation, parsers.localInformationApiParser, {
                        mapUri: MapConfig.localMapper,
                        onResponse: ConvertXml.convertLocalInformation
                    });
                }
            }
        },
        logging: {
            handler: handlers.getLogs
        },
        issueToken: {
            handler: handlers.issueToken
        }
    };
}());

