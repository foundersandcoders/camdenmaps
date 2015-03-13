/*************************************
*   COLLAPSE WIDTH DIRECTIVE.JS
*	
*************************************/

;(function () {
    "use strict";

    module.exports = [
        "$transition", 
        "$timeout", 
        "$window",
        function ($transition, $timeout, $window) {

            return {
                link: function (scope, element, attrs) {

                    // Ensure loading of element is still 100% of page.
                    if (screen.width < 768) {
                        var catContainer = $("#category-title-of-services");
                        catContainer.width($window.innerWidth);
                    

                        var initialAnimSkip = true;
                        var currentTransition;
                        var fullWidth = $window.innerWidth;
                        element.css("width", fullWidth);
                    }

                    function doTransition(change) {
                        var newTransition = $transition(element, change);
                        if (currentTransition) {
                            currentTransition.cancel();
                        }
                        currentTransition = newTransition;
                        newTransition.then(newTransitionDone, newTransitionDone);
                        return newTransition;

                        function newTransitionDone() {
                            // Make sure it's this transition, otherwise, leave it alone.
                            if (currentTransition === newTransition) {
                                currentTransition = undefined;
                            }
                        }
                    }

                    function expand() {
                        if (initialAnimSkip) {
                            initialAnimSkip = false;
                            expandDone();
                        } else {
                            element.removeClass("collapse").addClass("collapsing-width");
                            doTransition({ width: fullWidth + "px" }).then(expandDone);
                        }
                    }

                    function expandDone() {
                        element.removeClass("collapsing-width");
                        element.addClass("collapse in");
                        element.css({width: "auto"});
                    }

                    function collapse() {
                        if (initialAnimSkip) {
                            initialAnimSkip = false;
                            collapseDone();
                            element.css({width: 0});
                        } else {
                            element.css({ width: fullWidth + "px" });
                            var x = element[0].offsetHeight;
                            element.removeClass("collapse in").addClass("collapsing-width");
                            doTransition({ width: 0 }).then(collapseDone);
                        }
                    }

                    function collapseDone() {
                        element.removeClass("collapsing-width");
                        element.addClass("collapse");
                    }

                    scope.$watch(attrs.collapseWidth, function (shouldCollapse) {
                        if (shouldCollapse) {
                            collapse();
                        } else {
                            expand();
                        }
                    });
                }
            };
        }
    ];
}());
