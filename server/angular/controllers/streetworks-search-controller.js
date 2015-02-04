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
            $scope.placeholder = "Please enter a postcode"
            //model for address input
            $scope.address = "";
            //model for page title
            $scope.title = "Live Streetworks";

            //function for searching uprn
            $scope.search = function () {
                if ($scope.address) {
                    $location.path("/home/streetworks/location/" + $scope.address);
                } else {
                    $scope.error = "Sorry, that didn't look right";
                } 
            }

            //back button function
            $scope.searchAgain = function() {
                $location.path("/home");
            }
            //back button text
            $scope.backButtonText = "Main Menu";



        }
    ];
}());
