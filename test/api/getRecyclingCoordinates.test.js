var test = require("tape");
var getRecyclingCoordinates = require("../../server/lib/getRecyclingCoordinates.js");
var recyclingServices = require("../../server/config/serverConfig.js").map.serviceArrays.recycling;

test("getRecyclingCoordinates should contain isRecyclingService method", function(t) {

    t.ok(getRecyclingCoordinates.hasOwnProperty("isRecyclingService"), "isRecyclingService exists");
    t.equals(typeof getRecyclingCoordinates.isRecyclingService, "function", "isRecyclingService is a function");

    t.end();


});

test("isRecyclingService should return false if service is not in recyclingServices", function(t) {

    t.notOk(getRecyclingCoordinates.isRecyclingService("test"), "returns false for test");
    t.notOk(getRecyclingCoordinates.isRecyclingService("dog"), "returns false for test");
    t.notOk(getRecyclingCoordinates.isRecyclingService("fail"), "returns false for test");
    t.end();

});


test("isRecyclingService should return true if service is in recyclingServices", function(t) {

    recyclingServices.map(function(s) {

        t.ok(getRecyclingCoordinates.isRecyclingService(s), "returns true for " + s);

    });

    t.end();

});