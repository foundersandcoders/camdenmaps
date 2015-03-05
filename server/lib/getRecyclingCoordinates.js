//THIS IS A KNOWN HACK: RECYCLING API DOES NOT RETURN LAT/LNG COORDINATES
//SO THIS EXTENSION POINT FUNCTION FETCHES IT FROM THE PARKING API ON EVERY REQUEST


;(function(){
    "use strict";

    var request = require("request");
    var serverConfig = require("../config/serverConfig.js");
    var recyclingServices = serverConfig.map.serviceArrays.recycling;
    var xml2js = require("xml2js");
    var parser = new xml2js.Parser();
    var capitalize = require("./capitalize.js");


    function isRecyclingService (service) {

        service = capitalize(service);

        if (recyclingServices.indexOf(service) > -1) {

            return true;

        } else {

            return false;

        }

    }

    function createQuery(req) {

        var uri = serverConfig.map.url.parkingApi;

        if (req.params.hasOwnProperty("postcode")) {

            uri = uri + "?" + serverConfig.map.query.location + req.params.postcode;

        } else if (req.params.hasOwnProperty("latitude")) {

            uri = uri + "?" + serverConfig.map.query.lat + req.params.latitude + "&";
            uri = uri + serverConfig.map.query.lng + req.params.longitude;

        }

        return uri;

    }

    function makeRequest (req, requester, responseParser, res) {


        var uri = createQuery(req);

        requester(uri, function(err, head, body) {
            responseParser(body, function parseForCoordinates (err, result) {

                if(!err && result.Locations.$.hasOwnProperty("Lat")
                   && result.Locations.$.hasOwnProperty("Lng")) {

                    req.app.latitude = result.Locations.$.Lat;
                    req.app.longitude = result.Locations.$.Lng;
                    return res.continue();

                } else {

                    return res.continue();

                }

            });

        });

    }


    function fetchCoordinates (req, res) {

        if (isRecyclingService(req.params.service) && (req.params.postcode || req.params.latitude)) {

            makeRequest(req, request, parser.parseString, res);

        } else {

            return res.continue();

        }
    }


    function registerPreHandler (server) {

        server.ext("onPreHandler", fetchCoordinates);

    }


    module.exports = {

        createQuery: createQuery,
        makeRequest: makeRequest,
        registerPreHandler: registerPreHandler,
        fetchCoordinates: fetchCoordinates,
        isRecyclingService: isRecyclingService

    }


}());
