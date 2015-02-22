/*************************************
*   TYPEAHEAD-DIRECTIVE.JS
*	
*************************************/

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
