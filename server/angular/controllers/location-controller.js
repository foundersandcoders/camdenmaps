/******************************
*   LOCATION-CONTROLLER.JS
*
******************************/

//TODO: Add handler for List Results and Search Again buttons

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$stateParams",
        "markers",
        "markerHandlers",
        "apiSearch",
        "buttonHandlers",
        "$location",
        "menuFind",
        "validate",
        function ($scope, $stateParams, markers, markerHandlers, apiSearch, buttonHandlers, $location, menuFind, validate) {

            //model for page title
            $scope.title = "Find your Nearest...";

            //service called markers exists
            var mapMarkers = $scope.markers,
                lat,
                lng,
                round = require("../lib/round.js"),
                noResults = require("../lib/no-results.js"),
                addressUsedinAPIcall = require("../lib/address-used-in-api-call.js");

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);

            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            // Args will contain the marker name and other relevant information   
            $scope.$on('leafletDirectiveMarker.click', markerHandlers.markerClick($scope));

            // Args will contain the marker name and other relevant information 
            $scope.$on('leafletDirectiveMap.click', markerHandlers.mapClick($scope));
            

            if ($stateParams.service === "streetworks") {
                
                $scope.showCategoriesTitle = false;
                $scope.returnToServices = buttonHandlers.searchAgain($scope, "/home/")


            } else {

                $scope.showCategoriesTitle = true;
                $scope.category = menuFind.categoryByService($scope.service);
                $scope.returnToServices = buttonHandlers.searchAgain($scope, "/home/" + $scope.category.title + "/service")
                $scope.returnToCategories = buttonHandlers.searchAgain($scope, "/home/services")
 
            }

            if($scope.service.toLowerCase() !== "streetworks") {
                //model for image icon
                $scope.icon = menuFind.serviceImg($scope.service);
            } else {
                $scope.icon = "img/icons/streetworks.png";
            }
        
            // this will only run an API call if location needs to be added
            // will still run if default location used for capped results
            if(!addressUsedinAPIcall($scope)){

                //reloads $scope.results with new data based on address 
                
                // if geolocation has been used 
                // will pass through lat lng values to use for api call
                // otherwise will use address given for api call
                if (mapMarkers.m0 && mapMarkers.m0.geolocation) {
                    lat = mapMarkers.m0.lat;
                    lng = mapMarkers.m0.lng;
                } else {
                    lat = null;
                    lng = null;
                }

                apiSearch.search($stateParams.service, $stateParams.address, lat, lng)

                    .success(function success (data) {

                        if(data.hasOwnProperty("error")){
                            $scope.updateError(data.message);
                            return $location.path($location.path().substr(0, $location.path().indexOf("location")) + "search");
                        }

                        $scope.updateResults(data.properties);
                        $scope.update("locationSelected", data.location);
                        $scope.addMarkers();

                        //this rounds results to max two decimal place s
                        $scope.results.forEach(function(entry) {
                            entry.Distance = round(entry.Distance);
                        });

                        
                        //will only update if the address is valid
                        //only valid addresses have a Latitude property
                        if(data.location.Latitude) {
                            $scope.update("centre", {
                                lat: Number($scope.locationSelected.Latitude),
                                lng: Number($scope.locationSelected.Longitude),
                                zoom: markers.zoomCheck($scope)()
                            });
                        } else {
                            $scope.updateError("Sorry, we couldn't find the right information for this location");
                            return $location.path($location.path().substr(0, $location.path().indexOf("location")) + "search");
                        }

                    })
                    .error(function error(err) {
                        return $scope.updateError(err.message);

                    });
            }

            //this will uppercase postcodes and capitalise street addresses 
            $scope.address  = validate.cleanDisplayAddress($stateParams.address);

            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");

            $scope.toggle = buttonHandlers.toggle($scope);

            $scope.changeAddress = buttonHandlers.changeUserLocation($scope, "home/" + $stateParams.service + "/search");

        }
    ];
}());
