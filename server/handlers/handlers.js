/*******************************************************
*   HANDLERS.JS
*   Description: Define the handlers for the core routes
*   Use: Imported by routes.js
********************************************************/

var fs = require("fs");
var path = require("path");

;(function () {
    "use strict";

    module.exports = {
        //handler: function (req, res) {  res(handlerbody)  }

        showDocsHome: function showDocsHome (req, res) {
            res.file("../public/docs/index.html");
        },

        getHome: function getHome (req, res) {
            res.file("../public/index.html");
        },

        getLogs: function getLogs (req, res) {
            fs.readFile(path.join(__dirname, "../logs/server_log"), function(err, data) {
                res(data.toString())
                    .type("text/richtext");
            });
        }

    };

}());
