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
   
            $scope.results = [];

            //TODO: populate results with REAL results
            //mock populate results
            $scope.results = [
                {
                    name: "Animal Hospital",
                    address: "33 Midhurst Avenue",
                    city: "London, You're Kidding Me",
                    distance: "290129miles"
                },
                {
                    name: "Gun Shop",
                    address: "33 Midhurst Avenue",
                    city: "London, York",
                    distance: "5miles"
                },
                {
                    name: "Spoon Straightener",
                    address: "24 Clapham Road",
                    city: "London, N10 3EP",
                    distance: "229miles"
                },
                {
                    name: "Bag Shredder",
                    address: "33 Midhurst Avenue",
                    city: "London, Castle",
                    distance: "0.4miles"
                }
            ];


            //button to exit list view
            $scope.exit = function exit () {
                var destination = "/home/" + $stateParams.service + "/location/" + $stateParams.address;
                $location.path(destination);
            }

            //handler for each result
            function createResultsHandler (id) {
                return function () {
                    var path = "/service" + $stateParams.service + 
                        "/location/" + $stateParams.address +
                        id;
                    $location.path(path); 
                }
            }
/*
            //add handler to results list
            (function addResultsHandlers (index){
                if (index > $scope.results.length) {
                    return;
                }
                $scope.results[index].createResultsHandler($scope.result.id);
                addResultsHandlers(index+1);
            }(0));
*/
            }
    ];
}());
