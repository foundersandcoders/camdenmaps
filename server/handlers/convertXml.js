
;(function() { 
    "use strict";
    // module for converting XML to JSON 
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    var config = require("../config/serverConfig.js");
    var serviceArrays = config.map.serviceArrays;
    //var routesConfig = require("../config/routesConfig.js");

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    module.exports = {
        //Function for responding JSON to client
        //Function for responding JSON to client
        convertToJson: function convertToJson (err, res, req, rep) {

            var xml, response;
            xml = "";
            response = {};

            if (serviceArrays.recycling.indexOf(req.params.service) > -1) {
                xml = "";
                response = {};           

                res.on("data", function(data) {
                    xml = xml + data;
                });

                res.on("end", function() {
                    parser.parseString(xml, function(err, result) {
                        console.dir(result);
                        response.location = {};
                        response.location.Area = result.Locations.$.Area;
                        response.properties = [];
                        result.Locations.RecycleCentre.map(function(p) {
                            console.log(p);
                            var formatProperty = {};
                            formatProperty.Latitude = p.$.Lat;
                            formatProperty.Longitude = p.$.Lng;
                            formatProperty.display = {};
                            formatProperty.display.Name = p.$.Name;
                            formatProperty.display.OpeningHours = p.$.OpeningHours;
                            formatProperty.display.Telephone = p.$.Telephone;
                            formatProperty.display.URL = p.$.URL;
                            response.properties.push(formatProperty);
                        });
                        rep(response);
                    });
                });

            } else if (serviceArrays.parking.indexOf(req.params.service) > -1) {
                xml = "";
                response = {};
                
                res.on("data", function(data) {
                    xml = xml + data;                
                });

                res.on("end", function() {
                    parser.parseString(xml, function(err, result) {
                        response.location = {};
                        response.location.Latitude = result.Locations.$.Lat;
                        response.location.Longitude = result.Locations.$.Lng;
                        response.location.Area = result.Locations.$.postcode;
                        response.properties = [];
                        result.Locations.ParkingBay.map(function(p) {
                            console.log(p);
                            var formatProperty = {};
                            formatProperty.Latitude = p.$.Lat;
                            formatProperty.Longitude = p.$.Lng;
                            formatProperty.Street = p.$.Street;
                            formatProperty.display = {};
                            formatProperty.display.Name = toTitleCase(p.$.Street + " " + p.$.Type);
                            formatProperty.display.Size = p.$.Size;
                            formatProperty.display.OpeningHours = p.$.Time;
                            formatProperty.display.Tariff = p.$.Tariff;
                            formatProperty.display.Duration  = p.$.Duration;
                            formatProperty.display.Type = p.$.Type;
                            response.properties.push(formatProperty);
                        });
                        rep(response);
                    });  
                });
            
            } else {
                // var parser = xml.parse(res);
                xml = '';
                response = {};
                response.properties = [];

                res.on('data', function(data){
                  xml = xml + data;
                });
                res.on('end', function(){
                    parser.parseString(xml, function (err, result) {
                        console.log(result);
                        response.location = result.Locations.AddressSearchResults[0]['$'];
                        result.Locations.Properties[0].Property.map(function(p) {
                            var formatProperty = p['$'];
                            formatProperty.display = p.PoI[0]['$']
                            response.properties.push(formatProperty);
                        });
                        rep(response);
                    });
                });
            }

        }
        
    };
}());

