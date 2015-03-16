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
	retry;

Config = require("../config.js");
baseUrl = Config.path.main;
activeMarkerSrc = Config.markers.active;
inactiveMarkerSrc = Config.markers.inactive;

retry = require('webdriverjs-retry');


(function () {
    "use strict";

	function mapMarkersTests () { 

    	describe("markers ", function () {

	        it("are displayed", function() {

	            var leafletmarkers = element.all(by.css('.leaflet-marker-icon'));

	        	expect(leafletmarkers.get(0).isDisplayed()).toBe(true);
	        	expect(leafletmarkers.count()).toBeGreaterThan(1);
	        });

	        it("with the correct number", function() {
               	var listResults = element.all(by.repeater('result in results'));
                var leafletmarkers = element.all(by.css('.leaflet-marker-icon'));

                browser.getCurrentUrl().then(function (url) {
                    if (url.indexOf('streetworks') !== -1) {
                        leafletmarkers.count().then(function (num) {
                            expect(listResults.count()).toEqual(num-1);
                        });
                    } else {
                       	leafletmarkers.count().then(function (num) {
                            expect(listResults.count()).toEqual(num);
                       	});
                    }
                });
            });

        	it("marker links with view", function() {
	        	
	        	var leafletmarkers = element.all(by.css('.leaflet-marker-icon'));

	        	var firstMarker = leafletmarkers.get(0);

	        	retry.run(function(){

	        		firstMarker.click().then(function(){
		        		var singleView = element.all(by.css('.single-view-info')).get(0);
		        		var icon = firstMarker.getAttribute("src");


		        		expect(icon).toEqual(baseUrl + activeMarkerSrc); 
		        		expect(singleView.isDisplayed()).toBe(true);
		        	});
		        }, 5000); 	
	        });


	        describe("when clicking through markers", function() {

	        	it("only one marker is active", function() {
	        		
	        		var leafletmarkers = element.all(by.css('.leaflet-marker-icon'));

	        		var firstM = leafletmarkers.get(0);
	        		var secondMarker = leafletmarkers.get(2);

					retry.run(function(){
						firstM.click();
					}, 5000).then(function(){
						retry.run(function(){
							secondMarker.click();
						}, 5000).then(function() {
							var inactiveMarker = firstM.getAttribute("src"); 
							var activeMarker = secondMarker.getAttribute("src"); 
		        			
		        			expect(inactiveMarker).toEqual(baseUrl + inactiveMarkerSrc); 
		        			expect(activeMarker).toEqual(baseUrl + activeMarkerSrc);       		
	        			}); 	  		 		
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