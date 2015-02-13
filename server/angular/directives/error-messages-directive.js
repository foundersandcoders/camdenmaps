/*************************************
*   ERROR-MESSAGES-DIRECTIVE.JS
*	
*************************************/

;(function () {
    "use strict";

    module.exports = [
        "$location",
        function (location) {
        	return {
        		restrict: 'AEC',
            	template: '<p ng-hide={{error}}>{{error}}</p>',
                link: function(scope, element, attribute) {

                    var inputBox = $('.search-box');
                    var errorBox = $('.errormessage');

                    scope.updateError = function (type, newType){
                        scope[type] = newType;

                        element.css('display', 'block');

                        if (location.path().indexOf('/neighbourhood') > -1) {

                            errorBox.css('top', '3em')
                        } else {
                            inputBox.css('margin-top', '1.5em');
                        }
                    };

                    if (location.path().indexOf('/neighbourhood')) {

                    }
                }
            }
        }
    ];
}());
