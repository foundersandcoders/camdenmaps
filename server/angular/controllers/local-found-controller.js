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

            $scope.exit = function exit() {
                $location.path("/home/neighbourhood");
            };

            //search api for uprn
            apiSearch.searchNeighbourhood($stateParams.uprn)
                .success(function(data) {
                    
                    if (data.hasOwnProperty("error")) {
                        $location.path("/home/neighbourhood");
                        return $scope.updateError(data.message);
                    }
                    $scope.updateError("");
                    $scope.markers.neighbourhood = {
                        lat: Number(data.location.Latitude),
                        lng: Number(data.location.Longitude),
                        icon: {
                            iconSize: [28],
                            iconUrl: "../img/icons/location-marker.png"
                        },
                    };

                    $scope.update("centre", {
                        lat: (Number(data.location.Latitude) - 0.003),
                        lng: (Number(data.location.Longitude) - 0.004),
                        zoom: 15
                    });

                    return $scope.update("information", data.information);
                })
                .error(function(data) {
                    $scope.updateError("Sorry, it looks like something went wrong");
                    return $location.path("/home/neighbourhood");
                });

            //$scope.noLocationNeighbourhood = false;

        }
    ];
}());
