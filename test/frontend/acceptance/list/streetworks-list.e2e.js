/*************************************************
*   STREETWORKS LIST E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	listResults;

Config = require('../config.js');
listResults = element.all(by.repeater('result in results'));

(function () {
    "use strict";

	function streetworksListTests () { 

    	describe("list results ", function () {
    		it("have more than 1 result", function () {

            	expect(listResults.count()).toBeGreaterThan(1);
            });

	        describe ("has the right information ", function () {

                it("title", function () {

                	
                });
                it("Address", function () {

                	
                });
                it("Postcode", function () {

                	
                });
                it("Not distance", function () {

                	
                });

            });

            describe("Once clicked, result ", function () {
            	
	        	it("expands", function () {

		        });

	        	describe("contains ", function () {

		            it("telephone number ", function () {

			        });

			        it("website", function () {

			        });

			        it("website has working link", function () {

			        });

			        it("Opening Hours", function () {

			        });
			    });
		    });

	    });
	}

module.exports = streetworksListTests;

}());