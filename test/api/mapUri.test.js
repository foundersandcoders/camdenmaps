var test = require("tape");
var mapUri = require("../../server/lib/mapUri.js");

test("mapUri should contain an object", function(t) {

    t.equals(typeof mapUri, "object", "mapUri contains a function");
    t.ok(mapUri.hasOwnProperty("mapUri"), "mapUri.mapUri exists");
    t.ok(mapUri.hasOwnProperty("mapQuery"), "mapUri.mapQuery exists");
    t.ok(mapUri.hasOwnProperty("mapStreetworks"), "mapUri.mapStreetworks exists");
    t.ok(mapUri.hasOwnProperty("mapLocalInformation"), "mapUri.mapLocalInformation exists");

    t.end();

});
