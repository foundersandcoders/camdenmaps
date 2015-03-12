/*************************************************
*   STREETWORKS TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/


var Config,
	buttons,
	streetworksTitle,
	streetworksImage,
	baseUrl,
	homeUrl,
	streetworksUrl,
	menuBarTests,
	mapMarkerTests,
	streetworks,
	addressTypeaheadTests,
	geolocationTests,
	addressFoundListTests;

Config = require("../../config.js");
streetworks = element.all(by.repeater('button in buttons')).get(2);
streetworksTitle = Config.landing.buttons.title[2];
streetworksImage = Config.landing.buttons.imgSrc[2];
baseUrl = Config.path.main;
homeUrl = Config.path.home;
streetworksUrl = Config.path.streetworks;
streetworksButton = streetworks.element(by.tagName('h4'));
menuBarTests = require('../../menubar/menubar.e2e.js');
mapMarkerTests = require('../../map/map-markers.e2e.js');
addressTypeaheadTests = require('../../typeahead/addresstypeahead.e2e.js');
geolocationTests = require('../../geolocation/geolocation.e2e.js');
addressFoundListTests = require('../../list/address-found-list.e2e.js');

(function() {

"use strict";

	describe("Streetworks on landing page", function() {
		
		beforeEach(function() {	
			browser.manage().window().setSize(320, 480);		
			browser.get(homeUrl);
		});

		var img = streetworks.element(by.tagName("a")).element(by.className("icon")),
			text = streetworks.element(by.tagName("a")).element(by.tagName("h4"));
			

		it("appears ", function(){

			expect(streetworks.isDisplayed()).toBe(true);
		});

		it("has an image showing", function() {

			expect(img.isDisplayed()).toBe(true);
		});


		it("has the correct image", function() {

			var src = img.getAttribute("src");

			expect(src).toEqual(baseUrl + streetworksImage);
		});

		it("has the correct title", function() {

			var title = text.getText();

        	expect(title).toEqual(streetworksTitle);
		});

		it("redirects to streetworks when you click on the streetworks icon", function(){
			//click on button
			streetworksButton.click();
			var url = browser.getCurrentUrl();
		
			expect(url).toContain(streetworksUrl); 
		});
	});

	describe("once live streetworks", function() {

		beforeEach(function() {	

			browser.get(homeUrl);		
			streetworksButton.click();
		});
	
		describe(" has been clicked on", function() {
			
			menuBarTests();
			addressTypeaheadTests();
			geolocationTests();
		});
	});

	describe("once an address has been entered", function() {

		beforeEach(function() {
			browser.manage().window().setSize(1600, 1000);
			browser.get(homeUrl);
			streetworksButton.click();
			var input = element(by.tagName('input'));
						input.sendKeys('NW1 0NE');
						input.sendKeys(protractor.Key.ENTER);
						input.sendKeys(protractor.Key.ENTER);

		});

		afterEach(function () {
		    browser.executeScript('window.localStorage.clear();');
		});

		mapMarkerTests();

	});
}());