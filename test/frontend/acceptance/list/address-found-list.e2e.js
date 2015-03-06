/*************************************************
*   ADDRESS FOUND LIST E2E TESTS
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

	function addressFoundListTests () {

    	describe("list results ", function () {

            beforeEach(function () {
                var input = element(by.tagName('input'));
                input.sendKeys('NW1 0NE');
                input.sendKeys(protractor.Key.ENTER);
                input.sendKeys(protractor.Key.ENTER);
            })

            it("have more than 1 result", function () {
                expect(listResults.count()).toBeGreaterThan(1);
            });

            describe ("has the right information ", function () {

                it("title", function () {
                    var title = listItem.element(by.className("service-title"));
                    
                    expect(title.isDisplayed()).toBe(true);
                });
                it("distace only for services, not for streetworks", function () {
                    browser.getCurrentUrl().then(function (url) {
                        if (url.indexOf('streetworks') === -1) {
                            var distance = listItem.element(by.css(".distance"));
                            
                            expect(distance.isDisplayed()).toBe(true);
                        }
                    })
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

module.exports = addressFoundListTests;

}());