/*****************************
*   LOCAL-SEARCH-CONTROLLER.JS
*
*****************************/

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$location",
        "buttonHandlers",
        function ($scope, $location, buttonHandlers) {

//            if ( (screen.width < 1024) && (screen.height < 768) ) { 
//                window.location = 'http://maps.camden.gov.uk/nearest/nearest.aspx?tab=m';
//            } 

            //model for page title
            $scope.title = "About your Neighbourhood";

            //back button function
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home");

            //back button text
            $scope.backButtonText = "Main Menu";

            $scope.icon = "img/icons/your-neighbourhood-white.png";
            
            
        }
    ];
}());
