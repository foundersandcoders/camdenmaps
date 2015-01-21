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
                nearestApi: "http://maps.camden.gov.uk/nearest/nearestrest.aspx",
                parkingApi: "http://maps.camden.gov.uk/parkingbays/parkingbaysrest.aspx",
                recyclingApi: "http://maps.camden.gov.uk/nearest/recyclingrest.aspx"
            },
            query: {
                service: "find=",
                location: "area=",
                uprn: "uprn="
            }
        },

        //Function for responding JSON to client
        convertToXml: function convertToXml (err, res, req, rep, cb) {
            //var routesConfig = require('./routesConfig.js');
            var RoutesConfig = require ('./routesConfig.js');
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
        convertToXmlagain: function convertToXmlagain (err, res, req, rep) {
            //var routesConfig = require('./routesConfig.js');
            console.log("hello");
            var RoutesConfig = require ('./routesConfig.js');
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
