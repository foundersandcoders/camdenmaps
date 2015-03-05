;(function() {
    "use strict";

    var request = require("request");
    var serverConfig = require("../config/serverConfig");
    var xml2js = require("xml2js");
    var parser = new xml2js.Parser();
    var isRecyclingService = require("./getRecyclingCoordinates.js").isRecyclingService;

    function validatePostcode(postcode) {
        if (typeof postcode !== "string") {
            return false;
        }
        postcode = postcode ? postcode.replace(/\s/g, "") : postcode;
        var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
        return regex.test(postcode);

    }

    function fetchCoordinates (req, rep, requestInjection) {
        var uri;
        if (req.params.postcode && !validatePostcode(req.params.postcode)
           && !isRecyclingService(req.params.service)) {

            requestInjection = requestInjection || request;

            //STREETNAMES DO NOT RETURN LAT OR LNG VALUES FROM ANY API EXCEPT THE PARKING API`
            //THIS SOLUTION IS A HACK: IF A STREETNAME IS SENT, A "SECRET" REQUEST IS SENT TO THE PARKING API
            //construct request to parking API in order to get lat and lng values for street names
            uri = serverConfig.map.url.parkingApi + "?" + serverConfig.map.query.location  + req.params.postcode;

            requestInjection(uri, function(err, res, body) {
                parser.parseString(body, function(err, result) {
                    var path;
                    if (!err && result.Locations.$.hasOwnProperty("Lat") && result.Locations.$.hasOwnProperty("Lng")) {
                        path = req.raw.req.url.split("/");
                        path[path.length-1] = "lats/" + result.Locations.$.Lat + "/lngs/" + result.Locations.$.Lng;
                        path = path.join("/");
                        return rep.redirect(path);

                    } else {

                        return rep({error: "Streetname Not Found", message: "Sorry, " + req.params.postcode + " could not be found within Camden"});

                    }
                });
            });

        } else {

            return rep.continue();
        }
    }

    function registerPreHandler (server) {
        server.ext("onPreHandler", fetchCoordinates);
    }

    module.exports = {
        fetchCoordinates: fetchCoordinates,
        validatePostcode: validatePostcode,
        registerPreHandler: registerPreHandler
    }

}());
