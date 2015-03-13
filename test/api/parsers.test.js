var test = require("tape");
var parsers = require("../../server/lib/parsers.js");
var xml, json;
var fs = require("fs");
var path = require("path");
var _ = require("underscore");

//fs.writeFile(path.resolve(__dirname, "../fixtures/streetworks.json"), JSON.stringify(json), function (cb) {

test("streetworksApiParser should return data as expected", function(t) {

    xml = require("../fixtures/streetworksxml.js");
    json = parsers.streetworksApiParser(xml);

    t.ok(json, "data returned");
    t.ok(typeof json, "data is an object");
    t.deepEquals(json, require("../fixtures/streetworks.json"), "output matches expected");

    t.end();
});


/*test("localInformationApiParser should return data as expected", function(t) {

    xml = require("../fixtures/localinformationxml.js");
    json = parsers.localInformationApiParser(xml);
    console.log(json);

fs.writeFile(path.resolve(__dirname, "../fixtures/localinformation.json"), JSON.stringify(json), function (cb) {
    t.ok(json, "data returned");
    t.ok(typeof json, "data is an object");
    t.deepEquals(json, require("../fixtures/localinformation.json"), "output matches expected");
});
    t.end();

});*/



test("recyclingApiParser should return data as expected", function(t) {


    xml = require("../fixtures/recyclingxml.js");
    json = parsers.recyclingApiParser(xml);
    json = _.clone(json);

    t.ok(json, "data returned");
    t.ok(typeof json, "data is an object");

    t.equals(json.properties.length, require("../fixtures/recycling.json").properties.length, "properties are same length");

    t.end();


});


test("parkingApiParser should return data as expected", function(t) {

    xml = require("../fixtures/parkingxml.js");
    json = parsers.parkingApiParser(xml);

fs.writeFile(path.resolve(__dirname, "../fixtures/parking.json"), JSON.stringify(json), function (cb) {
    t.ok(json, "data returned");
    t.ok(typeof json, "data is an object");
    t.deepEquals(json, require("../fixtures/parking.json"), "output matches expected");

    t.end();
})
});
