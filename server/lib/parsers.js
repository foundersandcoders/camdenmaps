;(function() {
    "use strict";

    // module for converting XML to JSON
    var xml2js = require("xml2js");
    var parser = new xml2js.Parser();
    var cap = require("../lib/capitalize.js");
    var clean = require("../lib/cleanobj.js");
    var serviceArrays = require("../config/serverConfig").map.serviceArrays;

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    function streetworksApiParser (xml) {
        var json = {};

        parser.parseString(xml, function(err, result) {

            if (result.hasOwnProperty("Locations") && typeof result !== "undefined" && result.hasOwnProperty("Locations") && result.Locations.hasOwnProperty("StreetWorks")) {
                json.location = {};
                json.location.Area = result.Locations.$.postcode;
                json.location.Latitude = result.Locations.$.Lat;
                json.location.Longitude = result.Locations.$.Lng;
                json.properties = [];
                result.Locations.StreetWorks.map(function(p) {
                    var formattedProperty = {};

                    formattedProperty.Longitude = p.$.Lng;
                    formattedProperty.Latitude = p.$.Lat;
                    formattedProperty.LAref = p.$.LAref;
                    formattedProperty.externalref = p.$.externalref;
                    formattedProperty.display = {};
                    formattedProperty.display.Organisation = p.$.Organisation;
                    formattedProperty.display.Name = p.$.Street + " - " + p.$.externalref.split("-")[p.$.externalref.split("-").length - 1];
                    formattedProperty.display.StartDate = p.$.StartDate;
                    formattedProperty.display.EndDate = p.$.EndDate;
                    formattedProperty.display.Telephone = p.$.Telephone;
                    formattedProperty.display.Street = p.$.Street;
                    formattedProperty.display.Description = p.$.Description;
                    formattedProperty.display = clean(formattedProperty.display);
                    formattedProperty = clean(formattedProperty);
                    json.properties.push(formattedProperty);
                });
            } else {
                return {
                    error: "Service Not Found",
                    message: "Sorry, we could not find the right information on that service or location"
                };
            }
        });
        return json;
    }


    function localInformationApiParser (xml) {
        var json = {};

        parser.parseString(xml, function(err, result) {

            json.location = {};
            if(typeof result !== "undefined" && result.hasOwnProperty("Locations") && result.Locations.hasOwnProperty("AddressSearchResults")) {
                json.location.Area = result.Locations.AddressSearchResults[0].$.sPostcode;
                json.location.Latitude = result.Locations.AddressSearchResults[0].$.Latitude;
                json.location.Longitude = result.Locations.AddressSearchResults[0].$.Longitude;
                json.location.BuildingName = result.Locations.AddressSearchResults[0].$.sBuildingName;
                json.location.Street = result.Locations.AddressSearchResults[0].$.sStreet;
            } else {
                return {
                    error: "Service Not Found",
                    message: "Sorry, we could not find the right information on that location"
                };
            }
            json.information = {};
            if(result.Locations.hasOwnProperty("LocalInformation") && result.Locations.LocalInformation[0].hasOwnProperty("Table")) {
                result.Locations.LocalInformation[0].Table.map(function(p) {
                    json.information[p.$.TableDesc] = {};
                    json.information[p.$.TableDesc].Value = p.Object[0].$.ObjectDesc;
                    json.information[p.$.TableDesc].Url = p.Object[0].$.ObjectLink;
                });
            } else {
                return {
                    error: "Service Not Found",
                    message: "Sorry, we could not find the right information on that location"
                };
            }
        });
        return json;
    }

    function recyclingApiParser (xml) {
        var json = {};

        parser.parseString(xml, function(err, result) {
            json.location = {};
            json.location.Area = result.Locations.$.Area;
            json.properties = [];

            if (result.hasOwnProperty("Locations") &&
                    (result.Locations.hasOwnProperty("RecycleCentre") ||
                     result.Locations.hasOwnProperty("RecyclePoint"))) {
                var properties = [];
                if (result.Locations.hasOwnProperty("RecycleCentre")) {
                    properties.push("RecycleCentre");
                }
                if (result.Locations.hasOwnProperty("RecyclePoint")) {
                    properties.push("RecyclePoint");
                }
                properties.map(function(property) {
                    result.Locations[property].map(function(p) {
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
                        json.properties.push(formatProperty);
                    });
                 });
            } else {
                return {
                    error: "Service Not Found",
                    message: "Sorry, we could not find the right information on that location"
                };
            }
        });
        return json;
    }

    function parkingApiParser (xml) {
        var json = {};
        parser.parseString(xml, function(err, result) {

            json.location = {};

            if(typeof result !== undefined && result.hasOwnProperty("Locations") && result.Locations.hasOwnProperty("ParkingBay")) {
                json.location.Latitude = result.Locations.$.Lat;
                json.location.Longitude = result.Locations.$.Lng;
                json.location.Area = result.Locations.$.postcode;
                json.properties = [];
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
                    json.properties.push(formatProperty);
                });
            }
        });
        return json;
    }

    function nearestApiParser (xml) {
        var json = {};
        json.properties = [];
        parser.parseString(xml, function (err, result) {
            if(typeof result !== "undefined" && result.hasOwnProperty("Locations") && result.Locations.hasOwnProperty("Properties") && result.Locations.Properties[0].hasOwnProperty("Property")) {
                if(result.Locations.hasOwnProperty("AddressSearchResults")) {
                    json.location = result.Locations.AddressSearchResults[0]["$"];
                } else {
                    json.location = {};
                    json.location.Latitude = result.Locations.$.lat;
                    json.location.Longitude = result.Locations.$.lng;
                }

                result.Locations.Properties[0].Property.map(function(p) {
                    var formatProperty = clean(p["$"]);
                    formatProperty.display = clean(p.PoI[0]["$"]);
                    json.properties.push(formatProperty);
                });
            }
        });
        return json;
    }

    function whichParser (xml, service) {
        service = cap(service);

        if (serviceArrays.recycling.indexOf(service) > -1) {
            return recyclingApiParser(xml);
        } else if (serviceArrays.parking.indexOf(service) > -1) {
            return parkingApiParser(xml);
        } else {
            return nearestApiParser(xml);
        }
    }

    module.exports = {
        nearestApiParser: nearestApiParser,
        parkingApiParser: parkingApiParser,
        recyclingApiParser: recyclingApiParser,
        localInformationApiParser: localInformationApiParser,
        streetworksApiParser: streetworksApiParser,
        whichParser: whichParser
    };

}());
