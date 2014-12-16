/***********************************************
*   ROUTESCONFIG.JS
*   Description: Defines the config for routes.js
*   Use: Imported by routes.js
*
************************************************/
(function () {
    "use strict";

    var Config = require("./serverConfig.js");
    var MapConfig = require("./mapConfig.js");
    var faketoe = require("faketoe");
    var handlers = require("../handlers/handlers.js");

    module.exports = {
        getHome: {
            handler: handlers.getHome        
        },
        nearest: {
            services: {
                handler: {
                    proxy: {
                        mapUri: MapConfig.nearestMapper,
                        onResponse: Config.convertToXml   
                    }
                }
            },
            locations: {
                handler: {
                    proxy: {
                        mapUri: MapConfig.nearestMapper,
                        onResponse: Config.convertToXml
                    }
                }
            },
            servicesAndLocations: {
                handler: {
                    proxy: {
                        mapUri: MapConfig.nearestMapper,
                        onResponse: Config.convertToXml
                    }
                }
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
