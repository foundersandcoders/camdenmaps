/***********************************************
*   SERVERCONFIG.JS
*   Description: Centralizes the configurations for server
*   Use: Imported throughout the server
*
************************************************/
;(function () {
    "use strict";

    //Module for converting XML to JSON
    var xml = require("../lib/xml-parser.js");

    module.exports = {

        //Config for server host and port
        server: {
            host: "0.0.0.0",
            port: "8080"
        },
     
        //Mapping for query params and camden API
        map: {
            url: {
                nearestApi: "https://maps.camden.gov.uk/nearest/nearestrest.aspx"
            },
            query: {
                service: "find=",
                location: "area=",
                uprn: "uprn="
            }
        },

        //Function for responding JSON to client
        convertToXml: function convertToXml (err, res, req, rep) {
            var parser = xml.parse(res);
            var response = {};
            response.properties = [];
            
            parser.each("AddressSearchResults", function (match) {
               response.location = match.attributes; 
            });
           
            parser.each("Property", function (match) {
                var formatProperty = match.attributes;
                formatProperty.display = match.$children[0].attributes
                response.properties.push(formatProperty);
            });
            
            parser.on("end", function () {
                rep(response);
            });
        } 
    };

}());
