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

                    scope.updateError = function (message){
                        scope.error = message;                 

                        if (message === "") {
                            element.css("display", "none");
    
                        } else {
 
                            element.css('display', 'block');
                            
                        }
                    };


                }
            };
        }
    ];
}());
