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
                controller: 'typeahead',
                link: function(scope, element, attribute) {
                    var search = $(".clicktosearch")
                    var button = document.getElementsByTagName("button")[0];
                    var form = $('form');
                    
                    // button.addEventListener('click', function () {
                    //     search.css("display", "none");
                    //     form.css("display", "block");
                    // })
                }
            }
        }
    ];
}());
