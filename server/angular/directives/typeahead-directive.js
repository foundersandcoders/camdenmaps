/*************************************
*   SERVICES DIRECTIVE.JS
*	use: to show or hide title based
*		on what has been rendered
*************************************/

var menu = require("../menu.json");

;(function () {
    "use strict";

    module.exports = [
        function () {
        	return {
        		restrict: 'AEC',
            transclude: true,
        	templateUrl: 'partials/typeahead-search.html',
            controller: 'typeahead'
        	}
        }
    ];
}());
