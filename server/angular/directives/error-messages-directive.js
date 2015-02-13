/*************************************
*   ERROR-MESSAGES-DIRECTIVE.JS
*	
*************************************/

;(function () {
    "use strict";

    module.exports = [
        function () {
        	return {
        		restrict: 'AEC',
            	template: '<p ng-hide={{error}}>{{error}}</p>',
                link: function(scope, element, attribute) {

                    var inputBox = $('.search-box');

                    scope.updateError = function (type, newType){
                        scope[type] = newType;
                        element.css('display', 'block');
                        inputBox.css('margin-top', '1.5em');
                    };
                }
            }
        }
    ];
}());
