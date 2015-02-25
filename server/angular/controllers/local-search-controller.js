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
        "buttonHandlers",
        function ($scope, $location, apiSearch, buttonHandlers) {

            //model for page title
            $scope.title = "About your Neighbourhood";

            //back button function
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");

            //back button text
            $scope.backButtonText = "Main Menu";

            $scope.icon = "img/icons/your-neighbourhood-white.png";
            
            
        }
    ];
}());
