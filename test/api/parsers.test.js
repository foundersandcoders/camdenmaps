//TODO: find workaround for JSON trimming null and undefined properties from object while testin recycling parser

var test = require("tape");
var parsers = require("../../server/lib/parsers.js");
var fs = require("fs");
var path = require("path");

var xml, json;

test("streetworksApiParser should return data as expected", function(t) {

    xml = require("../fixtures/streetworks.xml.js");
    t.ok(parsers.hasOwnProperty("streetworksApiParser"));
    json = parsers.streetworksApiParser(xml);

    t.deepEquals(json, require("../fixtures/streetworks.json"), "output matches expected structure");
    t.end();

});

test("localInformationApiParser should return data as expected", function(t) {

    xml = require("../fixtures/localinformation.xml.js");
    t.ok(parsers.hasOwnProperty("localInformationApiParser"));
    json = parsers.localInformationApiParser(xml);

    t.deepEquals(json, require("../fixtures/localinformation.json"), "output matches expected structure");
    t.end();

});
/*
test("recyclingApiParser should return data as expected", function(t) {

    xml = require("../fixtures/recycling.xml.js");
    t.ok(parsers.hasOwnProperty("recyclingApiParser"));
    json = parsers.recyclingApiParser(xml);
fs.writeFile(path.join(__dirname, "../fixtures/recycling.json"), JSON.stringify(json), function() {

    t.deepEquals(json, require("../fixtures/recycling.json"), "output matches expected structure");
    t.end();
	})

}); */

test("parkingApiParser should return data as expected", function(t) {

    xml = require("../fixtures/parking.xml.js");
    t.ok(parsers.hasOwnProperty("parkingApiParser"));
    json = parsers.parkingApiParser(xml);

    t.deepEquals(json, require("../fixtures/parking.json"), "output matches expected structure");
    t.end();

});

test("nearestApiParser should return data as expected", function(t) {

    xml = require("../fixtures/nearest.xml.js");
    t.ok(parsers.hasOwnProperty("nearestApiParser"));
    json = parsers.nearestApiParser(xml);

    t.deepEquals(json, require("../fixtures/nearest.json"), "output matches expected structure");
    t.end();

});

test("whichParser should parse depending on service", function(t) {

   var nearestService = "Lunch club";
   t.deepEquals(parsers.whichParser(require("../fixtures/nearest.xml.js"), nearestService), require("../fixtures/nearest.json"));
   var parkingService = "Car club";
   t.deepEquals(parsers.whichParser(require("../fixtures/parking.xml.js"), parkingService), require("../fixtures/parking.json"));
   var recyclingService = "Cardboard";
 //  t.deepEquals(parsers.whichParser(require("../fixtures/recycling.xml.js"), recyclingService), require("../fixtures/recycling.json"));
   t.end();
});
