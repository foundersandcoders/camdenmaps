"use strict";

var Config = require("../config/serverConfig.js"),
    url = Config.map.url,
    serviceArray = Config.map.serviceArrays,
    services,
    locations = Config.map.query.location,
    lats = Config.map.query.lat,
    lngs = Config.map.query.lng,
    cap = require("../lib/capitalize.js"),
    aliasServices = require("./alias.js"),
    defaultLocation = "N1C 4AG";

function mapQuery (req) {
    var service = aliasServices(cap(req.params.service));
    return (req.params.latitude !== undefined) ? "?" + services + service + "&" + lats + req.params.latitude + "&" + lngs + req.params.longitude
            : (req.params.location === undefined) ? "?" + services + service + "&" + locations + defaultLocation
            : (service === undefined)  ? "?" + locations + req.params.location 
            : "?" + locations + req.params.location + "&" + services + service;
}

function mapUri (req) {

        var service, location, query, lat, lng, apiUrl, defaultLocation;

        service = cap(req.params.service);
        location = req.params.postcode;
        lat = req.params.latitude;
        lng = req.params.longitude;
        lat = req.params.latitude;
        lng = req.params.longitude;

        //api url routed based on service requested
        apiUrl  = (serviceArray.parking.indexOf(service) !== -1)    ? url.parkingApi
                : (serviceArray.recycling.indexOf(service) !== -1)  ? url.recyclingApi
                : url.nearestApi;

        
        services    = (serviceArray.recycling.indexOf(service) !== -1) ? "recycle="
                    : "find=";

        //query constructed based on combination of services and/or address
        query = mapQuery(req);

        return apiUrl + query;

}

module.exports = {
    mapUri: mapUri,
    mapQuery: mapQuery
};
