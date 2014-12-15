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
                res.file("../public/views/index.html");
            }
        },
        nearest: {
            services: {
                handler: {
                    proxy: {
                        mapUri: MapConfig.servicesMapper,
                        onResponse: Config.convertToXml   
                    }
                }
            },
            locations: {
                handler: {
                    proxy: {
                        mapUri: MapConfig.locationsMapper,
                        onResponse: Config.convertToXml
                    }
                }
            },
            servicesAndLocations: {
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
                directory: {
                    path: "../public",
                    listing: true,
                    index: true
                }
            }
        }
    };
}());
