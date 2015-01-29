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
    require("angular-touch");
    angular.module("maps", [
            require("angular-ui-router"),
            "ngTouch",
            "leaflet-directive"
    ])

    .config( require("./config.js") );
        
  require("./controllers");
  require("./services");


}());

