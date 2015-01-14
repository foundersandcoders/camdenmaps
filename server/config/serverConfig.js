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
                nearestApi: "http://maps.camden.gov.uk/nearest/nearestrest.aspx"
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
            var response = [];
            parser.each("AddressSearchResults", function (location) {
               response.push(location); 
            });
            parser.each("Property", function (property) {
                response.push(property);
            });
            parser.on("end", function () {
                rep(response);
            });
        } 
    };

}());
