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

            describe("Once clicked, ", function () {

	        	it("result expands", function () {

                    var initialHeight, nextHeight;

	        		initialHeight = listItem.getSize().then(function (data) {
					  return data.height;
					});

	        		listResults.get(0).click();

	        		nextHeight = listItem.getSize().then(function (data) {
					  return data.height;
					});

					expect(initialHeight).toBeLessThan(nextHeight);

		        });

                it("marker is highlighted", function () {

                    var marker;

                    listResults.get(0).click();

                    marker = element.all(by.css(".leaflet-marker-icon"))
                            .get(0)
                            .getAttribute("src").then(function(attr) {
                                expect(attr).toContain("/img/icons/yellow-marker.png");
                            });

                });

		    });

	    });
	}

module.exports = addressSearchListTests;

}());
