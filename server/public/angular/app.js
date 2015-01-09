/*  APP.JS
*   Description: Define core angular module
*   Use: Initialize core angular module and register controllers, directives and services.
*/

(function () {
    "use strict";
    
    var app = angular.module("mapMain", ["ControllerModule", "DirectiveModule", "ServicesModule"]);
    app.config(require("./config.js"));
    
}());
