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

	describe("once live streetworks has been clicked on", function() {

		beforeEach(function() {			
			browser.get(homeUrl + streetworksUrl);
		});

		describe("there is a menu bar with a home button", function() {
			var home = element(by.id("backhome"));

			it("which is visible", function() {
			
				expect(home.isDisplayed()).toBe(true);
			});

			it("which redirects to the landing page", function() {
			
				home.click();
				var url = browser.getCurrentUrl();

				expect(url).toEqual(baseUrl + homeUrl);

			});
		});

		describe("As a user, I want to be able to enter a Camden street name so that I can find the nearest service to me.", function() {
		
			var addressSearch = element(by.id("forminput")).element(by.tagName("input"));
			var searchButton = element(by.className("glyphicon-search"));

			it("the input box which is visible", function() {
			
				expect(addressSearch.isDisplayed()).toBe(true);
			});

			it("the search button is visible", function() {
			
				expect(searchButton.isDisplayed()).toBe(true);
			});

			it("Given that I have entered a Camden streetname, I can press a search button in order to search with that streetname.", function() {

				var address = "NW10NE";

				addressSearch.click().sendKeys(address);
				searchButton.click();

				var url = browser.getCurrentUrl();

				expect(url).toEqual(baseUrl + homeUrl + streetworksUrl + "/location/" + address);
			});
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


