/****************************************
*   LANDING-CONTROLLER.JS
*
*
*****************************************/
;(function () {
    "use strict";

    module.exports = [
        "$scope",
        function ($scope) {
            
            //stores function names and corresponding paths for landing-page buttons
            $scope.buttons = [
                {
                    id: "findYourNearest",
                    title: "Find Your Nearest",
                    path: "root.landing.services",
                    iconUrl: "img/icons/find-your-nearest.png"
                },
                {
                    id: "aboutYourNeighbourhood",
                    title: "About Your Neighbourhood",
                    path: "/neighbourhood/search",
                    iconUrl: "img/icons/your-neighbourhood.png"
                },
                {
                    id: "liveStreetworks",
                    title: "Live Streetworks",
                    path: "/streetworks/search",
                    iconUrl: "img/icons/streetworks.png"
                }
            ]; 
        }
    ];

}());
