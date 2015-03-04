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

            //function for searching uprn
            $scope.search = function () {

                if ($scope.address) {

                    apiSearch.searchNeighbourhood($scope.address)
                        .success(function(data) {
                            if (data.hasOwnProperty("error")) {
                                $location.path("/home/neighbourhood");
                                return $scope.updateError(data.message);
                            }
                            
                            $scope.update("error", "");
                            $scope.update("information", data.information);
                            return $location.path("/home/neighbourhood/" + $scope.address);

                        })
                        .error(function(data) {
                            return $scope.updateError("Sorry, it looks like something went wrong");
                        });

                } else {
                    $scope.updateError("Sorry, that didn't look right");
                } 
                
            };

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

            $scope.changeAddress = buttonHandlers.changeUserLocation($scope, "home/neighbourhood");

        }
    ];
}());
