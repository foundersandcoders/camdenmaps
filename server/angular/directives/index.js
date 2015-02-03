/******************************************************************************  
*   DIRECTIVE/INDEX.JS
*   Description: Defines angular directives
*   Use: Registers directives with directives module and injects to core module
*    
*******************************************************************************/

;(function () {
    "use strict";

    angular.module("maps")

        .directive("titletoggle", require("./title-toggle-directive.js"))
        .directive("injectservices", require("./services-directive.js"))
}());
