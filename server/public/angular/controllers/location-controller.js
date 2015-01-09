/******************************
*   LOCATION-CONTROLLER.JS
*
******************************/

//TODO: Add handler for List Results and Search Again buttons

;(function () {
    "use strict";

    module.exports = [
        "apiSearch",
        "$location",
        "$stateParams",
        function (apiQuery) {
            
            //reloads $scope.results with new data based on address 
            apiSearch.search($stateParams.service, $stateParams.address)
                .then(function success (data) {
                    $scope.results = data;
                });

        }
    ];
}());
