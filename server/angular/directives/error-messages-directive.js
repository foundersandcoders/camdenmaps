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
