/***********************************************
*   MAPCONFIG.JS
*   Description: Defines the mapUri functions for routes
*   Use: Imported by routesConfig.js
*
************************************************/
//  TODOS:
//  Factorize this into one repeatable function, this isn't DRY
//
//**********************************************
(function () {
    "use strict";

    var Config = require("./serverConfig.js");

    module.exports = {

        servicesMapper: function servicesMapper (req, cb) {
            var query = "?" + Config.map.query.service + req.params.service;
            return cb(null, Config.map.url.nearestApi + query, { "Accept": "application/json" });
        },

        locationsMapper: function locationsMapper (req, cb) {
            var query = "?" + Config.map.query.location + req.params.postcode;
            return cb(null, Config.map.url.nearestApi + query, { "Accept": "application/json" });
        },

        servicesAndLocationsMapper: function servicesAndLocationsMapper (req, cb) {
            var query = "?" + Config.map.query.location + req.params.postcode + 
                        "&" + Config.map.query.service + req.params.service;
            return cb(null, Config.map.url.nearestApi + query, { "Accept": "application/json" });
        }
    }

}());
