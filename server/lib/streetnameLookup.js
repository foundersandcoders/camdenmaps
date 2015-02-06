;(function() {
    "use strict";
   
    var request = require("request");
    var serverConfig = require("../config/serverConfig");
    var xml2js = require("xml2js");
    var parser = new xml2js.Parser();

    function validatePostcode(postcode) {
        console.log(postcode);
        postcode = postcode.replace(/\s/g, "");
        var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
        console.log(regex.test(postcode));
        return regex.test(postcode);

    }


    module.exports = function (server) {
   
        server.ext("onPreHandler", function(req, rep) {
            var uri; 
            if (req.params.hasOwnProperty("postcode") && !validatePostcode(req.params.postcode)) {

                    //STREETNAMES DO NOT RETURN LAT OR LNG VALUES FROM ANY API EXCEPT THE PARKING API
                    //THIS SOLUTION IS A HACK: IF A STREETNAME IS SENT, A "SECRET" REQUEST IS SENT TO THE PARKING API
                    //construct request to parking API in order to get lat and lng values for street names
                    uri = serverConfig.map.url.parkingApi + "?" + serverConfig.map.query.location  + req.params.postcode;
                    request(uri, function(err, res, body) {
                        parser.parseString(body, function(err, result) {
                            var path;
                            if (err) {
                                throw err;
                            }
                            if (result.Locations.$.hasOwnProperty("Lat") && result.Locations.$.hasOwnProperty("Lng")) {
                                path = req.raw.req.url.split("/");
                                path[path.length-1] = "lats/" + result.Locations.$.Lat + "/lngs/" + result.Locations.$.Lng;
                                path = path.join("/");
                                return rep.redirect(path);
                            } else {
                                return rep("Error: " + req.params.postcode + " could not be found within Camden");
                            }

                        });
                    });
            } else {
                return rep.continue();
            }
        });

    } 

}());
