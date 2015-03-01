/*************************************************
*   ADDRESS SEARCH LIST E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	listResults,
	listItem;

Config = require('../config.js');
listResults = element.all(by.repeater('result in results'));
listItem = element.all(by.css('.list-item')).get(0);

(function () {
    "use strict";

	function addressSearchListTests () { 

    	describe("list results ", function () {

    		it("have more than 1 result", function () {
            	expect(listResults.count()).toBeGreaterThan(1);
            });

	        describe ("has the right information ", function () {

                it("title", function () {
                	var title = listItem.element(by.id("service-title"));
                	
                	expect(title.isDisplayed()).toBe(true);
                });
            });

            describe("Once clicked, result ", function () {
            	
	        	it("expands", function () {

	        		var initialHeight = listItem.getSize().then(function (data) {
					  return data.height;
					});

	        		listResults.get(0).click();

	        		var nextHeight = listItem.getSize().then(function (data) {
					  return data.height;
					});

					expect(initialHeight).toBeLessThan(nextHeight);
	        		
		        });
		    });

	    });
	}

module.exports = addressSearchListTests;

}());