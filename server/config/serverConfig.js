/***********************************************
*   SERVERCONFIG.JS
*   Description: Centralizes the configurations for server
*   Use: Imported throughout the server
*
************************************************/
(function () {
    "use strict";

    //Module for converting XML to JSON
    var faketoe = require("faketoe");

    module.exports = {

        //Config for server host and port
        server: {
            host: "0.0.0.0",
            port: "8080"
        },
     
        //Mapping for query params and camden API
        map: {
            url: {
                nearestApi: "http://maps.camden.gov.uk/nearest/nearestrest.aspx"
            },
            query: {
                service: "find=",
                location: "area=",
                uprn: "uprn="
            }
        },

        //Function for responding JSON to client
        convertToXml: function convertToXml (err, res, req, rep) {
            if (err) {
                return rep(err);
            }
            //Create xml parser
            var parser = faketoe.createParser(function (err, json) {
                if (err) {
                    return rep(err);
                } else {
                    //When ready, return json back to client
                    rep(json);
                }
            });
            //Pipe downstream response to parser
            res.pipe(parser);
        } 
    };

}());