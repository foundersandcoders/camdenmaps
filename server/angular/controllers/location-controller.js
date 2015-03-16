/******************************
*   LOCATION-CONTROLLER.JS
*
******************************/

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
        function ($scope, $stateParams, markers, markerHandlers, buttonHandlers, $location, menuFind) {

            //model for page title
            $scope.title = "Find your Nearest...";

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);
    
            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            // Args will contain the marker name and other relevant information   
            $scope.$on("leafletDirectiveMarker.click", markerHandlers.markerClick($scope));

            // Args will contain the marker name and other relevant information 
            $scope.$on("leafletDirectiveMap.click", markerHandlers.mapClick($scope));

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

            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");

            $scope.toggle = buttonHandlers.toggle($scope);

            $scope.activateListItem = markers.activateListItem($scope);
        }
    ];
}());
