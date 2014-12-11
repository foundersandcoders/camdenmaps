/***********************************************
*   SERVERCONFIG.JS
*   Description: Centralizes the configurations for server
*   Use: Imported throughout the server
*
************************************************/

module.exports = {

    server: {
        host: "0.0.0.0",
        port: "8080"
    },
 
    map: {
        url: {
            nearestApi: "http://maps.camden.gov.uk/nearest/nearestrest.aspx"
        },
        query: {
            service: "?find=",
            location: "?area="
        }
    }    

};
