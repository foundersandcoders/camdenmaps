/*****************************
*   STREETWORKS-SEARCH-CONTROLLER.JS
*
*****************************/

//TODO: Error Messages by updateError('error', data);

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "localStorageService",
        function ($scope, $location, localStorageService) {

            //model for placeholder
            $scope.placeholder = "Please enter a postcode";
            //model for address input
            $scope.address = "";
            //model for page title
            $scope.title = "Live Streetworks";

            if (localStorageService.isSupported) {

                $scope.address = localStorageService.get("userLocation");

                if($scope.address) {
                    $location.path("/home/streetworks/location/" + $scope.address);
                } else {
                    $scope.error = "Sorry, that didn't look right";
                } 
            }

            //function for searching uprn
            $scope.search = function () {

                if ($scope.address) {

                    if (localStorageService.isSupported) {
                        localStorageService.set( "userLocation", $scope.address);
                    }

                    $location.path("/home/streetworks/location/" + $scope.address);
                } else {
                    $scope.error = "Sorry, that didn't look right";
                } 
            };

            //back button function
            $scope.searchAgain = function() {
                $location.path("/home");
            };
            //back button text
            $scope.backButtonText = "Main Menu";

        }
    ];
}());
