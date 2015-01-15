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

            //change baseurl depending on whether address-found or address-search 
            $scope.baseUrl = $stateParams.address ?  "/#/home/" + $stateParams.service + 
                "/location/" + $stateParams.address + "/" : "/#/home/" + $stateParams.service + 
                "/search/";
              
            $scope.showDistance = $stateParams.address ? true : false; 
                
            //button to exit list view
            $scope.exit = function exit () {
                var current = $location.path();
                var destination = current.substring(0, current.indexOf("/list"));
                $location.path(destination);
            };

            //handler for each result
            function createResultsHandler (id) {
                return function () {
                    var path = "/service" + $stateParams.service + 
                        "/location/" + $stateParams.address +
                        id;
                    $location.path(path); 
                };
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
