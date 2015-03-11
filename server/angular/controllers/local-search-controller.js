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
        "apiSearch",
        "$stateParams",
        "buttonHandlers",
        function ($scope, $location, localStorageService, apiSearch, $stateParams, buttonHandlers) {

            //model for page title
            $scope.title = "About your Neighbourhood";

            if ($stateParams.uprn) {

                $scope.showEnterLocation = false;
                $scope.showResetLocation = true;

            } else {

                $scope.showEnterLocation = true;
                $scope.showResetLocation = false;
            }

            //back button function
            $scope.searchAgain = function() {
                return $location.path("/home");
            };
            //back button text
            $scope.backButtonText = "Main Menu";

            $scope.icon = "img/icons/your-neighbourhood-black.png";

            $scope.returnToCategories = buttonHandlers.searchAgain($scope, "/home/");

            $scope.changeAddress = buttonHandlers.changeUserLocation($scope, "home/neighbourhood");

        }
    ];
}());
