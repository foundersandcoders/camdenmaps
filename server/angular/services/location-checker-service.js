/*************************************
*   LOCATION CHECKER SERVICE.JS
*
*************************************/

;(function () {
    "use strict";

    module.exports = [
        "$location",
        "$stateParams",
        "apiSearch",
        function ($location, $stateParams, apiSearch) {

            this.addressSearch = function () {
                
                if (($location.path().indexOf("/neighbourhood") > -1) || 
                    ($location.path().indexOf("/streetworks") > -1) || 
                    ($location.path().indexOf("/location") > -1) || 
                    ($location.path().indexOf("/search") > -1)) {

                    return true;
                } else {
                    return false;
                }
            }; 

            this.postcodeSearch = function () {

                if (($location.path().indexOf("/streetworks") > -1)||
                    (($location.path().indexOf("/neighbourhood") === -1) && 
                    ($location.path().indexOf("/location") > -1)) || 
                    ($location.path().indexOf("/search") > -1)) {
            
                     return true;
                } else {
                    return false;
                }
            };

            this.locationFound = function () {
                if (($stateParams.uprn && !$stateParams.id) || 
                    ($stateParams.address && !$stateParams.id)) {
            
                    return true;
                } else {
                    return false;
                }
            };

            this.resultsLoaded = function () {
                var search = ($location.path().indexOf("/search") > -1);

                if ($stateParams.uprn || $stateParams.address || search) {
                    return true;
                } else {
                    return false;
                }
            };

            this.serviceSearch = function () {
                var url = $location.path(),
                    streetworks = (url.indexOf("streetworks") > -1),
                    neighbourhood = (url.indexOf("neighbourhood") > -1),
                    location = (url.indexOf("location") > -1),
                    search = (url.indexOf("search") > -1);

                if(search && !streetworks && !neighbourhood && !location) {
                    return true;
                } else {
                    return false;
                }

            };

            this.destination = function (address) {
                return ($location.path().indexOf("/neighbourhood") > -1)
                        ? "/home/neighbourhood-found/" + address[0].UPRN
                        : ($location.path().indexOf("/streetworks") > -1)
                        ? "/home/streetworks/location/" + address[0].Postcode
                        : "/home/" + $stateParams.service + "/location/" + address[0].Postcode;
            };

            this.stringDestination = function (address) {
                return ($location.path().indexOf("/streetworks") > -1)
                        ? "/home/streetworks/location/" + address
                        : "/home/" + $stateParams.service + "/location/" + address;
            };
        }
    ];

})();
