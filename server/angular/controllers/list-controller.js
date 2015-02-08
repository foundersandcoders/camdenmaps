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

            var encodeservice = encodeURIComponent($stateParams.service),
                service = encodeURIComponent(encodeservice);

            //selects item from results with matching {id}
            if($scope.results) {
                $scope.result = $scope.results.filter(function (result) {
                    return result.display.Name === $stateParams.id;
                 })[0];
            }

            console.log($scope.results);

            // $scope.rounding = (Math.floor( (Number($scope.result.Distance) + 0.005) * 100 )) /100;


            //change baseurl depending on whether address-found or address-search 
            $scope.baseUrl = $stateParams.address ?  "/#/home/" + service + 
                "/location/" + $stateParams.address + "/" : "/#/home/" + service + 
                "/search/";

            $scope.showDistance = $stateParams.address ? true : false; 

            //handler for each result
            function createResultsHandler (id) {
                return function () {
                    var path = "/service" + service + 
                        "/location/" + service +
                        id;
                    $location.path(path); 
                };
            }

            }
    ];
}());
