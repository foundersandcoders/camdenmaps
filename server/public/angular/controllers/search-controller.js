/********************************
*   SEARCH-CONTROLLER.JS
*
********************************/

//TODO: Better error handling
//TODO: Must have input validation for address/street name: HOW??? 
//TODO: Add button handlers for 'Search Again' and 'List Results'


;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$stateParams",
        "$location",
        function ($scope, $stateParams, $location) {

            //model for search query
            $scope.address = "";
            //model for error messages
            $scope.error = "";
            //model for service results
            $scope.results = [];

            //populate results with all services
            $scope.results = apiSearch.search($stateParams.service);

            //redirects to next state when provided with address
            $scope.search = function search () {
                if ($scope.address) {
                    var path = "/" + $stateParams.service + "/location/" + $scope.address;
                    $location.path(path);
                } else {
                    $scope.error = "Please enter an address";
                } 
            }
        }
    ];
}());
