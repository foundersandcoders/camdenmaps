var test = require("tape");
var path = require("path");
var controllerDir = path.join(__dirname, "../../../server/angular/controllers/");
var controller = require(path.join(controllerDir, "search-controller.js"));

controller = controller.filter(function(c) {
    return typeof c === "function";
})[0];

//***MOCKS****
var scope = {
    results: [{}, {}, {}, {}],
    $on: function(name, handler) {
        this[name] = handler;
    }
};
var stateParams = {
    service: "library"
};
var markerHandlers = {
    markerClick: function() {
        return function() {}
    },
    mapClick: function() {}
};
var localStorageService = {
    isSupported: true,
    get: function() {}
};
var buttonHandlers = {
    searchAgain: function() {},
    toggle: function() {}
};
//***********

controller(scope, stateParams, null, null, null, markerHandlers, buttonHandlers, localStorageService);

test("services-controller.js should exist", function(t) {
    t.ok(controller, "services controller exists");

    t.test("scope should have...");

    t.test("if no results, expect api call: if error/if no error");

    t.test("event listeners should be registered");

    t.test("if localStorage is supported/if not");

    t.test("scope.search should...");

    t.end();
});
