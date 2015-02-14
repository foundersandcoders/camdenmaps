// /*************************************************
// *   LIST VIEW E2E TESTS
// *   Description: Acceptance tests are written here
// *   Use: run tests by npm test
// **************************************************/


(function () {
    "use strict";

    describe("As a user, I want to enter a postcode to search the closest results from me", function () {

        describe ("given a valid camden postcode is entered", function () {

            describe("list button is clicked and ", function () {
                it("items list is displayed", function () {

                	browser.get('#/home/Lunch%20club/search');

                    // if (!browser.getCurrentUrl().toContain('NW1')) {
                    //     var postcodeInput = element(by.id('postcode-input')).element(by.tagName('input'));

                    //     postcodeInput.sendKeys('NW1 0NE');

                    //     element(by.css('[ng-click="search()"]')).click();
                    // }
            
                    element(by.css('[ng-click="toggle()"]')).click();

                    var listResults = element(by.id('list-results'));
                    var repeater = element.all(by.repeater('result in results'));

                    expect(listResults.isPresent()).toBe(true);
                    expect(repeater.count()).toBe(24);
                });

            });

          //   describe("Each result in the list contains information", function () {
	        	// it("Distance", function () {

	        	// 	var text = element.all(by.css('.distance')).get(0).getText();

	         //        expect(text).toEqual('0.49 miles');

		        // });

	         //    it("Name", function () {

	         //    	var name = element.all(by.tagName('h5')).get(1);

	         //        expect(name.getText()).toBe('St Pancras Community Centre Lunch Club');

		        // });

		        // it("address", function () {

		        // 	var address = element.all(by.tagName('p')).get(2);
		        // 	var address2 = element.all(by.tagName('p')).get(3);

          //           var pArray = element.all(by.tagName('p'));

          //           expect(pArray.getText()).toBe('NW1 0LG');

	         //        // expect(address.getText()).toBe('30 Camden Street');
	         //        // expect(address2.getText()).toBe('NW1 0LG');

		        // });
		    // });
        });

    });

}());
