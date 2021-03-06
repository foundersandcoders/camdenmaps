/***********************************************
*   SERVERCONFIG.JS
*   Description: Centralizes the configurations for server
*   Use: Imported throughout the server
*
************************************************/
;(function () {
    "use strict";

    module.exports = {

        server: {
            host: "0.0.0.0",
            port: "8080"
        },

        map: {
            
            url: {
                nearestApi: "http://maps.camden.gov.uk/nearest/nearestrest.aspx",
                parkingApi: "http://maps.camden.gov.uk/parkingbays/parkingbaysrest.aspx",
                recyclingApi: "http://maps.camden.gov.uk/nearest/recyclingrest.aspx",
                streetworksApi: "http://maps.camden.gov.uk/streetworks/streetworksrest.aspx"
            },
            
            query: {
                location: "area=",
                uprn: "uprn=",
                lat: "lat=",
                lng: "lng="
            },
            
            serviceArrays: {
                parking:["Car club bay", "Parking space", "Car park", "Car club", "Coach parking", "Disabled blue badge", "Disabled green badge", "Electric recharging point", "Loading bay", "Pay and display", "Permit holders", "Solo motorcycles", "Bicycle stand"],
                recycling: ["Batteries", "Cardboard and paper", "Clothing and textiles", "Nappies", "Furniture", "Garden waste", "Light bulbs", "Glass", "Clinical waste", "Paint", "Chemical and hazardous waste", "Household electronics and appliances", "Aluminium cans", "Vehicles", "Foil", "Scrap metal", "Spectacles", "Cooking oil", "Plastic", "Wood"]
            }
        },
        
        logging: {
            opsInterval: 1000,
            reporters: [{
                reporter: require("good-file"),
                args: [__dirname + "/../logs/server_log.txt", {error: "*"}]
            }]
        }
    };
}());
