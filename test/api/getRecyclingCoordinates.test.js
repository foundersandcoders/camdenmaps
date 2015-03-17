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

test("getRecyclingCoordinates should contain createQuery", function(t) {

    t.ok(getRecyclingCoordinates.hasOwnProperty("createQuery"), "createQuery exists");
    t.equals(typeof getRecyclingCoordinates.createQuery, "function", "and is a function");

    t.end();

});

test("createQuery returns url string with postcode if req.params.postcode", function(t) {

    var req = {

        params: {

            postcode: "NW1 0NE"

        }

    };

    t.equals(getRecyclingCoordinates.createQuery(req), "http://maps.camden.gov.uk/parkingbays/parkingbaysrest.aspx?area=NW1 0NE", "returns parking uri with area query");

    t.end();

});


test("createQuery returns url string with if req.params.latitude", function(t) {

    var req = {

        params: {

            latitude: 10,
            longitude: 20

        }

    };

    t.equals(getRecyclingCoordinates.createQuery(req), "http://maps.camden.gov.uk/parkingbays/parkingbaysrest.aspx?lat=10&lng=20", "returns parking uri with lat and lng queries");

    t.end();

});

test("createQuery returns baseUrl if req doesn't have any params", function(t) {

    var req = {
        params: {}
    };

    t.equals(getRecyclingCoordinates.createQuery(req), "http://maps.camden.gov.uk/parkingbays/parkingbaysrest.aspx", "base Url returned");

    t.end();

});

test("getRecyclingCoordinates has makeRequest function", function(t) {

    t.ok(getRecyclingCoordinates.hasOwnProperty("makeRequest"), "makeRequest exists");
    t.equals(typeof getRecyclingCoordinates.makeRequest, "function", "and is a function");

    t.end();
});


test("makeRequest should add latitude and longitude to req.app if result contains it", function(t) {

    function requester (uri, cb) {
        cb(null, null, require("../fixtures/parking.xml.js"));
    }

    var req = {

        params: {

            latitude: 10,
            longitude: 20

        },
        app: {}

    };

    function responseParser (data, cb) {
        var jsonMock = {
            Locations: {
                $: {
                    Lat: 10,
                    Lng: 20
                }
            }
        }

        cb(null, jsonMock);

    }

    var res = {
        continue: function() {
            t.ok(true, "res.continue executed");
            t.end();
        }
    };

    getRecyclingCoordinates.makeRequest(req, requester, responseParser, res);

    t.ok(req.app.hasOwnProperty("latitude"), "latitude added to req.app");
    t.ok(req.app.hasOwnProperty("longitude"), "longitude added to req.app");


});

test("makeRequest should continue without changing req.app if result doesn't contain latitude/longitude", function(t) {

    function requester (uri, cb) {
        cb(null, null, require("../fixtures/parking.xml.js"));
    }

    var req = {

        params: {

            latitude: 10,
            longitude: 20

        },
        app: {}

    };

    function responseParser (data, cb) {
        var jsonMock = {
            Locations: {
                $: {}
            }
        }

        cb(null, jsonMock);

    }

    var res = {
        continue: function() {
            t.ok(true, "res.continue executed");
            t.end();
        }
    };

    getRecyclingCoordinates.makeRequest(req, requester, responseParser, res);

    t.notOk(req.app.hasOwnProperty("latitude"), "req.app is empty still");
    t.notOk(req.app.hasOwnProperty("longitude"), "req.app is empty still");


});


test("getRecyclingCoordinates should have fetchCoordinates", function(t) {

    t.ok(getRecyclingCoordinates.hasOwnProperty("fetchCoordinates"), "fetchCoordinates exists");
    t.equals(typeof getRecyclingCoordinates.fetchCoordinates, "function", "and is a function");

    t.end();
});


test("fetchCoordinates should skip if not recycling service or location not specified", function(t) {

    t.plan(2);
    var req = {
        params: {
            service: "false"
        }
    };
    var res = {
        continue: function() {
            t.ok(true, "res.continue() called directly");
        }
    };
    getRecyclingCoordinates.fetchCoordinates(req, res);

    req = {
        params: {
            service: "Wood"
        }
    }

    getRecyclingCoordinates.fetchCoordinates(req, res);


});


test("fetchCoordinates should call makeRequest if recycling service and location is specified", function(t) {

    t.plan(1);
    var req = {
        params: {
            service: "Wood",
            postcode: "NW1 0NE"
        },
        app: {}
    };
    var res = {
        continue: function() {
            if(req.app.hasOwnProperty("latitude")) {
                t.ok(true, "res.continue() called directly");
            }
        }
    };
    getRecyclingCoordinates.fetchCoordinates(req, res);


});
