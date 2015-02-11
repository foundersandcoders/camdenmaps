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


            $scope.information;

            //search api for uprn
            apiSearch.searchNeighbourhood($stateParams.uprn)
                .success(function(data) {
                    if (data.hasOwnProperty("error")) {
                        return $scope.update("error", data.message);
                    }
                
                    $scope.information = data.information;
                })
                .error(function(data) {
                    $scope.update("error", "Sorry, it looks like something went wrong");
                    return $location.path("/home/neighbourhood");
                });

        }
    ];
}());