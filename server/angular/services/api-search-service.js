/*************************************
*   API-SEARCH.JS
*
*************************************/

//TODO: Make sure caching applies across states so requests aren't made twice

;(function () {
    "use strict";

    module.exports = [
        "$http",
        "$stateParams",
        function ($http, $stateParams) {

            //requests data from api given a service and address
            this.search = function search (service, address, lat, lng) {
                //construct uri depending on arguments passed
                var apiUrl = (lat && lng)
                    ? "/services/" + service + "/locations/" + "lats/" + lat + "/lngs/" + lng
                    : ((service && !address) 
                    ? "/services/" + service 
                    : "/services/" + service + "/locations/" + address);
                //return http promise to be processed in controllers
                return $http({ 
                    method: "GET", 
                    url: apiUrl, 
                    cache: true 
                });

            };

            this.searchNeighbourhood = function searchLocal (uprn) {
                var apiUrl = "/addresses/" + uprn;
                return $http({
                    method: "GET",
                    url: apiUrl,
                    cache: true
                });
            };

        }
    ];
}());
