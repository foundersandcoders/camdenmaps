/*****************************
*   LOCAL-SEARCH-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "localStorageService",
        function ($scope, $location, localStorageService) {

            //model for placeholder
            $scope.placeholder = "Please enter a UPRN (5023741)"
            //model for address input
            $scope.address = "";
            //model for page title
            $scope.title = "About your Neighbourhood";

            //function for searching uprn
            $scope.search = function () {
                if ($scope.address) {

                    $location.path("/home/neighbourhood/" + $scope.address);
                } else {
                    $scope.update("error", "Sorry, that didn't look right");
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
