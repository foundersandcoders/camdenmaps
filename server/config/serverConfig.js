/***********************************************
*   SERVERCONFIG.JS
*   Description: Centralizes the configurations for server
*   Use: Imported throughout the server
*
************************************************/
;(function () {
    "use strict";
    


    module.exports = {

        //Config for server host and port
        server: {
            host: "0.0.0.0",
            port: "8080"
        },
     
        //Mapping for query params and camden API
        map: {
            url: {
                nearestApi: "http://maps.camden.gov.uk/nearest/nearestrest.aspx",
                parkingApi: "http://maps.camden.gov.uk/parkingbays/parkingbaysrest.aspx",
                recyclingApi: "http://maps.camden.gov.uk/nearest/recyclingrest.aspx"
            },
            query: {
                service: "find=",
                location: "area=",
                uprn: "uprn="
            }
        }
    };

}());
