// /*************************************************
// *   SINGLE VIEW TESTS
// *   Description: Acceptance tests are written here
// *   Use: run tests by npm test
// **************************************************/


(function () {
    "use strict";

    describe("As a user, I want to find contact information for service items so that I can contact them easily.", function () {

    	 it("Given that an item on the list is selected, a result page is present", function () {

    	 	browser.get('#/home/Lunch%20club/location/NW1%200NE/list');

            element.all(by.css('.list-item')).get(0).click();

            var result = element(by.css('.result'));

            expect(result.isDisplayed()).toBe(true);
        });

        describe("the information box is displayed, then it contains contains the information", function () {
        	it("Distance", function () {

        		var distance = element.all(by.css(' [ng-show="showDistance"] ')).get(0);

                expect(distance.isDisplayed()).toBe(true);

	        });

            it("Name", function () {

            	var name = element.all(by.tagName('h5')).get(0);

                expect(name.getText()).toBe('St Pancras Community Centre Lunch Club');

	        });

	        it("address", function () {

	        	var address = element.all(by.tagName('p')).get(0);
	        	var address2 = element.all(by.tagName('p')).get(1);

                expect(address.getText()).toBe('Camden Street');
                expect(address2.getText()).toBe('London, NW1 0LG');

	        });

            it("phone number", function () {

            	var phoneNumber = element.all(by.tagName('p')).get(2);

                expect(phoneNumber.getText()).toBe('020 7388 5923');

	        });

	        it("opening hours", function () {

	        	var openingHours = element.all(by.tagName('p')).get(3);

                expect(openingHours.getText()).toBe('Meets Mon-Fri 11am-2pm.');

	        });
        });

        // it("if the travel icon is clicked, google is opened in a new tab or window.", function () {

        // 	var travel = element.all(by.css('.contact img')).get(1);

        // 	travel.click();

        // 	var url = browser.getCurrentUrl();

        // 	expect(url).toBe('google');
        // });
    });

}());
