/***********************************************
*   ROUTESCONFIG.JS
*   Description: Defines the config for routes.js
*   Use: Imported by routes.js
*
************************************************/
(function () {
    "use strict";

    var handlers = require("../handlers/handlers.js");
    var ConvertXml = require("../handlers/convertXml.js");
    var MapConfig = require("./mapConfig.js");

    module.exports = {
        getHome: {
            handler: handlers.getHome        
        },
        nearest: {
            services: {
                handler: {
                    proxy: {
                        mapUri: MapConfig.nearestMapper,
                        onResponse: ConvertXml.convertToJson   
                    }
                }
            },
            locations: {
                handler: {
                    proxy: {
                        mapUri: MapConfig.nearestMapper,
                        onResponse: ConvertXml.convertToJson
                    }
                }
            },
            servicesAndLocations: {
                handler: {
                    proxy: {
                        mapUri: MapConfig.nearestMapper,
                        onResponse: ConvertXml.convertToJson

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
                        onResponse: ConvertXml.convertToJson
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
