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

test("/logs should return error logs");
