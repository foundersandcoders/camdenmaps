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
    var personalConfig = require("./personalConfig.js");

    module.exports = {
        getHome: {
            handler: function (req, res) {
                res.file(personalConfig.emma + "/public/views/index.html");
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
            handler: {
                cors: {
                    origin: ["*"]
                },
                directory: {
                    path: personalConfig.emma + "/public",
                    listing: true,
                    index: true
                }
            }
        }
    };
}());
