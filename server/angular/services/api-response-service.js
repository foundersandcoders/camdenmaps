/*************************************
*   API-RESPINSE-SERVICE.JS
*
*************************************/

function getPollingStationCoordinates (scope, apiSearch, uprn) {

    apiSearch.searchNeighbourhood(uprn)
        .success(function(data) {

            pollingStationCoordinates = {

                lat: Number(data.location.Latitude),
                lng: Number(data.location.Longitude),
                icon: {
                    iconSize: [28],
                    iconUrl: "img/icons/ballot.png"
                }

            };

            if(scope.showPollingStation) {
                scope.markers.pollingStation = pollingStationCoordinates;
            }
        });
}

function hasPollingStation (data) {

    return data.information.hasOwnProperty("Polling Station");
}

;(function () {
    "use strict";

    module.exports = [
        "apiSearch",
        "httpq",
        "localstorage",
        "$stateParams",
        "$location",
        "markers",
        "locationCheck",
        "validate",
        function (apiSearch, httpq, localstorage, $stateParams, $location, markers, locationCheck, validate) {

            var resetActiveMarker = require("../lib/reset-active-marker.js");
            var path;
            var pollingStationCoordinates;

            //requests data from api given a service and address
            this.searchAddress = function (scope, service, address, lat, lng) {

                apiSearch.search(service, address, lat, lng)
                    .success(function success (data) {
                        if(data.hasOwnProperty("error")) {
                            
                            console.log(scope.markers.m0);
                            if(scope.markers.m0.message !== "Your Location"){
                                return scope.updateError(data.message);
                            }
                        } else {

                            localstorage.checkAndSave(address);

                            scope.updateError("");
                            scope.update("markers", {});
                            scope.updateResults(data.properties);
                            scope.update("locationSelected", data.location);
                            scope.locationSelected.message = address;

                            scope.addMarkers();

                            // this rounds results to one decimal place 
                            scope.results.forEach(function(entry) {
                                entry.Distance = validate.roundDistances(entry.Distance);
                            });

                            scope.result = scope.results.filter(function (result) {
                                return result.display.Name === $stateParams.id;
                            })[0];

                            resetActiveMarker(scope);

                            if ($location.path().indexOf("/streetworks") > -1) {

                                path = "/home/streetworks/location/" + address;

                            } else {

                                path = "/home/" + $stateParams.service + "/location/" + address;
                                //redirects to new path and runs location controller
                            }

                            if ($stateParams.service || $location.path().indexOf("/streetworks") > -1) {
                                    $location.path(path);
                                
                            }

                            scope.update("centre", {
                                lat: Number(data.location.Latitude),
                                lng: Number(data.location.Longitude),
                                zoom: markers.zoomCheck(scope)()
                            });
                        }
                    })
                    .error(function () {
                        return scope.updateError("Sorry, that does not appear to be a valid camden address.");
                    });

            };

            this.service = function (scope) {
                if(locationCheck.serviceSearch()) {
                    apiSearch.search($stateParams.service)
                        .success(function success (data) {
                            if(data.hasOwnProperty("error")) {
                                // display error message
                                scope.updateError(data.message);
                                // and redirect back to services menu to try again
                                $location.path("/home/services");
                            }
                            scope.updateResults(data.properties);
                            //selects item from results with matching {id}
                            scope.result = scope.results.filter(function (result) {
                                return result.display.Name === $stateParams.id;
                            })[0];

                            scope.addMarkers();
    
                            scope.centre.zoom = markers.zoomCheck(scope)();
                        })
                        .error(function error(err) {
                            return scope.updateError(err.message);
                        });  
                }
            };

            this.neighbourhood = function (scope, address) {
                apiSearch.searchNeighbourhood(address)
                    .success(function (data) {

                        if (data.hasOwnProperty("error")) {
                            // $location.path("/home/neighbourhood");
                            return scope.updateError(data.message);
                        }
                        scope.updateError("");
                        scope.markers.neighbourhood = {
                            lat: Number(data.location.Latitude),
                            lng: Number(data.location.Longitude),
                            icon: {
                                iconSize: [28],
                                iconUrl: "../img/icons/location-marker.png"
                            },
                        };

                        scope.update("centre", {
                            lat: (Number(data.location.Latitude) - 0.003),
                            lng: (Number(data.location.Longitude) - 0.004),
                            zoom: 15
                        });
                        if (hasPollingStation(data)) {
                            var pollingStationUPRN = data.information["Polling Station"].Url.split("uprn=").pop();
                            getPollingStationCoordinates(scope, apiSearch, pollingStationUPRN);
                        }
                        return scope.update("information", data.information);
                    })
                    .error(function () {
                        scope.updateError("Sorry, it looks like something went wrong");
                        return $location.path("/home/neighbourhood");
                    });
            };
        }
    ];
}());
