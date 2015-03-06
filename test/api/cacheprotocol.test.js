var test = require("tape");
var cacheprotocol = require("../../server/lib/cacheprotocol.js");


var cache = {

    set: function(key, val, cb) {

        this[key] = val;
        cb(null, true);

    }

}


test("cacheprotocol should contain an object", function(t) {

    t.equals(typeof cacheprotocol, "object", "cacheprotocol is a object");

    t.end();
});


test("cacheprotocol should have setCache method", function(t) {

    t.ok(cacheprotocol.hasOwnProperty("setCache"), "setCache exists");
    t.equals(typeof cacheprotocol.setCache, "function", "and is a function");

    t.end();
});


test("setCache should call cache.set and pass it key, response and callback", function(t) {

    cacheprotocol.setCache("master", {success: true}, function(val) {

        t.equals(val.success, true, "cb passed correct response");
        t.ok(val.hasOwnProperty("staleAt"), "response has additional staleAt property");
        t.ok(cache.hasOwnProperty("master"), "cache has value set with key");
        t.equals(cache.master.success, true, "response value stored under cache");

        t.end();

    }, cache);


});


test("setCache should pass response to callback even if an err", function(t) {

    cache = {

        set: function(k, v, cb) {
            //err true, success false
            cb(true, false);
        }

    };

    cacheprotocol.setCache("master", {test: 16}, function(val) {

        t.ok(val.hasOwnProperty("staleAt"), "response has additional staleAt property");
        t.equals(val.test, 16, "cb called with response");

        t.end();

    }, cache);


});


test("cacheprotocol should have isStale method", function(t) {

    t.ok(cacheprotocol.hasOwnProperty("isStale"), "isStale exists");
    t.equals(typeof cacheprotocol.isStale, "function", "and is a function");

    t.end();
});


test("isStale returns true only if parameter is in the future", function(t) {

    var timeInFuture = new Date().getTime() + 1000 * 60 * 60;
    var timeInPast = new Date().getTime() - 1000 * 60 * 60;

    t.notOk(cacheprotocol.isStale(timeInFuture), "timeInFuture is not stale");
    t.ok(cacheprotocol.isStale(timeInPast), "timeInPast is stale");

    t.end();

});


test("cacheprotocol should have getCache method", function(t) {

    t.ok(cacheprotocol.hasOwnProperty("getCache"), "getCache exists");
    t.equals(typeof cacheprotocol.getCache, "function", "and is a function");

    t.end();
});


test("getCache should call cache.get", function(t) {

    t.plan(1);

    cache = {

        get: function() {

            t.ok(true, "cache.get has been called")

        }

    };

    cacheprotocol.getCache(null, null, null, null, null, null, cache);

});


test("if nothing in cache, call rep.proxy", function(t) {

    t.plan(1);

    var rep = {

        proxy: function(config) {
            t.ok(true, "rep.proxy() has been called");
        }

    };
    cache = {

        get: function(key, cb) {

            cb(null, {});

        }
    };

    cacheprotocol.getCache(null, null, rep, null, null, null, cache);

});


test("if err passed to cb, call rep.proxy", function(t) {

    t.plan(1);

    var rep = {

        proxy: function(config) {
            t.ok(true, "rep.proxy() has been called");
        }

    };
    cache = {

        get: function(key, cb) {

            //err is true, value is false
            cb(true, false);

        }
    };

    cacheprotocol.getCache(null, null, rep, null, null, null, cache);

});


test("if value passed to cb, reply with value", function(t) {

    t.plan(1);

    function rep (val) {

        t.equals(val, 123, "value sent to client");

    }

    cache = {

        get: function(key, cb) {

            cb(false, {test: 123});

        }
    };

    cacheprotocol.getCache(null, "test", rep, null, null, null, cache);

});


test("if value passed to cb, make request if stale", function(t) {

    t.plan(1);

    function request (url, cb) {
        t.ok(true, "request has been called");
        cb(false, {statusCode: 200}, "testvalue");
    }

    function rep (val) {}

    var req = {
        params: {
            service: "test"
        }
    };

    function mapUri() {

        return "imaurl";

    }

    function parse (val) {
        return val;
    }

    cache = {

        get: function(key, cb) {

            cb(false, {test: {staleAt: new Date().getTime() - 1000*60*60*24}});

        }
    };

    cacheprotocol.getCache(req, "test", rep, mapUri, parse, null, cache, request);

});


test("if value passed to cb, make request if stale but don't reply if error in response", function(t) {

    t.plan(2);

    function request (url, cb) {
        t.ok(true, "request has been called");
        cb(false, {statusCode: 200}, {error: true});
    }

    function rep () {}

    var req = {
        params: {
            service: "test"
        }
    };

    function mapUri() {

        return "imaurl";

    }

    function parse (val) {
        t.ok(true, "I should only be called once");
        return val;
    }

    cache = {

        get: function(key, cb) {

            cb(false, {test: {staleAt: new Date().getTime() - 1000*60*60*24}});

        }
    };

    cacheprotocol.getCache(req, "test", rep, mapUri, parse, null, cache, request);

});


test("if value passed to cb, make request if stale but don't reply if no 200 code received", function(t) {

    t.plan(1);

    function request (url, cb) {
        t.ok(true, "request has been called");
        cb(false, {statusCode: 404}, {error: true});
    }

    function rep () {}

    var req = {
        params: {
            service: "test"
        }
    };

    function mapUri() {

        return "imaurl";

    }

    function parse (val) {
        t.ok(true, "I should not be called");
        return val;
    }

    cache = {

        get: function(key, cb) {

            cb(false, {test: {staleAt: new Date().getTime() - 1000*60*60*24}});

        }
    };

    cacheprotocol.getCache(req, "test", rep, mapUri, parse, null, cache, request);

});


test("if value passed to cb, make request if stale but don't reply if error in response", function(t) {

    t.plan(1);

    function request (url, cb) {
        t.ok(true, "request has been called");
        cb(false, {statusCode: 200}, {error: true});
    }

    function rep (val) {}

    var req = {
        params: {
            service: "test"
        }
    };

    function mapUri() {

        return "imaurl";

    }

    function parse (val) {
        return val;
    }

    cache = {

        get: function(key, cb) {

            cb(false, {test: {staleAt: new Date().getTime() - 1000*60*60*24}});

        }
    };

    cacheprotocol.getCache(req, "test", rep, mapUri, parse, null, cache, request);

});

test("if value passed to cb, don't make request if not stale", function(t) {

    t.plan(1);

    function request (url, cb) {
        t.ok(false, "this shouldn't be called");
        cb(false, {statusCode: 200}, "testvalue");
    }

    function rep (val) {
        t.ok(true, "rep called");
    }

    var req = {
        params: {
            service: "test"
        }
    };

    function parse (val) {
        return val;
    }

    cache = {

        get: function(key, cb) {

            cb(false, {test: {staleAt: new Date().getTime() + 1000*60*60*24}});

        }
    };

    cacheprotocol.getCache(req, "test", rep, null, parse, null, cache, request);


});
