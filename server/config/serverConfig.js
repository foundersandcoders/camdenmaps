/***********************************************
*   SERVERCONFIG.JS
*   Description: Centralizes the configurations for server
*   Use: Imported throughout the server
*
************************************************/
;(function () {
    "use strict";

    //Module for converting XML to JSON
    // var xml = require("../lib/xml-parser.js");
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();

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
            // var parser = xml.parse(res);
            var xml = '';
            var response = {};
            response.properties = [];

            res.on('data', function(data){
              xml = xml + data;
            }).on('end', function(){
              parser.parseString(xml, function (err, result) {
                // console.log(result);
                response.location = result.Locations.AddressSearchResults[0]['$'];
                result.Locations.Properties[0].Property.map(function(p) {
                  var formatProperty = p['$'];
                  formatProperty.display = p.PoI[0]['$']
                  response.properties.push(formatProperty);
                });

                rep(response);
              });
            });
            // });
        }
    }

}());
