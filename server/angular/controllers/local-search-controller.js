/*****************************
*   LOCAL-SEARCH-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "apiSearch",
        function ($scope, $location, apiSearch) {

            //model for page title
            $scope.title = "About your Neighbourhood";

            //back button function
            $scope.searchAgain = function() {
                return $location.path("/home");
            }
            //back button text
            $scope.backButtonText = "Main Menu";

        }
    ];
}());
