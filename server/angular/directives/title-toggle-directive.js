/*************************************
*   TITLE TOGGLE DIRECTIVE.JS
*	use: to show or hide title based
*		on what has been rendered
*************************************/


;(function () {
    "use strict";

    module.exports = [
    	"$location",
        function (location) {
        	return {
        		restrict: 'AE',
        		replace: false,
        		templateUrl: 'partials/hometoggle.html',
        		link: function(scope, element, attribute) {

        			scope.$watch( function() {

        				if (location.$$url === '/home') {
		                    element.css('display', 'block');
		                } else {
		                    element.css('display', 'none');
		                }
        			})
        		}

        	}
        }
    ];
}());
