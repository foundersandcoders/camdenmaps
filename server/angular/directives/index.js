/******************************************************************************  
*   DIRECTIVE/INDEX.JS
*   Description: Defines angular directives
*   Use: Registers directives with directives module and injects to core module
*    
*******************************************************************************/

;(function () {
    "use strict";

    angular.module("maps")
        .directive("typeaheadsearch", require("./typeahead-directive.js"))
        .directive("errormessage", require("./error-messages-directive.js"))
		.directive("collapseWidth", require("./collapse-width-directive.js"));
}());