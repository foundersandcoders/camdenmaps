
;(function() { 
    "use strict";
    // module for converting XML to JSON 
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    var config = require("../config/serverConfig.js");
    var cache = require("../lib/cacheprotocol.js");
    var cap = require("../lib/capitalize.js");
    var serviceArrays = config.map.serviceArrays;
    //strips html from obj (depth of 1 only)
    var clean = require("../lib/cleanobj.js");  
    var parsers = require("../lib/parsers.js");

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    function replaceSlashes(str) {
        return str.replace("/", " and ");
    }


    module.exports = {

        convertLocalInformation: function convertLocalInformation (err, res, req, rep) {

            var xml, 
                response,
                key;

            if (err) {
                return rep({error: "Upstream Error", message: "Sorry, it looks like something went wrong on an upstream server"});
            }
            
            xml = "";
            res.on("data", function(data) {
                xml = xml + data;
            });

            res.on("end", function() {
                response = parsers.localInformationApiParser(xml);
                
                if(!response.location.hasOwnProperty("Latitude")) {
                    return rep({error: "Upstream Error", message: "Sorry, that postcode looks invalid" });
                } 
                
                key = req.raw.req.url; 
                return cache.setCache(key, response, rep);
            });
        },
        convertStreetworks: function convertStreetworks (err, res, req, rep) {

            var xml, 
                response,
                key;

            xml = "";
            response = {};
            
            if (err) {
                console.log(err);
                return rep({error: "Upstream Error", message: "Sorry, it looks like something went wrong on an upstream server"});
            }
            
            res.on("data", function(data) {
                xml = xml + data;
            });

            res.on("end", function() {
                response = parsers.streetworksApiParser(xml);
                
                if(!response.location.hasOwnProperty("Latitude")) {
                    return rep({error: "Upstream Error", message: "Sorry, that postcode looks invalid" });
                } 
                
                key = req.raw.req.url;
                return cache.setCache(key, response, rep);
            });
        },
        convertToJson: function convertToJson (err, res, req, rep) {

            var xml, response, key, service, converter;
            
            if (err) {
                return rep({error: "Upstream Error", message: "Sorry, it looks like something went wrong on an upstream server"});
            }
            
            
            service = cap(req.params.service);
            
            if (serviceArrays.recycling.indexOf(service) > -1) {
                converter = parsers.recyclingApiParser;
            } else if (serviceArrays.parking.indexOf(service) > -1) {
                converter = parsers.parkingApiParser;
            } else {
                converter = parsers.nearestApiParser;
            }

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

