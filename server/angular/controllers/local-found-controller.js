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
                        return $scope.updateError("error", data.message);
                    }
                
                    return $scope.update("information", data.information);
                })
                .error(function(data) {
                    $scope.updateError("error", "Sorry, it looks like something went wrong");
                    return $location.path("/home/neighbourhood");
                });

        }
    ];
}());
