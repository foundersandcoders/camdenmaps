/***********************************************
*   ROUTESCONFIG.JS
*   Description: Defines the config for routes.js
*   Use: Imported by routes.js
*
************************************************/
var Config = require("./serverConfig.js");
var MapConfig = require("./mapConfig.js");

module.exports = {
    nearest: {
        services: {
            handler: {
                proxy: {
                    mapUri: MapConfig.servicesMapper            
                }
            }
        },
        locations: {
            handler: {
                proxy: {
                    mapUri: MapConfig.locationsMapper
                }
            }
        },
        servicesAndLocations: {
            handler: {
                proxy: {
                    mapUri: MapConfig.servicesAndLocationsMapper
                }
            }
        }
    }
}
