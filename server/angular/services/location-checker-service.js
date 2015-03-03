/*************************************
*   LOCATION CHECKER SERVICE.JS
*
*************************************/

;(function () {
    "use strict";

    module.exports = [
        "$location",
        "$stateParams",
        function ($location, $stateParams) {

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
            
;                    return true;
                } else {
                    return false;
                }
            };

            this.destination = function (address) {
                return ($location.path().indexOf("/neighbourhood") > -1)
                        ? "/home/neighbourhood/" + address[0].UPRN
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
