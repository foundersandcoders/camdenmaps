/*******************************************************
*   HANDLERS.JS
*   Description: Define the handlers for the core routes
*   Use: Imported by routes.js
********************************************************/

var fs = require("fs");
var path = require("path");


;(function () {
    "use strict";

    var fs = require("fs");
    var path = require("path");
    var jwt = require("jsonwebtoken");
    var secret = process.env.JWT_SECRET || "changeme";

    module.exports = {
        //handler: function (req, res) {  res(handlerbody)  }

        showDocsHome: function showDocsHome (req, res) {
            res.file("../public/docs/index.html");
        },

        getHome: function getHome (req, res) {
            res.file("../public/index.html");
        },

        getLogs: function getLogs (req, res) {
            fs.readFile(path.join(__dirname, "../logs/server_log.txt"), function(err, data) {
                res(data.toString())
                    .type("text/richtext");
            });
        },

        issueToken: function issueToken (req, res) {
            var token = jwt.sign({
                auth: "magic",
                agent: req.headers["user-agent"],
                exp: new Date().getTime() + 1000*60*60
            }, secret);

            return res("Heres a token")
                .header( "X-Access-Token", token );

        }

    };

}());
