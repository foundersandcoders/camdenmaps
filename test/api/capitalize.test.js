var test = require("tape");
var capitalize = require("../../server/lib/capitalize.js");

var ins = ["hello", "euhaoeusnht", "William"];
var outs = ["Hello", "Euhaoeusnht", "William"];


test("capitalize should be a function", function(t) {

    t.equals(typeof capitalize, "function", "capitalize is a function");
    t.end();

});


test("capitalize should return input if not a string", function(t) {

    t.equals(typeof capitalize(), "undefined", "capitalize() returns undefined");
    t.equals(typeof capitalize(function(){}), "function", "capitalize(function({}) returns function");
    t.equals(typeof capitalize({test: "hello"}), "object", "capitalize({}) returns object");
    t.equals(typeof capitalize(3), "number", "capitalize(3) returns number");
    t.end();

});


ins.map(function(w, i) {

    test("capitalize should return word with capitalized first lettef if input is a string", function(t) {

        t.equals(capitalize(w), outs[i], ins[i] + " returns " + outs[i]);
        t.end();

    });

});
