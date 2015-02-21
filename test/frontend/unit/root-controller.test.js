var test = require("tape");
var path = require("path");
var controllerDir = path.join(__dirname, "../../../server/angular/controllers/");
var controller = require(path.join(controllerDir, "root-controller.js"));

controller = controller.filter(function(c) {
    return typeof c === "function";
})[0];

//***MOCKS****
var buttonHandlers = {
    searchAgain: function() {
        return function() {} 
    }
}

var markers = {
    addMarkers: function() {
        return function() {}
    }
}

var scope = {};
//***********

controller(scope, markers, buttonHandlers);

test("root-controller.js should exist", function(t) {

    t.ok(controller, "root controller exists");
    t.end();

});

test("scope should have the following methods", function(t) {

    
    t.ok(scope.hasOwnProperty("locationSelected"), "scope.locationSelected exists");
    t.deepEquals(scope.locationSelected, {}, "scope.locationSelected is an empty object");

    t.ok(scope.hasOwnProperty("results"), "scope.results exists");
    t.deepEquals(scope.results, [], "scope.results is an empty array");

    t.ok(scope.hasOwnProperty("activeMarker"), "scope.activeMarker exists");
    t.equals(scope.activeMarker, 0, "scope.activemarkers is 0");

    t.ok(scope.hasOwnProperty("updateResults"), "scope.updateResults exists");
    t.equals(typeof scope.updateResults, "function", "scope.updateResults is a function");

    t.ok(scope.hasOwnProperty("update"), "scope.update exists");
    t.equals(typeof scope.update, "function", "scope.update is a function");

    t.ok(scope.hasOwnProperty("centre"), "scope.centre exists");
    t.equals(typeof scope.centre, "object", "scope.centre is an object");

    t.ok(scope.hasOwnProperty("maxbounds"), "scope.maxbounds exists");
    t.equals(typeof scope.maxbounds, "object", "scope.maxbounds is an object");
    
    t.ok(scope.hasOwnProperty("defaults"), "scope.defaults exists");
    t.equals(typeof scope.defaults, "object", "scope.defaults is an object");
    
    t.ok(scope.hasOwnProperty("markers"), "scope.markers exists");
    t.equals(typeof scope.markers, "object", "scope.markers is an object");
    
    t.ok(scope.hasOwnProperty("geojson"), "scope.geojson exists");
    t.equals(typeof scope.geojson, "object", "scope.geojson is an object");

    t.ok(scope.hasOwnProperty("sendHome"), "scope.sendHome exists");
    t.equals(typeof scope.sendHome, "function", "scope.sendHome is a function");
    
    t.ok(scope.hasOwnProperty("addMarkers"), "scope.addMarkers exists");
    t.equals(typeof scope.addMarkers, "function", "scope.addMarkers is a function");
    
    t.end();

});

test("scope.updateResults should change scope.results", function(t) {

    t.deepEquals(scope.results, [], "scope.results is empty" )
    scope.updateResults([{display: "heuo"}]);
    t.deepEquals(scope.results, [{display: "heuo"}], "scope.results has been updated");
    t.end(); 

});


test("scope.update should update scope", function(t) {

    t.deepEquals(scope.markers, {}, "scope.markers is empty");
    scope.update("markers", {h: 10});
    t.deepEquals(scope.markers, {h: 10}, "scope.markers has been updated");
    t.end();

});
