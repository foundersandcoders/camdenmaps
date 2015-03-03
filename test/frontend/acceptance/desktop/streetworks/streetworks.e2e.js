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
	streetworksUrl,
	menuBarTests,
	mapMarkerTests,
	streetworks,
	addressTypeaheadTests;

Config = require("../../config.js");
buttons = element.all(by.repeater('button in buttons'));
streetworksTitle = Config.landing.buttons.title[2];
streetworksImage = Config.landing.buttons.imgSrc[2];
baseUrl = Config.path.main;
homeUrl = Config.path.home;
streetworksUrl = Config.path.streetworks;
streetworks = buttons.get(2);
// Use (and improve!) these tests for your needs.
menuBarTests = require('../../menubar/menubar.e2e.js');
mapMarkerTests = require('../../map/map-markers.e2e.js');
addressTypeaheadTests = require('../../typeahead/addresstypeahead.e2e.js');

(function() {

"use strict";

	describe("Streetworks on landing page", function() {
		
		beforeEach(function() {			
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
			streetworks.click();
			var url = browser.getCurrentUrl();
		
			expect(url).toContain(streetworksUrl); 
		});


	});

	describe("once live streetworks", function() {

		beforeEach(function() {	
			browser.get(homeUrl);		
			streetworks.click();
		});
	
		describe(" has been clicked on", function() {
			//Hello Emma :).
			// To avoid repetition, I added your tests here.
			menuBarTests();
			// and here
			addressTypeaheadTests();
		});
	});

	// describe("Once an address has been entered", function() {

	// 	beforeEach(function() {
	// 		browser.get(homeUrl + streetworksUrl + "location/NW1%200NE");
	// 	});

	// 	var markers = element.all(by.tagName("img"));
	// 		// i,
			
	// 		// resultsNumber = results.count();

	// 	it("Given I have searched using a Camden streetname, I can see markers", function() {

	// 		// for (i = 0; i < resultsNumber; i++) {
	// 		// 	expect(markers.get(i).isDisplayed()).toBe(true);
	// 		// }

	// 		var list = element(by.id("list-results"));

	// 		var results = list.element.all(by.repeater('result in results'));

	// 		expect(results.get(0)).toEqual(30);

				

		// it("indicating the positions of the streetworks that are closest to my street name on a map.")

	// 	});
	// });



}());



// DESKTOP:

// Given I have searched using a Camden streetname, I can see markers indicating the positions of the particular services of that type that are closest to my street name on a map.
// ✓
// Given that I have searched using an invalid street name (i.e. not a real street name or one outside of Camden), I can see a warning message informing me of what I have done wrong.
// ✓
// Given that I enter a part of a street name (i.e. "Cam"), I can see a dropdown list of potential street name matches and their associated addresses (i.e. "50 Camden High Street, NW1 0NE, 52 Camden High Street, NW1 0NE").
// ✓
// Given that I have selected a type of service, I can enter a Camden street name into a search box.
// ✓
// Given that I select a street name from the dropdown list, I can press a search button in order to search using that street name
// ✓
// Given that the dropdown list of potential matches doesn't appear, I can search using the streetname I entered anyway.
// ✓
// Given that I haven't search a location yet, I am not given the option to "List results"

// DESKTOP: As a user, when I click on a point of interest in "List Results", its corresponding marker should be highlighted so I know where it is located on the map.
// GIven that I have clicked on a point of interest in the list, a marker should be highlighted on the map.
// ✓
// Given that a marker is highlighted, it should be the correct marker.
// ✓
// Given that a marker is highlighted, the map should recentre on that marker.

// DESKTOP: As a user who has searched using a postcode or streetname, I want my postcode or street name to be remembered for future searches so I don't have to reenter it for multiple searches.

// DESKTOP: As a user, I can search for the nearest Camden streetworks so I can plan my journey around them.


