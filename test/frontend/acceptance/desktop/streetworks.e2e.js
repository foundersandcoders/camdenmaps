/*************************************************
*   STREETWORKS TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
**************************************************/


var Config,
	buttons,
	streetworksTitle,
	streetworksImage,
	baseUrl,
	home,
	streetworksUrl;

Config = require("../config.js");
buttons = element.all(by.repeater('button in buttons'));
streetworksTitle = Config.landing.buttons.title[2];
streetworksImage = Config.landing.buttons.imgSrc[2];
baseUrl = Config.path.main;
homeUrl = Config.path.home;
streetworksUrl = Config.path.streetworks;


(function() {

"use strict";


	describe("Streetworks on landing page", function() {
		
		beforeEach(function() {			
			browser.get(homeUrl);
		});

		var streetworks = buttons.get(2),
			img = streetworks.element(by.tagName("a")).element(by.className("icon")),
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
			streetworks.click();

			var url = browser.getCurrentUrl();
		
			expect(url).toBe(baseUrl + homeUrl + streetworksUrl); 
		});


	});

	describe("Given that I have selected Streetworks", function() {

		beforeEach(function() {			
			browser.get(homeUrl + streetworksUrl);
		});

		menuBarTests();
		addressTypeaheadTests();
		geolocationTests();

	});


}());

