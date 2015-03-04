/*************************************************
*   ABOUT YOUR NEIGHBOURHOOD TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	buttons,
	streetworksTitle,
	streetworksImage,
	baseUrl,
	home,
	menuBarTests,
	neighbourhoodAddressTypeaheadTests;

Config = require("../../config.js");
buttons = element.all(by.repeater('button in buttons'));
neighbourhoodTitle = Config.landing.buttons.title[1];
neighbourhoodImage = Config.landing.buttons.imgSrc[1];
baseUrl = Config.path.main;
homeUrl = Config.path.home;
neighbourhoodButton = buttons.get(1);
menuBarTests = require('../../menubar/menubar.e2e.js');
neighbourhoodAddressTypeaheadTests = require('./neighbourhood-addresstypeahead.e2e.js');

(function() {
	"use strict";

	describe("Neighbourhood on landing page", function() {
		
		beforeEach(function() {			
			browser.get(homeUrl);
		});

		var img = neighbourhoodButton.element(by.className("icon")),
			text = neighbourhoodButton.element(by.tagName("h4"));
			
		it("appears ", function(){

			expect(neighbourhoodButton.isDisplayed()).toBe(true);
		});

		it("has an image showing", function() {

			expect(img.isDisplayed()).toBe(true);
		});

		it("has the correct image", function() {

			var src = img.getAttribute("src");

			expect(src).toEqual(baseUrl + neighbourhoodImage);
		});

		it("has the correct title", function() {

			var title = text.getText();

        	expect(title).toEqual(neighbourhoodTitle);
		});

		it("redirects to neighbourhood when you click on the neighbourhood icon", function(){
			//click on button
			neighbourhoodButton.click();
			var url = browser.getCurrentUrl();
		
			expect(url).toContain('neighbourhood'); 
		});
	});

	describe("once about your neighbourhood", function() {

		beforeEach(function() {	
			browser.get(homeUrl);		
			neighbourhoodButton.click();
		});
	
		describe(" has been clicked on", function() {
			menuBarTests();
			neighbourhoodAddressTypeaheadTests();
		});
	});

}());

