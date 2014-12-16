/***********************************************
*   ROUTESCONFIG.JS
*   Description: Defines the config for routes.js
*   Use: Imported by routes.js
*
************************************************/
(function () {
    "use strict";

    var handlers = require("../handlers/handlers.js");
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
        apiDocs: {
            handler: handlers.showDocsHome
        }
    }
}());
