var test = require("tape");
var server = require("../../server/server.js");
var request = require("request");
var serviceArrays = require("../../server/config/serverConfig.js").map.serviceArrays;
var menu = require("../../server/angular/menu.json");

var apiUrl = "http://0.0.0.0:8080";

function whichArrays (service) {

    if (serviceArrays.parking.indexOf(service) > -1) {
        return dataProperties().recycling;
    } else if (serviceArrays.recycling.indexOf(service) > -1) {
        return dataProperties().parking;
    } else {
        return dataProperties().services;
    }

}

console.log(whichArrays("lunch club"));

function dataProperties () {
    var prop = {};

    prop.services = {};
    prop.services.propertiesKeys = ["Longitude", "Latitude", "ViewLat", "ViewLng", "View", "Distance", "display"];
    prop.services.locationsKeys = ["Area", "Longitude", "Latitude"];

    prop.parking = {};
    prop.parking.propertiesKeys = ["Latitude", "Longitude", "Street", "display"];
    prop.parking.locationsKeys = ["Area", "Longitude", "Latitude"];

    prop.neighbourhood = {};
    prop.neighbourhood.informationKeys = ["Children Locality Areas", "Conservation Area", "Controlled Parking Main Zone", "European constituency", "Housing district", "Licensing Enforcement Areas", "UDP Town Centre", "Ward", "Ward district management committee", "Ward housing team"];
    prop.neighbourhood.locationsKeys = ["Area", "Latitude", "Longitude"];

    prop.recycling = {};
    prop.recycling.propertiesKeys = ["Latitude", "Longitude", "display"];
    prop.recycling.locationsKeys = ["Area"];

    return prop;
}

function checkService (service) {
    test("server should return expected data structure from /services/" + service, function(t) {

        var servicesProperties = dataProperties().services;

        request(apiUrl + "/services/" + service, function(e, h, b) {

            //console.log(b);
            var properties, location, firstProperty;
            b = JSON.parse(b);

            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");

            properties = b.properties;
            location = b.location

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];

            whichArrays(service).propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            });
            whichArrays(service).locationsKeys.map(function(k) {
                if(k !== "Street") {
                    t.ok(location.hasOwnProperty(k), "location contains " + k);
                }
            });

            t.equals(location.Area, "N1C 4AG", "location has default postcode");

            t.end();
        });
    });
}

function checkServiceAndPostcode (service, postcode) {

    test("server should return expected data structure from /services/" + service + "/locations/" + postcode + " with services and postcode", function(t) {

        var servicesProperties = dataProperties().services;

        request(apiUrl + "/services/" + service + "/locations/" + postcode, function(e, h, b) {

            var properties, location, firstProperty;
            b = JSON.parse(b);

            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");

            properties = b.properties;
            location = b.location

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];

            whichArrays(service).propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            });
            whichArrays(service).locationsKeys.map(function(k) {
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, postcode, "location postcode is " + postcode );

            t.end();

        });
    });
}

function checkServiceAndStreetname (service, streetname) {


    test("server should return expected data structure from /services/" + service + "/locations/" + streetname + " with services and streetname", function(t) {

        var servicesProperties = dataProperties().services;

        request(apiUrl + "/services/Lunch club/locations/well road", function(e, h, b) {

            var properties, location, firstProperty;
            b = JSON.parse(b);

            t.ok(b.hasOwnProperty("properties"), "response has properties property");
            t.ok(b.hasOwnProperty("location"), "response has location property");

            properties = b.properties;
            location = b.location

            t.ok(properties.length >= 1, "properties is populated");
            t.equals(typeof location, "object", "location is an object");

            firstProperty = properties[0];

            whichArrays(service).propertiesKeys.map(function(k) {
                t.ok(firstProperty.hasOwnProperty(k), "properties contain " + k);
            });
            whichArrays(service).locationsKeys.map(function(k) {
                if(k !== "Area"){
                    t.ok(location.hasOwnProperty(k), "location contains " + k);
                }
            });

            t.end();

        });

    });

}

server.start(function(){
    console.log("server started and tests running ...");

    test("server should return 200", function(t) {

        request(apiUrl, function(e, h, b) {

            t.equals(h.statusCode, 200, "server is working");
            t.end();

        });

    });


    menu.map(function(i) {

        var item;
        if (i.type === "service") {
            item = i.title + i.text;
            checkService(item);
            checkServiceAndPostcode(item, "NW1 0NE");
            checkServiceAndStreetname(item, "Well Road");
        }
    });


    test("stop", function(t) {
        t.end();
        process.exit();
    });

});
