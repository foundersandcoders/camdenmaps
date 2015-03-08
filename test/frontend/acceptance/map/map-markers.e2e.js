/*************************************************
*   MAP MARKERS E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	baseUrl,
	activeMarkerSrc,
	inactiveMakerSrc,
	leafletmarkers,
	firstMarker;



Config = require("../config.js");
baseUrl = Config.path.main;
activeMarkerSrc = Config.markers.active;
inactiveMarkerSrc = Config.markers.inactive;
leafletmarkers = element.all(by.css('.leaflet-marker-icon'));
firstMarker = leafletmarkers.get(0);


(function () {
    "use strict";

	function mapMarkersTests () { 

    	describe("markers ", function () {

	        it("are displayed", function() {
	            
	        	expect(leafletmarkers.get(0).isDisplayed()).toBe(true);
	        	expect(leafletmarkers.count()).toBeGreaterThan(1);
	        });

	        describe("if clicked", function() {

	        	it("marker links with view", function() {
		        	
		        	firstMarker.click().then(function(){
		        		var singleView = element.all(by.css('.single-view-info')).get(0);
		        		var icon = firstMarker.getAttribute("src");

		        		expect(icon).toEqual(baseUrl + activeMarkerSrc); 
		        		expect(singleView.isDisplayed()).toBe(true);
		        	});
		        	 	
		        });


	        });

	        describe("when clicking through markers", function() {

	        	it("only one marker is active", function() {
	        		
	        		var secondMarker = leafletmarkers.get(2);

					firstMarker.click();
					secondMarker.click().then(function() {
						var inactiveMarker = firstMarker.getAttribute("src"); 
						var activeMarker = secondMarker.getAttribute("src"); 
	        			
	        			expect(inactiveMarker).toEqual(baseUrl + inactiveMarkerSrc); 
	        			expect(activeMarker).toEqual(baseUrl + activeMarkerSrc);       		
	        		}); 		      		 		
	        		
	        	});

	        });

	        describe("if address is entered ", function() {

	        	beforeEach(function () {
	        		var input = element(by.tagName('input'));
					input.sendKeys('NW1 0NE');
					input.sendKeys(protractor.Key.ENTER);
					input.sendKeys(protractor.Key.ENTER);
	        	});

	        	it("position marker appears", function() {
	        		var position = element(by.css('[src="../img/icons/location-marker.png"]'));

	        		expect(position.isDisplayed()).toBe(true);
		        });
	        });
    	});
	}

	module.exports = mapMarkersTests;
}());