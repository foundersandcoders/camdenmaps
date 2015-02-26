var test = require("tape");
var cacheprotocol = require("../../server/lib/cacheprotocol.js");

test("cacheprotocol should contain a function", function(t) {

    t.equals(typeof cacheprotocol, "function", "cacheprotocol is a function");
    t.end();

});
