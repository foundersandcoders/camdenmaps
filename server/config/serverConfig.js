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
            },
            serviceArrays: {
                parking:["Car club bay","Parking space", "Car park", "Car club", "Coach parking", "Disabled blue badge", "Disabled green badge", "Electric recharging point", "Loading bay", "Pay and display/meter", "Permit holders", "Solo motorcycles", "Bicycle stand"],
                recycling: ["Batteries","Cardboard and Paper", "Clothing and Textiles", "Nappies", "Funiture", "Garden Waste", "Light bulbs", "Glass", "Clinical Waste", "Paint", "chemical and hazardous waste", "Household electronics/appliances", "Aluminium cans", "Vehicles", "Foil", "Scrap metal", "Spectacles", "Cooking oil", "Plastic", "Wood"]
            }
        }
    };
      

}());
