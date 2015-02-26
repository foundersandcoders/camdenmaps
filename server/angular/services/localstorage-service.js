/*************************************
*   LOCALSTORAGE SERVICE.JS
*
*************************************/

;(function () {
    "use strict";

    module.exports = [
        "localStorageService",
        "$location",
        "$stateParams",
        "locationCheck",
        function (localStorageService, $location, $stateParams, locationCheck) {

            this.get = function (functionScope) {

                return function (scope) {
                    var destination,
                        address, 
                        scope;

                    scope = scope || functionScope;

                    if (localStorageService.isSupported) {

                        address = localStorageService.get("USER-LOCATION");

                        if(address && address[0] && address[0].title) {

                            if(scope.activeMarker) {
                                //resets active marker
                                scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                                scope.update("activeMarker", 0);
                            }

                            scope.value = address[0].title;

                            destination = locationCheck.destination(address);
                            //redirects to new path and runs location controller
                            $location.path(destination);

                        } else {
                            localStorageService.remove("userLocation");
                            localStorageService.remove("USER-LOCATION");
                        }
                    }
                }
            } 

            this.save = function (address) {
                if (localStorageService.isSupported) {
                    localStorageService.set("USER-LOCATION", address);
                }
            }
        }
    ];

})();