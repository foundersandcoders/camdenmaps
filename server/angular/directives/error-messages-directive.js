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

                            if (location.path().indexOf('/neighbourhood') > -1) {
                                errorBox.css('top', '3em');
                            } else if (location.path().indexOf('/services') > -1) {
                                console.log(errorBox)
                                errorBox.css('top', '-3.5em');
                                errorBox.css('position', 'absolute');
                                errorBox.css('z-index', '1');
                            } else {
                                inputBox.css('margin-top', '1.5em');
                            }
                        }
                    };


                }
            };
        }
    ];
}());
