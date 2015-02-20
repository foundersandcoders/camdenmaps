/***********************************************
*   MAPCONFIG.JS
*   Description: Defines the mapUri functions for routes
*   Use: Imported by routesConfig.js
*
************************************************/

;(function () {
    "use strict";

    var Config = require("./serverConfig.js"),
        convertToJson= require("../handlers/convertXml.js").convertToJson,
        url = Config.map.url,
        serviceArray = Config.map.serviceArrays,
        services,
        locations = Config.map.query.location,
        lats = Config.map.query.lat,
        lngs = Config.map.query.lng,
        cache = require("./cache.js"),
        lngs = Config.map.query.lng,
        lats = Config.map.query.lat,
        exactLocations = Config.map.query.uprn,
        cap = require("../lib/capitalize.js"),
        aliasServices = require("../lib/alias.js"),
        mapUri = require("../lib/mapUri.js").mapUri;

    module.exports = {

        nearestMapper: function nearestMapper (req, cb, err, next) {

            //redirect request to proxy
            return cb(null, mapUri(req), { "Accept": "application/json" });

        },
        localMapper: function localInfoMapper (req, cb) {
            var uprn = req.params.uprn;
            var query = "?" + exactLocations + uprn + "&tab=m";

            return cb(null, url.nearestApi + query, { "Accept": "application/json" });
        },
        streetworksMapper: function streetworksMapper (req, cb, err) {
            var location, query, lat, lng;
            location = req.params.postcode;
            lat = req.params.latitude;
            lng = req.params.longitude;
            query = (req.params.latitude && req.params.longitude)   ? "?" + lats + lat + "&" + lngs + lng
                                                                    : "?" + locations + location;

            return cb(null, url.streetworksApi + query, { "Accept": "application/json" });
        }
    };

}());
