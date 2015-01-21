(function() { 
    "use strict";
    // module for converting XML to JSON 
    var xml = require("../lib/xml-parser.js");
    var RoutesConfig = require("../config/routesConfig.js");

    module.exports = {
        //Function for responding JSON to client
        convertToJson: function convertToXml (err, res, req, rep, cb) {
            //var routesConfig = require('./routesConfig.js');
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
                console.log(response);
                if (response.properties.length > null) {
                rep(response);
                } else {return(RoutesConfig.nearest.parkingServicesAndLocations)}
            });
            
        },
        convertToJsonAgain: function convertToXmlagain (err, res, req, rep) {
            
            console.log("hello");
            var parser = xml.parse(res);
            var response = {};
            response.properties = [];
           
            //console.log("This is the response.porperties: " + response.properties);
            
            
            parser.each("AddressSearchResults", function (match) {
               response.location = match.attributes; 
            });
            
            parser.each("Property", function (match) {
            var formatProperty = match.attributes;
            formatProperty.display = match.$children[0].attributes
            response.properties.push(formatProperty);
            });
                
            parser.on("end", function () {
                console.log(response);
                if (response.properties.length > null) {
                rep(response);
                } else {return (RoutesConfig.nearest.recyclingServicesAndLocations)}
            });
            
        }
    };
}());