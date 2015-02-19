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
        		replace: 'true',
        		template: '<h4>{{ button.title }}</h4>',
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
