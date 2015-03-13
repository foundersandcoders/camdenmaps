var test = require("tape");
//var handlers = require("../../server/handlers/handlers.js");
var server = require("../../server/server.js");

function createReq (method, path) {
    var opts = {};
    opts.method = method;
    opts.url = path;
    return opts;
}

test("/api should return swagger docs", function(t) {

    var req = createReq("GET", "/api");
    server.inject(req, function(res){
        t.equals(res.statusCode, 200, "200 code received");

        t.ok(/swagger/.test(res.payload), "swagger is present on page");
        t.ok(/<title>Swagger UI<\/title>/.test(res.payload), "title is Swagger UI");

        t.end();

    });

});

test("/ should return index.html", function(t) {

    var req = createReq("GET", "/");
    server.inject(req, function(res) {

        t.equals(res.statusCode, 200, "200 received");

        t.ok(/<title>Camden Council: Find Your Nearest<\/title>/, "index title received");

        t.end();

    });

});

test("/logs should return error logs", function(t) {

    var req = createReq("GET", "/logs");
    server.inject(req, function(res) {

        t.equals(res.statusCode, 200, "200 code received");

        t.end();

    });


});

test("/auth_token should return auth_token in header", function(t) {

    var req = createReq("GET", "/auth_token");

    server.inject(req, function(res) {

        t.equals(res.statusCode, 200, "200 code received");

        t.ok(res.headers.hasOwnProperty("x-access-token"), "res has x-access-token header");

        t.end();

    });

});

test("/uprn/{searchterm} should return uprn", function(t) {

    var req = createReq("GET", "/uprn/cam");
    server.inject(req, function(res){
        t.equals(res.statusCode, 200, "200 code received");

        t.ok(/\d{0,8}/.test(res.payload), "uprn returned");

        t.end();
    });

});

test("/uprn/{uprn} should return 'Not found' if not found", function(t) {

    var req = createReq("GET", "/uprn/YOUCANNOTFINDTHIS");
    server.inject(req, function(res){
        t.equals(res.statusCode, 200, "200 code received");

        t.ok(/Not found/.test(res.payload), "Not found returned");

        t.end();
    });

});
