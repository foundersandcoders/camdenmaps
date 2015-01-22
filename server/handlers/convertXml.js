;(function() { 
    "use strict";
    // module for converting XML to JSON 
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    //var routesConfig = require("../config/routesConfig.js");

    module.exports = {
        //Function for responding JSON to client
        //Function for responding JSON to client
        convertToJson: function convertToJson (err, res, req, rep) {
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
        
    };
}());