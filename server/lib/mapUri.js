"use strict";

var Config = require("../config/serverConfig.js"),
    url = Config.map.url,
    serviceArray = Config.map.serviceArrays,
    services = "find=",
    locations = Config.map.query.location,
    lats = Config.map.query.lat,
    lngs = Config.map.query.lng,
    cap = require("../lib/capitalize.js"),
    aliasServices = require("./alias.js"),
    defaultLocation = "N1C 4AG",
    exactLocations = Config.map.query.uprn;

function mapQuery (req) {
    if (typeof req !== "object") {
        return req;
    }
    var service = aliasServices(cap(req.params.service));
    return (req.params.latitude !== undefined) ? "?" + services + service + "&" + lats + req.params.latitude + "&" + lngs + req.params.longitude
            : (req.params.postcode === undefined) ? "?" + services + service + "&" + locations + defaultLocation
            : (service === undefined)  ? "?" + locations + req.params.postcode 
            : "?" + locations + req.params.postcode + "&" + services + service;
}

function mapStreetworks (req) {
    
    var location, query, lat, lng;
    location = req.params.postcode;
    lat = req.params.latitude;
    lng = req.params.longitude;
    query = (req.params.latitude && req.params.longitude)   ? "?" + lats + req.params.latitude + "&" + lngs + req.params.longitude
                                                                    : "?" + locations + req.params.postcode;
    return url.streetworksApi + query; 
}

function mapLocalInformation (req) {
    
    var uprn = req.params.uprn;
    var query = "?" + exactLocations + uprn + "&tab=m";
    
    return url.nearestApi + query;
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
    mapQuery: mapQuery,
    mapStreetworks: mapStreetworks,
    mapLocalInformation: mapLocalInformation
};
