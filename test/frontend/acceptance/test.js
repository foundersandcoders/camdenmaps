/*************************************************
*   test.js
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
**************************************************/

/************************************************
*    Landing Tests go Here
*************************************************/
(function () {
    "use strict";

    describe("As a user, I want to have clear call to actions when I arrive on the landing page", function () {

        it("title to be Camden Council: Find Your Nearest", function() {

            browser.get('#/home');

            var title = browser.getTitle();

            expect(title).toEqual('Camden Council: Find Your Nearest');

        });
        describe("There are three call to actions with icons, ", function() {

            it("Find your nearest, ", function () {
                
                var nearestText = element(by.id('findYourNearest')).getText();
                
                expect(nearestText).toEqual('Find Your Nearest');
            });
            it("About Your Neighbourhood, ", function () {

                var neighbourhoodText = element(by.id('aboutYourNeighbourhood')).getText();
                
                expect(neighbourhoodText).toEqual('About Your Neighbourhood');
            });
            it("and Live Streetworks", function () {

                var streetworksText = element(by.id('liveStreetworks')).getText();
                
                expect(streetworksText).toEqual('Live Streetworks');
            });

        });
        it("The header includes Camden Logo and correct alternate text", function() {

            var logo = element(by.id('camden-logo'));
            var alt = logo.getAttribute("alt");

            expect(logo.isDisplayed()).toBe(true);
            expect(alt).toBe('Camden');
        });
        it("page loads, the map renders", function() {

            var leaflet = element(by.css('.leaflet-tile'));

            expect(leaflet.isDisplayed()).toBe(true);

        });
    });


/**********************************************
*   Service and Service Category Tests
***********************************************/

    describe("As a user, I want to find a specific service ", function () {

        describe("Find Your Nearest option is clicked", function () {
            it("section is revealed", function () {

                browser.get('#/home');

                element(by.id('findYourNearest')).click();    
                expect(element(by.id('find-your-nearest')).isDisplayed()).toBe(true);
            });

            it("with 11 service categories, only 3 visible", function () {

                var serviceCategories = element.all(by.repeater('item in visibleItems'));

                expect(serviceCategories.count()).toBe(3);
            });
        });

        describe("navigation arrows are functioning:", function () {
            it("back arrow ", function () {

                var serviceCategories = element(by.repeater('item in visibleItems'));
                var text = serviceCategories.element(by.tagName('h4')).getText();

                element(by.css('[ng-click="execute(item.handler)"]')).click();
                element(by.css('[ng-click="backOneCategory()"]')).click();

                var serviceCategories2 = element(by.repeater('item in visibleItems'));
                var text2 = serviceCategories.element(by.tagName('h4')).getText();

                expect(text).toEqual(text2);

            });
            it("and carousal arrows", function () {

                var firstServiceCategories = element(by.repeater('item in visibleItems')).element(by.tagName('h4')).getText();
                element(by.css('[ng-click="nextItems()"]')).click();
                var secondServiceCategories = element(by.repeater('item in visibleItems')).element(by.tagName('h4')).getText();

                expect(firstServiceCategories).not.toEqual(secondServiceCategories);

                element(by.css('[ng-click="prevItems()"]')).click();
                var thirdServiceCategories = element(by.repeater('item in visibleItems')).element(by.tagName('h4')).getText();

                expect(firstServiceCategories).toEqual(thirdServiceCategories);
            });
        });
        describe("Once a service is selected", function () {

            it("first step options disappear", function () { 

                element(by.css('[ng-click="execute(item.handler)"]')).click();
                element(by.css('[ng-click="execute(item.handler)"]')).click();

                expect(element(by.id('first-level-options')).isPresent()).toBe(false);
            });
            it("name of selected service with icon are displayed", function () { 

                var container = element(by.id('address-search'));

                var imgsrc = container.element(by.tagName('img')).getAttribute("ng-src");
                var text = container.element(by.tagName('h2')).getText();

                expect(imgsrc).toEqual("../img/nearestservice/lunchclub.png");
                expect(text).toEqual("Lunch club");
            });
            it("input field and search button are displayed", function () { 

                var postcodeInput = element(by.id('postcode-input')).element(by.tagName('input'));

                expect(postcodeInput.isPresent()).toBe(true);
            });
            it("search again and list results buttons are displayed", function () { 

                var buttons = element.all(by.tagName('button')).getText();

                expect(buttons).toEqual(['', 'Search again', 'List results']);
            });
        });

        it("When Search again button is clicked, you go back to the beginning", function () { 

            element(by.css('[ng-click="searchAgain()"]')).click();

            expect(browser.getCurrentUrl()).toContain('/#/home');
        });
        it("When List Results button is clicked, results list.", function () { 

            element(by.id('findYourNearest')).click();
            element(by.css('[ng-click="execute(item.handler)"]')).click();
            element(by.css('[ng-click="execute(item.handler)"]')).click();
            - element(by.css('[ng-click="toggle()"]')).click();

            var listResults = element(by.id('list-results'));
            var repeater = element.all(by.repeater('result in results'));

            expect(listResults.isPresent()).toBe(true);
            expect(repeater.count()).toBe(24);
        });
        it("When a list item is selected, single list result view is displayed", function () { 

            element(by.repeater('result in results')).click();

            expect(element(by.css('.result')).isPresent()).toBe(true);
        });
	});

/**********************************************
*   After service is selected tests
***********************************************/
    describe("As a user, I want to enter a postcode to search the closest results from me", function () {

        describe ("given a valid camden postcode is entered", function () {

            describe("list button is clicked and ", function () {
                it("items list is displayed with distances", function () {

                    var postcodeInput = element(by.id('postcode-input')).element(by.tagName('input'));

                    postcodeInput.sendKeys('NW1 0NE');
                    element(by.css('[ng-click="search()"]')).click();
                    element(by.css('[ng-click="toggle()"]')).click();

                    var listResults = element(by.id('list-results'));
                    var repeater = element.all(by.repeater('result in results'));
                    var text = element(by.css('.distance')).getText();

                    expect(listResults.isPresent()).toBe(true);
                    expect(repeater.count()).toBe(24);
                    expect(text).toEqual('0.49 miles');
                });
                it("items list is displayed with distance", function () {

                    element(by.repeater('result in results')).click();

                    expect(element(by.css('.result')).isPresent()).toBe(true);
                });
            });
        });

    });
//Above needs to be tested with street addresses and area codes as well


/**********************************************
*   Single Result tests
// ***********************************************/
//     describe("As a user, I want to find contact information for service items so that I can contact them easily.", function () {
        
//         it("an item in the list of nearby services is clicked, then the map is centered on the corresponding pin and its information box opens.", function () {
//             //Need to test
//         });
//         it("a pin on the map is clicked, then the map centres the pin on the map and highlights it in the list and displays its information box the on map.", function () {
//             //Need to test
//         });
//         it("the information box is displayed, then it contains contains its information for example: phone number, website, description, opening hours, (?).", function () {
//              //Need to test
//         });
//         it("if the phone icon is clicked on a mobile device, the number is dialled automatically.", function () {

//         });
//         it("if the website icon is clicked, the service's website is opened in a new tab or window.", function () {

//         });
//         it("if the travel icon is clicked, google is opened in a new tab or window.", function () {

//         });

//     });

}());