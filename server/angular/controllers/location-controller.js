/******************************
*   LOCATION-CONTROLLER.JS
*
******************************/

//TODO: Add handler for List Results and Search Again buttons
//Broken results: recyling, connexions... these could be all results with fewer than 8 results becuase of hard coding 8 markers

;(function () {
    "use strict";

    var noResults = require("../lib/no-results.js");
    var addressUsedinAPIcall = require("../lib/address-used-in-api-call.js");

    module.exports = [
        "$scope",
        "$stateParams",
        "markers",
        "markerHandlers",
        "apiSearch",
        "buttonHandlers",
        function ($scope, $stateParams, markers, markerHandlers, apiSearch, buttonHandlers) {
            //model for page title
            $scope.title = "Find your Nearest...";

            var markers = $scope.markers,
                lat,
                lng;

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);

            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            // Args will contain the marker name and other relevant information   
            $scope.$on('leafletDirectiveMarker.click', markerHandlers.markerClick($scope));

            // Args will contain the marker name and other relevant information 
            $scope.$on('leafletDirectiveMap.click', markerHandlers.mapClick($scope));


            if($scope.service.toLowerCase() !== "streetworks") {
                //model for image icon
                $scope.icon = require("../menu.json").filter(function filterImg (item) {
                    var name = item.title + item.text;
                    return name.toLowerCase() === $scope.service.toLowerCase();
                })[0].img;
            } else {
                $scope.icon = "img/icons/streetworks.png";
            }
            

            if(!addressUsedinAPIcall($scope)){
                console.log("running api search in LOCATION-CONTROLLER");
                console.log("markers.location", $scope.markers.location);
                //reloads $scope.results with new data based on address 
                
                // will pass through values if present otherwise 0
                lat = markers.location ? markers.location.lat : 0;
                lng = markers.location ? markers.location.lng : 0;
         
                apiSearch.search($stateParams.service, $stateParams.address, lat, lng)

                    .success(function success (data) {
                        $scope.updateResults(data.properties);
                        $scope.update("locationSelected", data.location);
                        $scope.addMarkers();
                        
                        //will only update if the address is valid
                        //only valid addresses have a north property
                        // if(data.location.North) {
                        //     $scope.update("centre", {
                        //         lat: Number($scope.locationSelected.Latitude),
                        //         lng: Number($scope.locationSelected.Longitude),
                        //         // zoom: markers.zoomCheck($scope)()
                        //     });
                        // }

                        

                    });
            }

            //this will uppercase postcodes and capitalise street addresses 
            $scope.address  = $stateParams.address.replace(/\s/g, "").length < 7
                            ? $stateParams.address.toUpperCase()
                            : $stateParams.address.replace(/\b./g, function(m){ return m.toUpperCase(); });


            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home/services");

            $scope.toggle = buttonHandlers.toggle($scope);

            $scope.changeAddress = buttonHandlers.searchAgain($scope, "home/" + $stateParams.service + "/search");



        }
    ];
}());
