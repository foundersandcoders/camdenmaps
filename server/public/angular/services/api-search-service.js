/*************************************
*   API-SEARCH.JS
*
*************************************/

//TODO: Make sure caching applies across states so requests aren't made twice

;(function () {
    "use strict";

    module.exports = [
        "$http",
        function ($http) {

            //requests data from api given a service and address
            this.search = function search (service, address) {
                //construct uri depending on arguments passed
                var apiUrl = (service && !address) 
                    ? "/service/" + service 
                    : "/service/" + service + "/locations/" + address;
                         
                //return http promise to be processed in controllers
                return http({ method: "GET", url: apiUrl, cache: true })
                    .then(function preprocess (response) {
                        return response.data;
                 });
            };
        }
    ];
}());
