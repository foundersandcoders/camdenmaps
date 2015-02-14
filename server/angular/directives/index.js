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
        .directive("servicestypeahead", require("./typeahead-directive.js"))
        .directive("betabanner", require("./beta-banner-directive.js"))
        .directive("errormessage", require("./error-messages-directive.js"));
}());
