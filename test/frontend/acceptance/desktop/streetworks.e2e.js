/*************************************************
*   STREETWORKS TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
**************************************************/


var Config;

Config = require("../config.js");

(function() {

"use strict";


	// describe("aaaaaaa", function() {
	// 	it('aaaaaaaa', function() {
	// 		browser.get("#/home/streetworks");

	// 		expect(aaaaa).toEqual("aaaaa");
	// 	});
	// });

// }()); 


	describe("Streetworks on home page", function() {
		
		beforeEach(function() {			
			browser.get(Config.path.home);
		});

		var streetworks = element(by.id("liveStreetworks"));

		it("appears ", function(){
			

			expect(streetworks.isDisplayed()).toBe(true);
		});

		it("redirects to streetworks when you click on the streetworks icon", function(){

			//click on text
			streetworks.click();

			var url = browser.getCurrentUrl();
		
			expect(url).toBe(Config.path.main + Config.path.home + "/streetworks"); 
		});


	});

}());



// DESKTOP:
// As a user, I want to be able to enter a Camden street name so that I
// can find the nearest service to me.
// Given that I have entered a Camden streetname, I can press a search button in order to search with that streetname.
// ✓
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


