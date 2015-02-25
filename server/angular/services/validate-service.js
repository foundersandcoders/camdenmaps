/*************************************
*   LOCATION CHECKER SERVICE.JS
*
*************************************/

;(function () {
    "use strict";

    module.exports = [
        function () {

            this.service = function (service, list) {

                var match = list.filter(function (item) {
                    return item.title.toLowerCase() === service.toLowerCase();
                });
                return (match.length >= 1);
            }
        }
    ];

})();
