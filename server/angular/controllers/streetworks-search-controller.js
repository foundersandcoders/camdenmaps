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

            //model for placeholder
            $scope.placeholder = "Please enter a postcode";
            //model for page title
            $scope.title = "Live Streetworks";

            //back button function
            $scope.searchAgain = function() {
                $location.path("/home");
            };
            //back button text
            $scope.backButtonText = "Main Menu";

        }
    ];
}());
