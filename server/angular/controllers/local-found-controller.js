/*****************************
*   LOCAL-FOUND-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "apiSearch",
        "$stateParams",
        function ($scope, $location, apiSearch, $stateParams) {

            console.log("something");


            $scope.information;

            //search api for uprn
            apiSearch.searchNeighbourhood($stateParams.uprn)
                .success(function(data) {
                    $scope.information = data.information;
                })
                .error(function(data) {
                    $location.path("/home/neighbourhood");
                });

        }
    ];
}());
