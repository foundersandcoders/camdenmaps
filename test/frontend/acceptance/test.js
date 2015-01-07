/*************************************************
*   test.js
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
*
**************************************************/

(function () {
    "use strict";

//Below describe block subject to change
    describe("As a user, I want to have clear call to actions when I arrive on the landing page", function () {

        beforeEach(function () {
            browser.get("/");
        });

        it("title to be correct", function() {
            expect(browser.getTitle()).toEqual('Camden Council: Find Your Nearest');

        });
        it("There are three call to actions with icons", function() {

            var findYourNearest = element(by.css('find-your-nearest'));
            var aboutYourNeighbourhood = element(by.css('about-your-neighbourhood'));
            var liveStreetworks = element(by.css('live-streetworks'));

            expect(findYourNearest.toEqual('Find Your Nearest'));
            expect(aboutYourNeighbourhood.toEqual('About Your Neighbourhood'));
            expect(liveStreetworks.toEqual('Live Streetworks'));

            var nearestIconSrc = element(by.css('find-your-nearest')).attr("src");
            var neighbourhoodIconSrc = element(by.css('about-your-neighbourhood')).attr("src");
            var streetworksIconSrc = element(by.css('live-streetworks')).attr("src");

            expect(nearestIconSrc.toEqual('../img/icons/find-your-nearest.svg'));
            expect(neighbourhoodIconSrc.toEqual('../img/icons/your-neighbourhood.svg'));
            expect(streetworksIconSrc.toEqual('../img/icons/streetworks.svg'));

        });
        it("The header includes Camden Logo and correct alternate text", function() {

            var logo = element(by.class('camden-logo'));
            var alt = logo.attr("alt");

            expect(logo.isDisplayed()).toBe(true);
            expect(alt.toEqual('Camden'));
        });
        it("page loads, the map renders", function() {

            var canvas = element($('canvas'));

            expect(canvas).isDisplayed;

        });
        it("a option is clicked, services categories are revealed", function () {
            
            function clicktoOpen() {
                element(by.class('nearest-toggle')).click();
            }

            var carousel = element(by.id('carousal-service-categories'));

            clicktoOpen();
            expect(carousal.isDisplayed()).toBe(true);
        });
    });


/**********************************************
    Wheres my Nearest Specific Tests go here
***********************************************/

    describe("As a user, I want to be able to enter a Camden postcode so that I can find the nearest point of interest to me.", function () {

        // beforeEach(function () {
        //     browser.get("/");
        // });

        it("a service category is clicked, services are revealed", function () {
            
            function clicktoOpen() {
                element(by.class('community-and-living-toggle')).click();
            }

            var carousel = element(by.id('carousal-community-and-living'));

            clicktoOpen();
            expect(carousal.isDisplayed()).toBe(true);

            
        });





        it("a postcode is entered, then it is validated to ensure it is a valid Camden postcode.", function () {
        	//Need to test
        });
        it("an invalid postcode is entered, then a message informs the user that the postcode is either not correct or in Camden.", function () {
        	//Need to test
            //load the page and find the correct text on it after an invalid postcode is entered.
        });
        it("a postcode and service are searched, then a list of nearby services is displayed, arranged by distance and with information about: name, address, distance from postcode.", function () {
        	//Need to test
        });
        it("an item in the list of nearby services is clicked, then the map is centered on the corresponding pin and its information box opens.", function () {
            //Need to test
        });
        it("a pin on the map is clicked, then the map centres the pin on the map and highlights it in the list and displays its information box the on map.", function () {
            //Need to test
        });
        it("the information box is displayed, then it contains contains its information for example: phone number, website, description, opening hours, (?).", function () {
             //Need to test
        });
        it("a service category is not selected but postcode has been entered, then a message appears to prompt the user to select a service category.", function () {
             //Need to test
        });
        it("the enter key is pressed, then the search criteria are submitted.", function () {
             //Need to test
        });
        it("the map is clicked and dragged, then it moves to reveal more nearby pins.", function () {
             //Need to test
        });

    });
	
	describe("As a user, I want to be able to enter a Camden areacode so that I can find the nearest point of interest to me.", function () {

        it("a areacode is entered, then it is validated to ensure it is a valid Camden areacode.", function () {
             //Need to test
        });
        it("an invalid areacode is entered, then a message informs the user that the areacode is either not correct or in Camden.", function () {
             //Need to test
        });
        it("a areacode and service are searched, then a list of nearby services is displayed, arranged by distance and with information about: name, address, distance from areacode.", function () {
             //Need to test
        });
        it("an item in the list of nearby services is clicked, then the map is centered on the corresponding pin and its information box opens.", function () {
             //Need to test
        });
        it("a pin on the map is clicked, then the map centres the pin on the map and highlights it in the list and displays its information box the on map.", function () {
             //Need to test
        });
        it("the information box is displayed, then it contains contains its information for example: phone number, website, description, opening hours, (?).", function () {
             //Need to test
        });
        it("a service category is not selected but areacode has been entered, then a message appears to prompt the user to select a service category.", function () {
             //Need to test
        });
        it("the enter key is pressed, then the search criteria are submitted.", function () {
             //Need to test
        });
        it("the map is clicked and dragged, then it moves to reveal more nearby pins.", function () {
             //Need to test
        });

    });

	describe("As a user, I want to be able to enter a Camden street name so that I can find the nearest point of interest to me.", function () {

        

        it("a street name is entered, then it is validated to ensure it is a valid Camden street name.", function () {
             //Need to test
        });
        it("an invalid street name is entered, then a message informs the user that the street name is either not correct or in Camden.", function () {
             //Need to test
        });
        it("a street name and service are searched, then a list of nearby services is displayed, arranged by distance and with information about: name, address, distance from street name.", function () {
             //Need to test
        });
        it("an item in the list of nearby services is clicked, then the map is centered on the corresponding pin and its information box opens.", function () {
             //Need to test
        });
        it("a pin on the map is clicked, then the map centres the pin on the map and highlights it in the list and displays its information box the on map.", function () {
             //Need to test
        });
        it("the information box is displayed, then it contains contains its information for example: phone number, website, description, opening hours, (?).", function () {
             //Need to test
        });
        it("a service category is not selected but street name has been entered, then a message appears to prompt the user to select a service category.", function () {
             //Need to test
        });
        it("the enter key is pressed, then the search criteria are submitted.", function () {
             //Need to test
        });
        it("the map is clicked and dragged, then it moves to reveal more nearby pins.", function () {
             //Need to test
        });

    });
	
    describe("As a user I want to select multiple service categories from a scolling list", function () {


        it("the drop down menu for services is selected, then there are 86 services to choose from", function () {
        	//won't work until we set up "ng-options"
        	var servicesList = element.all(by.repeater('option in options'));

        	expect(servicesList.count()).toEqual(86);
        });
        it("the drop down menu for services is selected, then there are 10 service categories to choose from", function () {
        	//won't work until we set up "ng-options"
        	var serviceCategories = element.all(by.repeater('optgroup in optgoups'));

        	expect(serviceCategories.count()).toEqual(10);
        });
        it("one service is selected, then the list of nearby service items are displayed as well as their corresponding pins on the map.", function () {
        	//helper function to select option from dropdown list
        	var selectDropdownbyNum = function ( element, optionNum ) {
			  	if (optionNum){
			    	var options = element.findElements(by.tagName('option'))   
			      	.then(function(options){
			        	options[optionNum].click();
			      	});
			  	}
			};
			expect(element(by.model('services')).$('option:checked').getText()).toEqual('Police Station');
        });
        it("multiple services are selected, the list of all these nearby service items are displayed simultaneously as well as their corresponding pins on the map.", function () {

        });
        it("multiple services are selected, the list of services are colour coded depending on their category and this colour coding is repeated on their pins on the map.", function () {

        });
        it("a selected service is unselected, its corresponding items and pins disappear from their corresponding displays.", function () {

        });

    });

    describe("As a user, I want to find contact information for service items so that I can contact them easily.", function () {


        it("a phone number is clicked on a mobile device, the number is dialled automatically.", function () {

        });
        it("the service name is clicked, the service's website is opened in a new tab or window.", function () {

        });

    });

}());