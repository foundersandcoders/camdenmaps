/*************************************
*   BETA BANNER DIRECTIVE.JS
*	use: to show or hide title based
*		on what has been rendered
*************************************/

;(function () {
    "use strict";

    module.exports = [
        function () {
        	return {
        		restrict: 'AEC',
                transclude: true,
            	templateUrl: 'partials/beta-banner.html',
                controller: 'betaBanner'
            }
        }
    ];
}());
