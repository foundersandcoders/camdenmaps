/*******************************************************
*   HANDLERS.JS
*   Description: Define the handlers for the core routes
*   Use: Imported by routes.js
********************************************************/
(function () {
    "use strict";

    module.exports = {
        //handler: function (req, res) {  res(handlerbody)  }

        showDocsHome: function showDocsHome (req, res) {
        		res.file("../public/docs/index.html");
        	},

        getHome: function getHome (req, res) {
            res.file("../public/index.html");
        }

    };

}());
