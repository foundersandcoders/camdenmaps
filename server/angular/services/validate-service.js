/*************************************
*   VALIDATE SERVICE.JS
*
*************************************/
var menu = require("../menu.json");

;(function () {
    "use strict";

    module.exports = [
        function () {

            this.service = function (service) {

                var match = menu.filter(function (item) {
                    return item.title.toLowerCase() === service.toLowerCase();
                });
                return (match.length >= 1);
            }

            this.isWithinCamden = function (lat, lon) {
                //coordinates represent a square around Camden to roughly test if location is inside boundary
                if((51.57878 > lat && lat > 51.450089) && (-0.094538 > lon && lon > -0.218650)) {
                    return true;
                } else {
                    return false
                }
            }
            //this will capitalise street addresses
            //and upper case postcodes
            this.cleanDisplayAddress = function (address) {
                var displayAddress = (address.replace(/\s/g, "").length < 7)
                                    ? address.toUpperCase()
                                    : address.replace(/\b./g, function(m){ return m.toUpperCase()});

                return displayAddress;
            }
        }
    ];

})();
