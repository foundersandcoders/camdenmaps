/*************************************
*   TYPEAHEAD-DIRECTIVE.JS
*	
*************************************/

;(function () {
    "use strict";

    module.exports = [
        "$window",
        function ($window) {
        	return {
        		restrict: 'AEC',
                transclude: true,
            	templateUrl: 'partials/typeahead-search.html',
                controller: 'typeahead'
            };
        }
    ];
}());
