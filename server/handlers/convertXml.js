
;(function() { 
    "use strict";
    // module for converting XML to JSON 
    var config = require("../config/serverConfig.js");
    var cache = require("../lib/cacheprotocol.js");
    var cap = require("../lib/capitalize.js");
    var serviceArrays = config.map.serviceArrays;
    //strips html from obj (depth of 1 only)
    var parsers = require("../lib/parsers.js");

    function parserRouter (converter) {
        return function convertLocalInformation (err, res, req, rep) {

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
                response = converter(xml);
                
                if(!response.location.hasOwnProperty("Latitude")) {
                    return rep({error: "Upstream Error", message: "Sorry, that postcode looks invalid" });
                } 
                
                key = req.raw.req.url; 
                return cache.setCache(key, response, rep);
            });
        }
    }


    module.exports = {

        parserRouter: parserRouter,

        convertLocalInformation: parserRouter(parsers.localInformationApiParser),
        
        convertStreetworks: parserRouter(parsers.streetworksApiParser),
        
        convertToJson: function convertToJson (err, res, req, rep) {

            var xml, response, key, service, converter;
            
            if (err) {
                return rep({error: "Upstream Error", message: "Sorry, it looks like something went wrong on an upstream server"});
            }
            
            
            converter = parsers.whichParser(req.params.service);

            xml = "";
            
            res.on("data", function(data) {
                xml = xml + data;
            });

           
            res.on("end", function() {
                response = converter(xml);
                key = req.raw.req.url;
               
                return cache.setCache(key, response, rep);
           });
        }
    };
}());
