var test = require("tape");
var server = require("../../server/server.js");
var request = require("request");
var jwt = require("jsonwebtoken");

var apiUrl = "http://0.0.0.0:8080";

// BASIC
test("server should contain an object", function(t) {

    t.equals(typeof server, "object", "server contains an object");
    t.end();

});

server.start(function(){
    console.log("server started and tests running ...");

    test("server should return 200", function(t) {

        request(apiUrl + "/services/Library", function(e, h, b) {

            t.equals(h.statusCode, 200, "server returned status code 200");
            t.end();

        });

    });

// LOCAL INFORMATION
    test("server should return expected data structure from /addresses/{uprn} ", function(t) {

        var neighbourhoodProperties = dataProperties().neighbourhood;

        request(apiUrl + "/addresses/5023741", function(e, h, b) {

            var information, location, firstProperty;
            b = JSON.parse(b);

            t.ok(b.hasOwnProperty("information"), "response has information property");
            t.ok(b.hasOwnProperty("location"), "response has location property");

            information = b.information;
            location = b.location

            t.equals(typeof location, "object", "location is an object");
            t.equals(typeof information, "object", "information is an object");

            neighbourhoodProperties.informationKeys.map(function(k) {
                t.ok(information.hasOwnProperty(k), "information contains " + k);
            });
            neighbourhoodProperties.locationsKeys.map(function(k) {
                t.ok(location.hasOwnProperty(k), "location contains " + k);
            });

            t.equals(location.Area, "NW1 0JH", "location postcode is NW1 0JH");

            t.end();

        });

    });

// AUTHTOKEN
    test("server should return an auth token from /auth_token", function(t) {

        request(apiUrl + "/auth_token", function(e, h, b) {

            var token, decoded;
            t.ok(h.headers.hasOwnProperty("x-access-token"), "token received");

            token = h.headers["x-access-token"];
            decoded = jwt.decode(token, "changeme");

            t.equals(typeof decoded, "object", "token is valid");

            t.end();

        });

    });

// DOCS
    test("server should expose /api endpoint", function(t) {

        request(apiUrl + "/api", function(e, h, b) {

            t.equals(h.statusCode, 200, "/api returns 200");
            t.end();

        });

    });


// LOGS
    test("server should expose /logs endpoint", function(t) {

        request(apiUrl + "/logs", function(e, h, b) {

            t.equals(h.statusCode, 200, "/logs returns 200");
            t.ok(/text\/richtext/.test(h.headers["content-type"]), "content type is rich text");
            t.end();

            process.exit();
        });

    });

});




