/*****************************
*   LIST-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$stateParams",
        "$location", 
        function ($scope, $stateParams, $location) {

            // Ensuring that the service name in the URL is Encoded
            // Need to decode and then encode twice so to compensate for double encoding for only part of $stateParams.service
            $stateParams.service = decodeURI($stateParams.service);
            $stateParams.service = encodeURIComponent($stateParams.service);
            var service = encodeURIComponent($stateParams.service);

            //change baseurl depending on whether address-found or address-search 
            $scope.baseUrl = $stateParams.address ?  "/#/home/" + service + 
                "/location/" + $stateParams.address + "/" : "/#/home/" + service + 
                "/search/";

            $scope.showDistance = $stateParams.address ? true : false; 

            //handler for each result
            function createResultsHandler (id) {
                return function () {
                    var path = "/service" + $stateParams.service + 
                        "/location/" + $stateParams.address +
                        id;
                    $location.path(path); 
                };
            }

            }
    ];
}());
