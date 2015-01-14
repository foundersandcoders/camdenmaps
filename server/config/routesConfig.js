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
        apiDocs: {
            handler: handlers.showDocsHome
        },
       
        local: {
            // addresses: {
            //     handler: {
            //         proxy: {
            //             mapUri: MapConfig.localInfoMapper,
            //             onResponse: Config.convertToXml
            //         }
            //     }
            // }
            information: {
                handler: {
                    proxy: {
                        mapUri: MapConfig.localMapper,
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
