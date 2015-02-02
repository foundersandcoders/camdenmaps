
;(function() { 
    "use strict";
    // module for converting XML to JSON 
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    var config = require("../config/serverConfig.js");
    var cache = require("../config/cache.js");
    var cap = require("../lib/capitalize.js");
    var serviceArrays = config.map.serviceArrays;
    //var routesConfig = require("../config/routesConfig.js");

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    module.exports = {

        convertLocalInformation: function convertLocalInformation (err, res, req, rep) {

            var xml, response;
            xml = "";
            response = {};


            
            res.on("data", function(data) {
                xml = xml + data;
            });

            res.on("end", function() {

                parser.parseString(xml, function(err, result) {

                    response.location = {};
                    response.location.Area = result.Locations.AddressSearchResults[0].$.sPostcode;
                    response.location.Latitude = result.Locations.AddressSearchResults[0].$.Latitude;
                    response.location.Longitude = result.Locations.AddressSearchResults[0].$.Longitude;
                    response.location.BuildingName = result.Locations.AddressSearchResults[0].$.sBuildingName; 
                    response.location.Street = result.Locations.AddressSearchResults[0].$.sStreet; 
                    response.information = {};
                    result.Locations.LocalInformation[0].Table.map(function(p) {
                        response.information[p.$.TableDesc] = p.Object[0].$.ObjectDesc;
                    });

                    rep(response);
                });
            });
        },
        convertStreetworks: function convertStreetworks (err, res, req, rep) {

            var xml, response;
            xml = "";
            response = {};
            
            res.on("data", function(data) {
                xml = xml + data;
            });

            res.on("end", function() {
                parser.parseString(xml, function(err, result) {

                    response.location = {};
                    response.location.Area = result.Locations.$.postcode; 
                    response.location.Latitude = result.Locations.$.Lat;
                    response.location.Longitude = result.Locations.$.Lng;
                    response.properties = [];
                    result.Locations.StreetWorks.map(function(p) {

                        console.dir(p);
                        var formattedProperty = {};
                        formattedProperty.Longitude = p.$.Lng;
                        formattedProperty.Latitude = p.$.Lat;
                        formattedProperty.LAref = p.$.LAref;
                        formattedProperty.externalref = p.$.externalref;
                        formattedProperty.display = {};
                        formattedProperty.display.Organisation = p.$.Organisation;
                        formattedProperty.display.Name = p.$.Location;
                        formattedProperty.display.StartDate = p.$.StartDate;
                        formattedProperty.display.EndDate = p.$.EndDate;
                        formattedProperty.display.Telephone = p.$.Telephone;
                        formattedProperty.display.Street = p.$.Street;
                        formattedProperty.display.Description = p.$.Description;
                        response.properties.push(formattedProperty);
                    });

                    rep(response);
                });
            });
        },
        convertToJson: function convertToJson (err, res, req, rep) {

            var xml, response, key, service;
            xml = "";
            response = {};
            key = req.raw.req.url;
            service = cap(req.params.service)

            console.log("Not Cached");

            if (serviceArrays.recycling.indexOf(service) > -1) {
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
                        
                        if (result.Locations.hasOwnProperty("RecycleCentre")) { 
                            result.Locations.RecycleCentre.map(function(p) {
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
                        }
                        
                        if (result.Locations.hasOwnProperty("RecyclePoint")) { 
                            result.Locations.RecyclePoint.map(function(p) {

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
                        }
                        cache.set(key, response, function (err, success) {
                            if (!err && success) {
                                rep(response);
                            } else {
                                console.log(err);
                                rep(response);
                            }
                        });
                        
                    });
               });

            } else if (serviceArrays.parking.indexOf(service) > -1) {

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

                        cache.set(key, response, function (err, success) {
                            if (!err && success) {
                                rep(response);
                            } else {
                                console.log(err);
                                rep(response);
                            }
                        });
                    });  
                });
            
            } else {
                
                xml = '';
                response = {};
                response.properties = [];

                res.on('data', function(data){
                  xml = xml + data;
                });

                res.on('end', function(){
                    parser.parseString(xml, function (err, result) {

                        response.location = result.Locations.AddressSearchResults[0]['$'];
                        result.Locations.Properties[0].Property.map(function(p) {
                            var formatProperty = p['$'];
                            formatProperty.display = p.PoI[0]['$'];
                            response.properties.push(formatProperty);
                        });

                        cache.set(key, response, function (err, success) {
                            if (!err && success) {
                                rep(response);
                            } else {
                                console.log(err);
                                rep(response);
                            }
                        });
                    });
                });
            }

        }
        
    };
}());

