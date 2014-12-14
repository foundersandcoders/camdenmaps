(function (){
    "use strict";

    var Lab = require("lab"),
        lab = exports.lab = Lab.script(),
        Fs = require('fs'),
        faketoe = require("faketoe"),
        server = require("../../server/server.js"),
        fixtures = require("../fixtures/xml-test.js"),
        xml = fixtures.xml,
        json = fixtures.json,
        describe = lab.experiment,
        it = lab.test,
        expect = require("code").expect,
        options = {
            method: "GET",
            url: "/services/police%20station/locations/nw1%200jh"
        };


    describe("As a server, I want to call Where's my Nearest current API", function () {

        describe("Given that server starts", function () {

            it("then runs on port 8080", function (done) {
                expect(server.info.port).to.equal(8080);
                done();
            });

        });

        describe("Given that server starts", function () {

            it("statusCode is 200 okay", function (done) {

                server.inject(options, function(response) {
                    expect(response.statusCode).to.equal(200)
                    done();
                });

            });

        });

        describe("Given that the api returns an xml sample", function () {
            it("then faketoe converts it to a JSON object", function (done) {

                // var parser = faketoe.createParser(function (error, result) {
                //     if (error) return error;

                //     return result;
                // });
                
                // var got =  Fs.createReadStream(xml).pipe(parser);

                    server.inject(options, function(response) {
                        console.log(response);
                        console.log(response.result);
                    })
            });

        

        })
    })
}());
