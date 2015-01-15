/************************************************************************************
*   APP.JS
*   Description: Define core angular module
*   Use: Initialize core angular module and register controllers, directives and services.i
*
*************************************************************************************/

//TODO: Find out why it only works when controllers and services are registered directly

;(function () {
    "use strict";

    var angular = require("angular");

    angular.module("maps", [
            require("angular-ui-router"),
            "leaflet-directive"
    ])

    .config( require("./config.js") );


    angular.element(document).ready(function toggle() {
         var findYourNearest = $('#findYourNearest');

        if (findYourNearest.length === 0) {
            return true;
        } else {
            return false;
        }
    });
        
  require("./controllers");


}());

