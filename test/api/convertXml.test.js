var test = require("tape");
var convertXml = require("../../server/handlers/convertXml.js");
var parsers = require("../../server/lib/parsers.js");

var parser = function (xml) {
    var json = {test:"mockdata", location: {}};
    return json;
};

test("convertXml.parserRouter should return a function", function(t) {

    t.equals(typeof convertXml.parserRouter(parsers.localInformation), "function", "returns a function");
    t.equals(typeof convertXml.convertLocalInformation, "function", "is a function");
    t.equals(typeof convertXml.convertStreetworks, "function", "is a function");
    t.equals(typeof convertXml.convertToJson, "function", "is a function");

    t.end();
});

test("convertXml should return error if err", function(t) {

    t.plan(1)

    var converter = convertXml.parserRouter(parser);
    var rep = function(resp){
        t.ok(resp.hasOwnProperty("error"), "error replied to client");
    }

    converter(true, null, null, rep);

});

test("convertXml should add latitude and longitude properties to response.app if req.app has them", function(t) {

    t.plan(2);

    var req = {
        app: {
            latitude: 20,
            longitude: 10
        },
        params: {},
        raw: { req: { url: "hello" } }
    };
    var res = {
        on: function(ev, cb) {
            cb()
        }
    };
    var cache = {
        setCache: function (key, response, rep) {
            t.ok(response.location.hasOwnProperty("Latitude"), "response has latitude");
            t.ok(response.location.hasOwnProperty("Longitude"), "response has latitude");
        }
    };
    var convert = convertXml.parserRouter(parser, cache);
    convert(null, res, req, null);


});


test("convertXml should call cache.setCache() at the end if no errors", function(t) {

    var req = {
        app: {
            latitude: 20,
            longitude: 10
        },
        params: {},
        raw: { req: { url: "hello" } }
    };
    var res = {
        on: function(ev, cb) {
            cb()
        }
    };
    var cache = {
        setCache: function (key, response, rep) {
            t.ok(true, "setCache called");
            t.end();
        }
    };
    var convert = convertXml.parserRouter(parser, cache);
    convert(null, res, req, null);

});

test("convertXml should return error if not recycling service AND doesn't have location details", function(t) {

    var req = {
        app: {},
        params: {
            service: "Lunch club"
        },
        raw: { req: { url: "hello" } }
    };
    var res = {
        on: function(ev, cb) {
            cb()
        }
    };
    var cache = {
        setCache: function (key, response, rep) {
            t.ok(true, "setCache called");
            t.end();
        }
    };
    var rep = function(response) {
        t.ok(response.hasOwnProperty("error"), "error returned to client");
        t.end();
    };
    var convert = convertXml.parserRouter(parser, cache);
    convert(null, res, req, rep);

});
