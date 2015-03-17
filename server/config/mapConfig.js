/***********************************************
*   MAPCONFIG.JS
*   Description: Defines the mapUri functions for routes
*   Use: Imported by routesConfig.js
*
************************************************/

;(function () {
    "use strict";

    var Config = require("./serverConfig.js"),
        mapUri = require("../lib/mapUri.js");

    module.exports = {

        nearestMapper: function nearestMapper (req, cb, err) {

            return cb(null, mapUri.mapUri(req), { "Accept": "application/json" });
  
        },
   
        localMapper: function localInfoMapper (req, cb) {

            return cb(null, mapUri.mapLocalInformation(req), { "Accept": "application/json" });
    
        },
        
        streetworksMapper: function streetworksMapper (req, cb, err) {

            return cb(null, mapUri.mapStreetworks(req), { "Accept": "application/json" });
        
        }
    };
}());
