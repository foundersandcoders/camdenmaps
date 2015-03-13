var test = require("tape");
var convertXml = require("../../server/handlers/convertXml.js");
var parsers = require("../../server/lib/parsers.js");

var parser = function (xml) {
    var json = xml;
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
        params: {}
    };
    var res = {
        on: function(ev, cb) {
            cb({test:"mockdata", location: {}})
        }
    };
    var cache = {
        setCache: function (key, response, rep) {
            t.ok(response.hasOwnProperty("latitude"), "response has latitude");
            t.ok(response.hasOwnProperty("longitude"), "response has latitude");
        }
    };
    var convert = convertXml.parserRouter(parser, cache);
    convert(null, res, req, null);


});
