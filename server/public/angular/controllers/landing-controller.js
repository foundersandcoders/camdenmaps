/****************************************
*   LANDING-CONTROLLER.JS
*
*
*****************************************/
;(function () {
    "use strict";

    module.exports = [
        "$location",
        "$scope",
        function ($location) {

            var button, 
                //stores function names and corresponding paths for landing-page buttons
                buttons = {
                    //for Find Your Nearest button
                    getNearest: "/services",
                    //for Live Streetworks button
                    getStreetworks: "/streetworks/search",
                    //for About Your Neighbourhood button
                    getNeighbourhood: "/neighbourhood/search"
                };

            //creates event handler that redirects client to newPath
            function makeRedirectHandler (newPath) {
                return function redirectHandler() {
                    $location.path(newPath);
                }
            }

            //create redirectHandler for each button
            for (button in buttons) {
                $scope[button] = makeRedirectHandler(buttons[button])
            }
        }
    ];

}());
