"use strict";

var c = require("../config/cache.js");
var r = require("request");
var staleTime = 1000 * 60 * 60 * 24; // one day

function setCache (key, response, cb, cache) {

    cache = cache || c;

    cache.set(key, response, function (err, success) {
        var currentTime = new Date().getTime();
        response.staleAt = currentTime + ( staleTime );

        if (!err && success) {
            return cb(response);
        } else {
            return cb(response);
        }
    });
}


function isStale(staleAt) {
   var currentTime = new Date().getTime();
   return currentTime > staleAt;
}


function getCache (req, key, rep, mapUri, parse, proxyConfig, cache, request) {

    cache = cache || c;
    request = request || r;

    cache.get(key, function (err, value) {

        if (err) {
            console.log(err);
            return rep.proxy(proxyConfig);
        }

        if (value.hasOwnProperty(key)) {
            rep(value[key]);
            if(isStale(value[key].staleAt)) {
                request(mapUri(req), function(err, head, body) {
                    if(!err && head.statusCode === 200) {

                        var parsedResponse = parse(body, req.params.service);
                        if(!parsedResponse.hasOwnProperty("error")) {
                            setCache(key, parse(body), console.log);
                        }
                    }
                });

            }
        } else {
            return rep.proxy(proxyConfig);
        }
    });
}

module.exports = {
    setCache: setCache,
    getCache: getCache,
    isStale: isStale
};
