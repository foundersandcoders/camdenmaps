/*****************************
*   STREETWORKS-SEARCH-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        function ($scope, $location) {
            
            $scope.showAccordion = false;

            $scope.category = {
                title: "Live streetworks",
                img: "img/icons/streetworks-black.png"
            }

            //back button function
            $scope.searchAgain = function() {
                $location.path("/home");
            };
            //back button text
            $scope.backButtonText = "Main Menu";

        }
    ];
}());
