/*******************************************************
*   HANDLERS.JS
*   Description: Define the handlers for the core routes
*   Use: Imported by routes.js
********************************************************/

var fs = require("fs");
var path = require("path");
var request = require("request");


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
            return res.file("../public/index.html");
        },

        getLogs: function getLogs (req, res) {
            fs.readFile(path.join(__dirname, "../logs/server_log.txt"), function(err, data) {
                if (!err && data) {
                    data = data.toString();
                } else {
                    return res("Error accessing logs");
                }
                return res(data)
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

        },

        fetchUPRN: function(req, res) {
            request("http://camdenmaps.herokuapp.com/auth_token", function(err, response, body) {
                    var path = "http://camdenmaps-addresslookup.herokuapp.com/search/" + req.params.path;
                    var opts = {
                        url: path,
                        headers: {
                            "X-Access-Token": response.headers["x-access-token"]
                        }
                    }
                    request(opts , function(e, h, b) {
                        var firstItem;
                        try {
                            firstItem = JSON.parse(b)[0]
                            return res(firstItem.UPRN);
                        } catch (error) {
                            return res("Not found");
                        }
                    });
            });
        }

    };

}());
