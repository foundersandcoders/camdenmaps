var test = require("tape");
var mapConfig = require("../../server/config/mapConfig.js");
var baseUrl = "http://maps.camden.gov.uk";
var nearEndpoint = "/nearest/nearestrest.aspx"
var streetEndpoint = "/streetworks/streetworksrest.aspx";


test("nearestMapper should forward request to proxy", function(t) {

    var req = {
        params: {
            service: "post office"
        }
    };

    function cb (whatever, url, headers) {

        t.equals(url, baseUrl + nearEndpoint + "?find=Post office&area=N1C 4AG",
                 "user redirected to camden nearest API");
        t.deepEquals(headers, {"Accept":"application/json"}, "application/json headers added");

        t.end();

    }

    mapConfig.nearestMapper(req, cb);

});

test("localMapper should forward request to proxy", function(t) {

    var req = {
        params: {
            uprn: "5023741"
        }
    };

    function cb (whatever, url, headers) {

        t.equals(url, baseUrl + nearEndpoint + "?uprn=5023741&tab=m",
                 "user redirected to camden local information API");
        t.deepEquals(headers, {"Accept":"application/json"}, "application/json headers added");

        t.end();

    }

    mapConfig.localMapper(req, cb);

});

test("streetWorks should forward request to proxy", function(t) {

    var req = {
        params: {
            postcode: "NW1 0NE"
        }
    };

    function cb (whatever, url, headers) {

        t.equals(url, baseUrl + streetEndpoint + "?area=NW1 0NE",
                 "user redirected to camden streetworks API");
        t.deepEquals(headers, {"Accept":"application/json"}, "application/json headers added");

        t.end();

    }

    mapConfig.streetworksMapper(req, cb);

});
