/*************************************************
*   ADDRESS FOUND LIST E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
    listResults,
    listItem,
    activeMarker,
    baseUrl,
    mapMarkerTests;


Config = require('../config.js');
listResults = element.all(by.repeater('result in results'));
listItem = element.all(by.css('.list-item')).get(0);
activeMarker = Config.markers.active;
baseUrl = Config.path.main;
mapMarkerTests = require('../map/map-markers.e2e.js');


(function () {
    "use strict";

	function addressFoundListTests () {

    	describe("list results ", function () {

            beforeEach(function () {
                var input = element(by.tagName('input'));
                input.sendKeys('NW1 0NE');
                input.sendKeys(protractor.Key.ENTER);
                input.sendKeys(protractor.Key.ENTER);
            });

            it("have more than 1 result", function () {
                expect(listResults.count()).toBeGreaterThan(1);
            });

            describe ("has the right information ", function () {

                it("title", function () {
                    browser.getCurrentUrl().then(function (url) {
                        if (url.indexOf('streetworks') === -1) {
                            var title = listItem.element(by.className("service-title"));
                    
                            expect(title.isDisplayed()).toBe(true);
                        } else {
                            var titleS = listItem.element(by.css('[ng-show="streetworks"]'));
                    
                            expect(titleS.isDisplayed()).toBe(true);
                        }
                    });
                });

                it("distances are displayed only for services, not for streetworks", function () {
                    browser.getCurrentUrl().then(function (url) {
                        if (url.indexOf('streetworks') === -1) {
                            var distance = listItem.element(by.css(".distance"));
                            
                            expect(distance.isDisplayed()).toBe(true);
                        }
                    });
                });

                it("distances are rounded to one decimal place, not for streetworks", function () {
                    browser.getCurrentUrl().then(function (url) {
                        if (url.indexOf('streetworks') === -1) {
                            var distance = listItem.element(by.css(".distance"));
                            var text = distance.getText();
                            
                            expect(text).toMatch(/\d*\.\d{1} miles away/);
                        }
                    });
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

                it("links to a marker", function(){
                    listResults.get(0).click();
                    
                    var leafletmarkers = element.all(by.css('.leaflet-marker-icon'));
                    var icon = leafletmarkers.get(0).getAttribute("src"); 

                    expect(icon).toEqual(baseUrl + activeMarker);
                });
                

                it(" marker tests", function() {
                    browser.getCurrentUrl().then(function (url) {
                        if (url.indexOf('streetworks') === -1) {
                        mapMarkerTests();
                        }
                    });
                });

            });
            

        });
    
    }


module.exports = addressFoundListTests;

}());