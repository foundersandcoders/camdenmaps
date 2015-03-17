
;(function() {
    "use strict";

    var config = require("../config/serverConfig.js");
    var cache = require("../lib/cacheprotocol.js");
    var cap = require("../lib/capitalize.js");
    var serviceArrays = config.map.serviceArrays;
    var parsers = require("../lib/parsers.js");

    function parserRouter (converter, cacheInj) {
        
        return function convertXml (err, res, req, rep) {

            cacheInj = cacheInj || cache;
            converter = converter || parsers.whichParser(req.params.service);
            var xml, response, key;

            if (err) {
                return rep({error: "Upstream Error", message: "Sorry, it looks like something went wrong on an upstream server"});
            }

            xml = "";
            res.on("data", function(data) {
                xml = xml + data;
            });

            res.on("end", function() {

                response = converter(xml, req.params.service);
                if (req.app.hasOwnProperty("latitude") && req.app.hasOwnProperty("longitude")) {

                    response.location.Latitude = req.app.latitude;
                    response.location.Longitude = req.app.longitude;

                }

                if(serviceArrays.recycling.indexOf(cap(req.params.service)) === -1 &&
                        (!response.hasOwnProperty("location") ||
                        !response.location.hasOwnProperty("Latitude"))) {
                    return rep({error: "Upstream Error", message: "Sorry, that postcode looks invalid" });
                }

                key = req.raw.req.url;
                return cacheInj.setCache(key, response, rep);
                
            });
        };
    }

    module.exports = {

        parserRouter: parserRouter,

        convertLocalInformation: parserRouter(parsers.localInformationApiParser),

        convertStreetworks: parserRouter(parsers.streetworksApiParser),

        convertToJson: parserRouter(parsers.whichParser)

    };

}());
