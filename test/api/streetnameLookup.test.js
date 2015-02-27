var test = require("tape");
var streetnameLookup = require("../../server/lib/streetnameLookup.js");

test("streetnameLookup should contain an object", function(t) {

    t.equals(typeof streetnameLookup, "object", "streetnameLookup contains an object");
    t.ok(streetnameLookup.hasOwnProperty("fetchPostcode"), "streetnameLookup.fetchPostcode exists");
    t.ok(streetnameLookup.hasOwnProperty("validatePostcode"), "streetnameLookup.validatePostcode exists");
    t.ok(streetnameLookup.hasOwnProperty("registerPreHandler"), "streetnameLookup.registerPreHandler exists");

    t.end();

});


test("validatePostcode returns true for valid postcodes", function(t) {

    var validPostcodes = ["N103EP", "n10 3ep", "N W 1 0 n e", "NC1 4ag"];

    var invalidPostcodes = [false, "animal", {}, undefined, null, true, 8989];

    validPostcodes.map(function(p) {
        t.ok(streetnameLookup.validatePostcode(p), p + " is a valid postcode");
    });
    invalidPostcodes.map(function(p) {
        t.notok(streetnameLookup.validatePostcode(p), p + " is not a valid postcode");
    });
    t.end();

});

test("registerPreHandler attaches fetchPostcode to server extension point onPreHandler", function(t) {

    var server = {};
    server.ext = function(val, func) {
        this[val] = func;
    };

    streetnameLookup.registerPreHandler(server);
    t.ok(server.hasOwnProperty("onPreHandler"), "server has property onPreHandler");
    t.equals(typeof server.onPreHandler, "function", "server.onPreHandler is a function");
    t.end();

});
