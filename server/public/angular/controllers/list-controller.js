/*****************************
*   LIST-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        
        function () {
    
            //button to exit list view
            

            //handler for each result
            function createResultsHandler (id) {
                return function () {
                    var path = "/service" + $stateParams.service + 
                        "/location/" + $stateParams.address +
                        $stateParams.id;
                    $location.path(path); 
                }
            }

            //add handler to results list
            (function addResultsHandlers (index){
                if (index > $scope.results.length) {
                    return;
                }
                $scope.results[index].createResultsHandler($scope.result.id);
                addResultsHandlers(index+1);
            }(0));
        }
    ];
}());
