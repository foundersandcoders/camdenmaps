/*******************************************
*   SERVICES-CONTROLLER.JS
*
*
********************************************/

//TODO: Write menu JSON
//TODO: Write service to access menu
//TODO: Preload visible items in a resolve

;(function () {
    "use strict";

    module.exports = [
            "$scope",
            "$location",
            function ($scope, $location) {
         

                //***************** Initialize menu and variables **************
               
                //Put in state object

                //current index of visibleItems within currentCategory
                var currentIndex = 0, 
                //number of items visible in menu
                    numberOfItems,
                //current position in the menu
                    currentPosition = 0,
                //all items in current category
                    currentCategory = [],
                //stores full menu
                    menu = [],
                //allows back from services to return to relevant categories page
                    parentIndex = 0;
                //stores currently visible items
                $scope.visibleItems = [];
                //used to hide/show back/next button on menu
                $scope.page = currentIndex;

               
                //****************** Menu population functions ***************** 

                function getWindowWidth () {

                    if(window.innerWidth < 768) {
                        return numberOfItems = 3;
                    } else if((window.innerWidth < 1200) && (window.innerWidth >=768)) {
                        return numberOfItems = 4;
                    } else {
                        return numberOfItems = 6;
                    }

                };

                $scope.$watch(getWindowWidth());

                
                //makes visible numberOfItems items from current category
                function getVisibleItems (index) {
                    $scope.visibleItems = currentCategory[index];
                    $scope.lastPage = currentCategory.length-1;
                }
                
                //handler that either redirects user or opens new category 
                //use encode URI and decode URI
                function clickHandler (item) {
                    if (item.type === "service") {
                        var service = encodeURIComponent(item.title + item.text);
                        var path = "/home/" + service + "/search";
                        $location.path(path);
                    } else if (item.type === "category") {
                        //sets parentIndex so will return to page with parent category on
                        parentIndex = currentIndex;
                        //resets page number for services listed
                        currentIndex = 0;
                        //updates so ng-show works for next/previous buttons
                        $scope.page = currentIndex;
                        currentPosition = item.id;
                        getCurrentCategory(currentPosition, numberOfItems);
                        getVisibleItems(currentIndex);
                    }
                };
                
                //adds click handler functions to menu items
                function addClickHandler (item) {
                    return function () {
                        clickHandler(item);
                    };
                }
                
                //populates currentCategory with items in current position in menu
                function getCurrentCategory(positionInMenu, amountPerPage) {
                    currentCategory = [];
                    var fullCategory = menu.filter(function (item) {
                        return Number(item.parentId) === Number(positionInMenu);
                    });
                    var i, index = 0;
                    for (i = 0; i < fullCategory.length; i += 1) {
                        if (i && i % amountPerPage === 0) {
                            index = i / amountPerPage;
                            currentCategory[index] = [];
                        } else if (!i) {
                            currentCategory[index] = [];
                        }
                        fullCategory[i].handler = addClickHandler(fullCategory[i]);
                        currentCategory[index].push(fullCategory[i]);
                    }
                }
              
                menu = require("../menu.json");
                getCurrentCategory(currentPosition, numberOfItems);
                getVisibleItems(currentIndex); 
                
                //********************* Menu control functions ******************
                
                //loads next page of items
                $scope.nextItems = function nextItems () {
                    if (currentIndex === currentCategory.length-1) {
                        return;
                    } else {
                        currentIndex += 1;
                        //updates to ensure ng-show works for next/previous buttons
                        $scope.page = currentIndex;
                        getVisibleItems(currentIndex);
                    }
                };
                //loads previous page of items
                $scope.prevItems = function prevItems () {
                    if (currentIndex === 0) {
                        return;
                    } else {
                        currentIndex -= 1;
                        //updates to ensure ng-show works for next/previous buttons
                        $scope.page = currentIndex;
                        getVisibleItems(currentIndex);
                    }
                };
                //loads parent category
                $scope.backOneCategory = function backOneCategory () {
                    if (Number(currentPosition) === 0) {
                        $location.path("/home");
                    } else {
                        currentPosition = menu.filter(function(item){
                            return Number(item.id) === Number(currentPosition);
                        })[0].parentId;
                        getCurrentCategory(currentPosition, numberOfItems);
                        //this will return to the parent categories correct page on menu
                        getVisibleItems(parentIndex);
                        //this will reset the page numbers to the relevant parent page on menu
                        $scope.page = currentIndex = parentIndex;
                    }
                };
                //execute function to solve scoping issues with ng-repeat & ng-click
                $scope.execute = function execute (fn) {
                    fn();
                }; 

            }
        ];

}());
