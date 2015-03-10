/******************************
*   LOCATION-CONTROLLER.JS
*
******************************/

var resetActiveMarker = require('../lib/reset-active-marker.js');

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$stateParams",
        "markers",
        "markerHandlers",
        "buttonHandlers",
        "$location",
        "menuFind",
        "validate",
        function ($scope, $stateParams, markers, markerHandlers, buttonHandlers, $location, menuFind, validate) {

            //model for page title
            $scope.title = "Find your Nearest...";

            //service called markers exists
            var mapMarkers = $scope.markers,
                lat,
                lng,
                round = require("../lib/round.js"),
                addressUsedinAPIcall = require("../lib/address-used-in-api-call.js");

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);
    
            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            // Args will contain the marker name and other relevant information   
            $scope.$on('leafletDirectiveMarker.click', markerHandlers.markerClick($scope));

            // Args will contain the marker name and other relevant information 
            $scope.$on('leafletDirectiveMap.click', markerHandlers.mapClick($scope));

            if($stateParams.service === "streetworks") {
                
                $scope.category = {
                    title: "Live Streetworks",
                    img: "img/icons/streetworks-black.png"
                };

                $scope.showCategoriesTitle = true;
                $scope.showServicesTitle =  false;

                $scope.streetworks = true;

                $scope.returnToCategories = buttonHandlers.searchAgain($scope, "/home/");

                $scope.changeAddress = buttonHandlers.changeUserLocation($scope, "home/" + $stateParams.service);

            } else {

                //model for image icon
                $scope.icon = menuFind.serviceImg($scope.service);

                $scope.showCategoriesTitle = true;
                $scope.showServicesTitle =  true;

                $scope.category = menuFind.categoryByService($scope.service);
                $scope.returnToCategories = buttonHandlers.searchAgain($scope, "/home/services");
                $scope.returnToServices = buttonHandlers.searchAgain($scope, "/home/" + $scope.category.title + "/service");
                $scope.changeAddress = buttonHandlers.changeUserLocation($scope, "home/" + $stateParams.service + "/search");

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
            }

            //this will uppercase postcodes and capitalise street addresses 
            $scope.address  = validate.cleanDisplayAddress($stateParams.address);

            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");

            $scope.toggle = buttonHandlers.toggle($scope);

            $scope.activateListItem = markers.activateListItem($scope);
        }
    ];
}());
