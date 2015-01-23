/*************************************************
*   MAP E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
**************************************************/


(function () {
    "use strict";

    describe("As a user, when I want to find a service, I want to see it on a map", function () {

    	describe("Given the page loads", function () {
	        it ("the map renders", function () {

	        	browser.get('#/home');

	        	var leaflet = element(by.css('.leaflet-tile'));

	            expect(leaflet.isPresent()).toBe(true);
	        });
	        it ("with no markers are on the map", function () {

	        	var leafletmarkers = element(by.css('.leaflet-marker-pane'));

	            expect(leafletmarkers.isDisplayed()).toBe(false);
	        });
	    });

    	describe("Given that a service is selected, ", function () {
	        it("The markers load", function () {

	        	element(by.id('findYourNearest')).click();
	            element(by.css('[ng-click="execute(item.handler)"]')).click();
	            element(by.css('[ng-click="execute(item.handler)"]')).click();

	            var markerPane = element(by.css('.leaflet-marker-pane'));
	            
	        	expect(markerPane.isPresent()).toBe(true);

	        });
	        it("with the correct number", function () {

	        	var leafletmarkers = element.all(by.css('.leaflet-marker-icon'));

	        	expect(leafletmarkers.count()).toEqual(24);
	        });
	    });

        it("Given that a marker is selected, the result page loads", function () {
        	
        	element(by.css('img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-clickable')).click();

        	var resultPage = element(by.css('.result'));

        	expect(resultPage.isDisplayed()).toBe(true);
        });

        it("Given that a postcode is entered, a position marker appears", function () {

        	var postcodeInput = element(by.id('postcode-input')).element(by.tagName('input'));

            postcodeInput.sendKeys('NW1 0NE');
            element(by.css('[ng-click="search()"]')).click();

            var positionMarker = element(by.css('path.leaflet-clickable'));

            expect(positionMarker.isPresent()).toBe(true);
        });

    });

}());