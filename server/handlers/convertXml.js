
;(function() { 
    "use strict";
    // module for converting XML to JSON 
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    var config = require("../config/serverConfig.js");
    var cache = require("../config/cache.js");
    var cap = require("../lib/capitalize.js");
    var serviceArrays = config.map.serviceArrays;
    //strips html from obj (depth of 1 only)
    var clean = require("../lib/cleanobj.js");  

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    module.exports = {

        convertLocalInformation: function convertLocalInformation (err, res, req, rep) {

            var xml, response;
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

                parser.parseString(xml, function(err, result) {
                    if (err) {
                        console.log(err);
                        return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that location"});
                    }
                    response.location = {};
                    if(typeof result !== "undefined" && result.hasOwnProperty("Location") && result.Locations.hasOwnProperty("AddressSearchResults")) {
                        response.location.Area = result.Locations.AddressSearchResults[0].$.sPostcode;
                        response.location.Latitude = result.Locations.AddressSearchResults[0].$.Latitude;
                        response.location.Longitude = result.Locations.AddressSearchResults[0].$.Longitude;
                        response.location.BuildingName = result.Locations.AddressSearchResults[0].$.sBuildingName; 
                        response.location.Street = result.Locations.AddressSearchResults[0].$.sStreet; 
                    } else {
                        return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that location"});
                    }
                    response.information = {};
                    if(result.Locations.hasOwnProperty("LocalInformation") && result.Locations.LocalInformation[0].hasOwnProperty("Table")) {
                        result.Locations.LocalInformation[0].Table.map(function(p) {
                            response.information[p.$.TableDesc] = p.Object[0].$.ObjectDesc;
                        });
                    } else {
                        return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that location"});
                    }
                    response = clean(response);
                    return rep(response);
                });
            });
        },
        convertStreetworks: function convertStreetworks (err, res, req, rep) {

            var xml, response;
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
                parser.parseString(xml, function(err, result) {
                    //TODO: move the error messages to an object so only written once
                    if (err) {
                        console.log(err);
                        return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that service or location"});
                    }
                    if (result.hasOwnProperty("Locations") && typeof result !== "undefined" && result.hasOwnProperty("Locations") && result.Locations.hasOwnProperty("StreetWorks")) {
                        response.location = {};
                        response.location.Area = result.Locations.$.postcode; 
                        response.location.Latitude = result.Locations.$.Lat;
                        response.location.Longitude = result.Locations.$.Lng;
                        response.properties = [];
                        result.Locations.StreetWorks.map(function(p) {
                            var formattedProperty = {};
                            
                            formattedProperty.Longitude = p.$.Lng;
                            formattedProperty.Latitude = p.$.Lat;
                            formattedProperty.LAref = p.$.LAref;
                            formattedProperty.externalref = p.$.externalref;
                            formattedProperty.display = {};
                            formattedProperty.display.Organisation = p.$.Organisation;
                            formattedProperty.display.Name = p.$.Street + " - " + p.$.externalref;
                            formattedProperty.display.StartDate = p.$.StartDate;
                            formattedProperty.display.EndDate = p.$.EndDate;
                            formattedProperty.display.Telephone = p.$.Telephone;
                            formattedProperty.display.Street = p.$.Street;
                            formattedProperty.display.Description = p.$.Description;
                            formattedProperty.display = clean(formattedProperty.display)
                            formattedProperty = clean(formattedProperty);
                            response.properties.push(formattedProperty);
                        });
                    } else {
                        return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that service or location"});
                    }
                    response = clean(response);
                    return rep(response);
                });
            });
        },
        convertToJson: function convertToJson (err, res, req, rep) {

            var xml, response, key, service;
            xml = "";
            response = {};
            key = req.raw.req.url;
            service = cap(req.params.service)

            if (err) {
                console.log(err);
                return rep({error: "Upstream Error", message: "Sorry, it looks like something went wrong on an upstream server"});
            }
                
            if (serviceArrays.recycling.indexOf(service) > -1) {
                xml = "";
                response = {};           

                res.on("data", function(data) {
                    xml = xml + data;
                });

                res.on("end", function() {
                    parser.parseString(xml, function(err, result) {

                        if (err) {
                            console.log(err);
                            return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that service or location"});
                        }

                        console.dir(result);
                        response.location = {};
                        response.location.Area = result.Locations.$.Area;
                        if (req.info.hasOwnProperty("latitude")) {
                            response.location.Latitude = req.info.latitude;
                            response.location.Longitude = req.info.longitude;

                        }
                        response.properties = [];
                        if (result.hasOwnProperty("Locations")) {
                        
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
                                    formatProperty.display = clean(formatProperty.display);
                                    formatProperty = clean(formatProperty);
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
                                    formatProperty.display = clean(formatProperty.display);
                                    formatProperty = clean(formatProperty);
                                    response.properties.push(formatProperty);
                                });
                            }
                        } else {
                            return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that service or location"});
                        } 
                        response = clean(response);
                        cache.set(key, response, function (err, success) {
                            if (!err && success) {
                                return rep(response);
                            } else {
                                console.log(err);
                                return rep(response);
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

                        if (err) {
                            console.log(err);
                            return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that service or location"});
                        }
                        
                        response.location = {};
                        
                        if(typeof result !== undefined && result.hasOwnProperty("Locations") && result.Locations.hasOwnProperty("ParkingBay")) {
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
                                formatProperty.display = clean(formatProperty.display);
                                formatProperty = clean(formatProperty);
                                response.properties.push(formatProperty);
                            });
                        } else {
                            return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that service or location"});
                        }
                        response = clean(response);

                        cache.set(key, response, function (err, success) {
                            if (!err && success) {
                                return rep(response);
                            } else {
                                console.log(err);
                                return rep(response);
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
                        
                        if (err) {
                            console.log(err);
                            return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that service or location"});
                        }
                        if(typeof result !== "undefined" && result.hasOwnProperty("Locations") && result.Locations.hasOwnProperty("Properties") && result.Locations.Properties[0].hasOwnProperty("Property")) { 
                            if(result.Locations.hasOwnProperty("AddressSearchResults")) {
                                response.location = result.Locations.AddressSearchResults[0]['$'];
                            } else {
                                response.location = {};
                                response.location.Latitude = result.Locations.$.lat;
                                response.location.Longitude = result.Locations.$.lng;
                            }

                            result.Locations.Properties[0].Property.map(function(p) {
                                var formatProperty = clean(p['$']);
                                formatProperty.display = clean(p.PoI[0]['$']);
                                response.properties.push(formatProperty);
                            });
                        } else {
                            return rep({error: "Service Not Found", message: "Sorry, we could not find the right information on that service or location"});
                        }

                        response = clean(response);

                        cache.set(key, response, function (err, success) {
                            if (!err && success) {
                                return rep(response);
                            } else {
                                console.log(err);
                                return rep(response);
                            }
                        });
                    });
                });
            }

        }
        
    };
}());

