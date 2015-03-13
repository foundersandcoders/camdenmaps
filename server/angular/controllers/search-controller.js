/********************************
*   SEARCH-CONTROLLER.JS
*
********************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$stateParams",
        "$location",
        "markers",
        "markerHandlers",
        "buttonHandlers",
        "menuFind",
        function ($scope, $stateParams, $location, markers, markerHandlers, buttonHandlers, menuFind) {

            var noResults,
                resetActiveMarker;

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);

            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            noResults = require("../lib/no-results.js");
            resetActiveMarker = require("../lib/reset-active-marker");

            //model for placeholder
            $scope.placeholder = "Please enter a postcode";
            $scope.icon = "";

            $scope.showAccordion = true;
            $scope.category = menuFind.categoryByService($scope.service);

            //change baseurl depending on whether address-found or address-search 
            $scope.baseUrl = $stateParams.address ?  "/#/home/" + $stateParams.service + 
                "/location/" + $stateParams.address + "/" : "/#/home/" + $stateParams.service + 
                "/search/";

            try {
                //model for image icon
                $scope.icon = menuFind.serviceImg($scope.service);
            } catch (err) {
                // don't break if image couldn't load
                console.log(err);
            } 

            $scope.$on('leafletDirectiveMarker.click', markerHandlers.markerClick($scope));

            $scope.$on('leafletDirectiveMap.click', markerHandlers.mapClick($scope));

    
            //back button functionality
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home/services");

            $scope.toggle = buttonHandlers.toggle($scope);
            
            $scope.returnToCategories = buttonHandlers.searchAgain($scope, "/home/services");
            
            $scope.returnToServices = buttonHandlers.searchAgain($scope, "/home/" + $scope.category.title + "/service");

            $scope.activateListItem = markers.activateListItem($scope);
        }
    ];
}());
