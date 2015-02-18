/*******************************************************
*   HANDLERS.JS
*   Description: Define the handlers for the core routes
*   Use: Imported by routes.js
********************************************************/

var db = require("../lib/addressdb.js")(require("../lib/address.json"));

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

        addressLookup: function addressLookup (req, res) {
            db.search(req.params.searchTerm, function(err, data) {
                if (err) {
                    console.log(err);
                    return res("Sorry, could not find any matches");
                } else {
                    return res(data);
                }
            });
        }

    };

}());
