/*************************************
*   VALIDATE SERVICE.JS
*
*************************************/
var menu = require("../menu.json");

;(function () {
    "use strict";

    module.exports = [
        "$http",
        function ($http) {

            this.service = function (service) {

                var match = menu.filter(function (item) {
                    return item.title.toLowerCase() === service.toLowerCase();
                });
                return (match.length >= 1);
            };

            this.checkValidAddress = function (address, cb) {

               return $http.get("/uprn/" + address)
                    .success(function (res) {
                        return cb(!!res);
                    })
            }

            this.isWithinCamden = function (latitude, longitude) {
                //coordinates represent a square around Camden to roughly test if location is inside boundary
                if((51.590 > latitude && latitude > 51.495) && (-0.0750 > longitude && longitude > -0.255)) {
                    return true;
                } else {
                    return false;
                }
            };

            //this will capitalise street addresses
            //and upper case postcodes
            this.cleanDisplayAddress = function (address) {
                var displayAddress = (address.replace(/\s/g, "").length < 7)
                                    ? address.toUpperCase()
                                    : address.replace(/\b./g, function(m){ return m.toUpperCase()});

                return displayAddress;
            };
            this.roundDistances = function (distance) {
                return (Math.floor( (Number(distance) + 0.05) * 10 )) /10;
            };
        }
    ];

})();
