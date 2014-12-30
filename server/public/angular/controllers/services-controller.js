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
        "menu",
        function ($scope, $location, menu) {
       
            /***************** MENU STATE VARIABLES ****************/

            //exposes current menu items to be displayed
            $scope.visibleItems = [];
            //current position in menu
            var currentPosition = 0, 
                currentCategory = getCurrentItems,
                currentIndex = 0,
                menuSize = 4;

            /***************** MENU POPULATION FUNCTIONS ****************/

            //loads current items based on current position
            function getCurrentItems (done) {
                currentCategory = menu.filter(function menuFilter (item) {
                    return item.parentId === currentPosition;
                });
                done(currentIndex);
            }

            //loads visible items
            function loadVisibleItems (start) {
                //loads first 4 items from current category into visible
                $scope.visibleItems = currentCategory.slice(start, start+menuSize);
                //adds click handlers to each visible item
                (function addClickHandlers (index) {
                    var item = $scope.visibleItems[index];
                    if (index > $scope.visibleItems.length) {
                        return;
                    }
                    item.handler = returnItemClickHandler(item);
                    addClickHandlers(index+1);
                }(0));
            }

            /***************** MENU CONTROL FUNCTIONS ****************/

            //returns click handler for menu items
            function returnItemClickHandler (item) {
                return function () {
                    var destination;
                    if (item.type === "service") {
                        destination = "/" + item.text + "/search";
                        $location.path(destination);
                    } else if (item.type === "category") {
                        currentIndex = 0;
                        currentPosition = item.id;
                        getCurrentItems(loadVisibleItems);
                    }
                }
            }
             
            //loads next items in menu   
            function nextItems () {
                if (currentIndex + menuSize > currentCategory.length) {
                    return;
                } else {
                    currentIndex += menuSize;
                    loadVisibleItems(currentIndex);
                }
            }

            //returns to previous category
            function backCategory () {
                currentPosition = currentCategory[0].parentId;
                getCurrentItems(loadVisibleItems);
            }
             
            //loads previous items in menu   
            function prevItems () {
                if (currentIndex - menuSize < 0) {
                    currentIndex = 0;
                    loadVisibleItems(currentIndex);
                } else {
                    currentIndex -= menuSize;
                    loadVisibleItems(currentIndex);
                }
            }

            //bind to next button
            $scope.next = nextItems;
            //bind to prev button
            $scope.prev = prevItems;
            //bind to back button
            $scope.back = backCategory;

        }
    ];

}());
