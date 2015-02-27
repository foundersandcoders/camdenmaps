var test = require("tape");
var mapUri = require("../../server/lib/mapUri.js");
var baseUrl = "http://maps.camden.gov.uk";
var streetworksApi = "/streetworks/streetworksrest.aspx";
var nearestApi = "/nearest/nearestrest.aspx";
var recyclingApi = "/nearest/recyclingrest.aspx";
var parkingApi = "/parkingbays/parkingbaysrest.aspx";

//MOCKS
var req;

//TESTS
test("mapUri should contain an object", function(t) {

    t.equals(typeof mapUri, "object", "mapUri contains a function");
    t.ok(mapUri.hasOwnProperty("mapUri"), "mapUri.mapUri exists");
    t.ok(mapUri.hasOwnProperty("mapQuery"), "mapUri.mapQuery exists");
    t.ok(mapUri.hasOwnProperty("mapStreetworks"), "mapUri.mapStreetworks exists");
    t.ok(mapUri.hasOwnProperty("mapLocalInformation"), "mapUri.mapLocalInformation exists");

    t.end();

});

//MAPQUERY
test("mapQuery should return a string", function(t) {

    req = {
        params: {
            service: "Library"
        }
    }

    t.equals(typeof mapUri.mapQuery(req), "string", "mapQuery returns a string");
    t.end();

});

test("mapQuery should return argument if not passed an object", function(t) {

    req = 2;
    t.equals(mapUri.mapQuery(req), 2, "doesn't accept a number");

    req = true;
    t.equals(mapUri.mapQuery(req), true, "doesn't accept a boolean");
    
    t.equals(typeof mapUri.mapQuery(), "undefined", "doesn't accept undefined");
    t.end();
});

test("mapQuery with /services/{service}/locations/lat/{latitude/lng/{longitude}", function(t) {

    req = {
        params: {
            latitude: "10",
            longitude: "20",
            service: "Library"
        }
    }

    t.equals(typeof mapUri.mapQuery(req), "string", "mapQuery returns a string");
    t.equals(mapUri.mapQuery(req), "?find=Library&lat=10&lng=20", "mapQuery returns ?find=service&lat=number&lng=number"); 
    t.end();

});


test("mapQuery with /services/{service}", function(t) {

    req = {
        params: {
            service: "Library"
        }
    }

    t.equals(typeof mapUri.mapQuery(req), "string", "mapQuery returns a string");
    t.equals(mapUri.mapQuery(req), "?find=Library&area=N1C 4AG", "mapQuery returns ?find=service&area=defaultpostcode"); 
    t.end();

});

test("mapQuery with /locations/{postcode}", function(t) {

    req = {
        params: {
            postcode: "NW1 0NE"
        }
    }

    t.equals(typeof mapUri.mapQuery(req), "string", "mapQuery returns a string");
    t.equals(mapUri.mapQuery(req), "?area=NW1 0NE", "mapQuery returns ?area=postcode");
    t.end();

});


test("mapQuery with /services/{service}/locations/{postcode}", function(t) {

    req = {
        params: {
            postcode: "NW1 0NE",
            service: "Library"
        }
    }

    t.equals(typeof mapUri.mapQuery(req), "string", "mapQuery returns a string");
    t.equals(mapUri.mapQuery(req), "?area=NW1 0NE&find=Library", "mapQuery returns ?area=postcode&find=service");
    t.end();

});



//MAPSTREETWORKS
test("mapStreetworks with /locations/lat/{latitude}/lng/{longitude}", function(t) {

    req = {
        params: {
            latitude: "10",
            longitude: "20"
        }
    }

    t.equals(typeof mapUri.mapStreetworks(req), "string", "mapStreetworks returns a string");
    t.equals(mapUri.mapStreetworks(req), baseUrl + streetworksApi + "?lat=10&lng=20", "mapStreetworks returns " + baseUrl + streetworksApi + "?lat=10&lng=20");
    t.end();

});


test("mapStreetworks with /locations/{postcode}", function(t) {

    req = {
        params: {
            postcode: "NW1 0NE"
        }
    }

    t.equals(typeof mapUri.mapStreetworks(req), "string", "mapStreetworks returns a string");
    t.equals(mapUri.mapStreetworks(req), baseUrl + streetworksApi + "?area=NW1 0NE", "mapStreetworks returns " + baseUrl + streetworksApi + "?area=NW1 0NE");
    t.end();

});



//MAPLOCALINFORMATION
test("mapLocalInformation with /address/{uprn}", function(t) {

    req = {
        params: {
            uprn: "NW1 0NE"
        }
    }

    t.equals(typeof mapUri.mapStreetworks(req), "string", "mapStreetworks returns a string");
    t.equals(mapUri.mapLocalInformation(req), baseUrl + nearestApi + "?uprn=NW1 0NE&tab=m", "mapLocalInformation returns " + baseUrl + nearestApi + "?uprn=NW1 0NE&tab=m");
    t.end();

});



//MAPURI
test("mapUri with /service/{service} with parking service", function(t) {

    req = {
        params: {
            service: "car park"
        } 
    };

    t.equals(typeof mapUri.mapUri(req), "string", "mapUri returns a string");
    t.equals(mapUri.mapUri(req), baseUrl + parkingApi + "?find=Car park&area=N1C 4AG", "mapUri returns " + baseUrl + parkingApi + "?find=car park&area=N1C 4AG");
    t.end();

});


test("mapUri with /service/{service}/location/{postcode} with parking service", function(t) {

    req = {
        params: {
            service: "car park",
            postcode: "NW1 0NE"
        } 
    };

    t.equals(typeof mapUri.mapUri(req), "string", "mapUri returns a string");
    t.equals(mapUri.mapUri(req), baseUrl + parkingApi + "?area=NW1 0NE&find=Car park", "mapUri returns " + baseUrl + parkingApi + "?area=NW1 0NE&find=Car park");
    t.end();

});


test("mapUri with /service/{service} with recycling service", function(t) {

    req = {
        params: {
            service: "Wood"
        } 
    };

    t.equals(typeof mapUri.mapUri(req), "string", "mapUri returns a string");
    t.equals(mapUri.mapUri(req), baseUrl + recyclingApi + "?recycle=Christmas Trees&area=N1C 4AG", "mapUri returns " + baseUrl + recyclingApi + "?recycle=Christmas Trees&area=N1C 4AG");
    t.end();

});


test("mapUri with /service/{service}/locations/{postcode} with recycling service", function(t) {

    req = {
        params: {
            service: "Wood",
            postcode: "NW1 0NE"
        } 
    };

    t.equals(typeof mapUri.mapUri(req), "string", "mapUri returns a string");
    t.equals(mapUri.mapUri(req), baseUrl + recyclingApi + "?area=NW1 0NE&recycle=Christmas Trees", "mapUri returns " + baseUrl + recyclingApi + "?area=NW1 0NE&recycle=Christmas Trees");
    t.end();

});

test("mapUri with /service/{service} with nearest service", function(t) {

    req = {
        params: {
            service: "Library"
        } 
    };

    t.equals(typeof mapUri.mapUri(req), "string", "mapUri returns a string");
    t.equals(mapUri.mapUri(req), baseUrl + nearestApi + "?find=Library&area=N1C 4AG", "mapUri returns " + baseUrl + recyclingApi + "?find=Library&area=N1C 4AG");
    t.end();

});

test("mapUri with /service/{service}/locations/{postcode} with nearest service", function(t) {

    req = {
        params: {
            service: "Library",
            postcode: "NW1 0NE"
        } 
    };

    t.equals(typeof mapUri.mapUri(req), "string", "mapUri returns a string");
    t.equals(mapUri.mapUri(req), baseUrl + nearestApi + "?area=NW1 0NE&find=Library", "mapUri returns " + baseUrl + recyclingApi + "?area=NW1 0NE&find=Library");
    t.end();

});
