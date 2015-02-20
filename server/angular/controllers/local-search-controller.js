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
        function ($scope, $location, localStorageService, apiSearch) {

            //model for placeholder
            $scope.placeholder = "Please enter a UPRN (5023741)";
            //model for address input
            $scope.address = "";
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

            //back button function
            $scope.searchAgain = function() {
                return $location.path("/home");
            }
            //back button text
            $scope.backButtonText = "Main Menu";



        }
    ];
}());
