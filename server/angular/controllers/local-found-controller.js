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

            $scope.isListShowing = true;

            $scope.exit = function exit() {
                $location.path("/home/neighbourhood");
            };

            var pollingStationCoordinates;

            $scope.showPollingStation = false;

            function getPollingStationCoordinates (uprn) {

                apiSearch.searchNeighbourhood(uprn)
                    .success(function(data) {

                        pollingStationCoordinates = {

                            lat: Number(data.location.Latitude),
                            lng: Number(data.location.Longitude),
                            //icon: {
                            //    iconSize: [28]
                            //}

                        }

                        if($scope.showPollingStation) {
                            $scope.markers.pollingStation = pollingStationCoordinates;
                        }

                    });

            }

            function hasPollingStation (data) {

                return data.information.hasOwnProperty("Polling Station")

            }

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
                    if (hasPollingStation(data)) {
                        var pollingStationUPRN = data.information["Polling Station"].Url.split("uprn=").pop();
                        console.log(pollingStationUPRN);
                        getPollingStationCoordinates(pollingStationUPRN);
                    }
                    return $scope.update("information", data.information);
                })
                .error(function(data) {
                    $scope.updateError("Sorry, it looks like something went wrong");
                    return $location.path("/home/neighbourhood");
                });

            $scope.togglePollingStation = function() {

                if ($scope.showPollingStation) {
                    $scope.showPollingStation = false;
                    delete $scope.markers.pollingStation;
                } else {
                    $scope.showPollingStation = true;
                    $scope.markers.pollingStation = pollingStationCoordinates;
                }

            }
            //$scope.noLocationNeighbourhood = false;

        }
    ];
}());
