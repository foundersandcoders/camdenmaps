(function (){
    "use strict";

    var Lab = require("lab"),
        lab = exports.lab = Lab.script(),
        Fs = require('fs'),
        faketoe = require("faketoe"),
        server = require("../../server/server.js"),
        describe = lab.experiment,
        it = lab.test,
        expect = require("code").expect;

    describe("As a server, I want to call Where's my Nearest current API", function () {

        describe("Given an xml sample", function () {
            it("then faketoe converts to JSON", function (done) {

                var parser = faketoe.createParser(function (error, result) {
                    if (error) return error;
                    
                    return result;
                });
                
                var got =  Fs.createReadStream('./fixture-test.xml').pipe(parser);

                expect(typeof(got)).to.equal("object")

                done();
            });

    //     describe("Given that...", function () {

    //         it("then...", function () {

    //         });

    //     });

        })
    
    // describe("As a server, I want to ", function () {

    //     describe("Given that...", function () {

    //         it("then...", function () {

    //         });

    //     });

    })
}());
