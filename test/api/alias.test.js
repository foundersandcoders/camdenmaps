var test = require("tape");
var alias = require("../../server/lib/alias.js");

var mappedServices = [
    {
        input: "Wood",
        output: "Christmas Trees"
    },
    {
        input: "Batteries",
        output: "Household batteries"
    },
    {
        input: "Cardboard and paper",
        output: "Cardboard"
    },
    {
        input: "Clothing and textiles",
        output: "Textiles and shoes"
    },
    {
        input: "Nappies",
        output: "Nappies"
    },
    {
        input: "Furniture",
        output: "Furniture (not reusable)"
    },
    {
        input: "Garden waste",
        output: "Grass cuttings and leaves"
    },
    {
        input: "Light bulbs",
        output: "Light bulbs"
    }, 
    {
        input: "Glass",
        output: "Glass bottles and jars (all colours)"
    },
    {
        input: "Vehicles",
        output: "Cars and end of life vehicles"
    },
    {
        input: "Clinical waste",
        output: "Sharps"
    },
    {
        input: "Paint",
        output: "Paint"
    },
    {
        input: "Chemical and hazardous waste",
        output: "Household chemicals"
    },
    {
        input: "Aluminium cans",
        output: "Aluminium cans"
    },
    {
        input: "Foil",
        output: "Foil"
    },
    {
        input: "Scrap metal",
        output: "Scrap metal"
    },
    {
        input: "Spectacles",
        output: "Spectacles"
    },
    {
        input: "Cooking oil",
        output: "Cooking oil"
    },
    {
        input: "Plastic",
        output: "Plastic containers"
    },
    {
        input: "Residents and tenants association",
        output: "Residents%2Ftenants association"
    },
    {
        input: "Marriage and civil partnership venues",
        output: "Marriage%2Fcivil partnership venue"
    },
    {
        input: "Pay and display",
        output: "Pay and display%2Fmeter"
    },
    {
        input: "Household electronics and appliances",
        output: "Microwaves"
    }
];

mappedServices.map(function(s) {

    test("alias should return " + s.output + "when given " + s.input, function(t) {

        t.equals(alias(s.input), s.output, s.input + " passed in and " + s.output + " returned");
        t.end();
    });

});

test("alias.js should contain a function", function(t) {

    t.equals(typeof alias, "function", "alias contains a function");
    t.end();

});

test("alias should return input if not matched", function(t) {

    t.equals("undefined", typeof alias(), "return undefined when passed nothing");
    t.equals("animal", alias("animal"), "return animal  when passed animal");
    t.equals(192, alias(192), "return 192  when passed 192");
    t.end();

});
