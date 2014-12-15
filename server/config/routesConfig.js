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

    module.exports = {
        getHome: {
            handler: function (req, res) {
                res("GO SOMEWHERE");
            }
        },
        nearest: {
            services: {
                cors: {
                    origin: ["*"]
                },
                handler: {
                    proxy: {
                        mapUri: MapConfig.servicesMapper,
                        onResponse: Config.convertToXml   
                    }
                }
            },
            locations: {
                cors: {
                    origin: ["*"]
                },
                handler: {
                    proxy: {
                        mapUri: MapConfig.locationsMapper,
                        onResponse: Config.convertToXml
                    }
                }
            },
            servicesAndLocations: {
                cors: {
                    origin: ["*"]
                },
                handler: {
                    proxy: {
                        mapUri: MapConfig.servicesAndLocationsMapper,
                        onResponse: Config.convertToXml
                    }
                }
            }
        },
        staticFiles: {
            cors: {
                origin: ["*"]
            },
            directory: {
                path: "public",
                listing: true,
                index: true
            }
        }
    }
}());
