/*************************************************
*   MAP MARKERS E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var leafletmarkers = element.all(by.css('.leaflet-clickable'));

(function () {
    "use strict";

	function mapMarkersTests () { 

    	describe("markers ", function () {

	        it("are displayed", function() {
	        	expect(leafletmarkers.get(0).isDisplayed()).toBe(true);
	        	expect(leafletmarkers.count()).toBeGreaterThan(1);
	        });

	        it("with the correct number", function() {
	            var listResults = element.all(by.repeater('result in results'));
	        	
	        	leafletmarkers.count().then(function (num) {
	        		expect(listResults.count()).toEqual(num -2);
	        	});
	        });

	        describe("if clicked", function() {

	        	it("single view displays", function() {
	        		leafletmarkers.get(0).click();
	        								
	        		var singleView = element.all(by.css('.single-view-info')).get(0);

	        		expect(singleView.isDisplayed()).toBe(true);
		        });
	        });

	        describe("if address is entered ", function() {

	        	beforeEach(function () {
	        		var input = element(by.tagName('input'));
					input.sendKeys('NW1 0NE');
					input.sendKeys(protractor.Key.ENTER);
					input.sendKeys(protractor.Key.ENTER);
	        	})

	        	it("position marker appears", function() {
	        		var position = element(by.css('[src="../img/icons/location-marker.png"]'));

	        		expect(position.isDisplayed()).toBe(true);
		        });
	        });
    	});
	}

	module.exports = mapMarkersTests;
}());