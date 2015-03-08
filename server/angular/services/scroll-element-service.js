/*************************************
*   SCROLL ELEMENT SERVICE.JS
*
*************************************/

;(function () {
    "use strict";

    module.exports = [
        function () {

            this.toTop = function (outerElement, innerElement) {
                // console.log(innerElement);
                var activeItem = innerElement.position().top;

                outerElement.animate({
                    scrollTop: activeItem
                },500);  
            };

            this.stop = function (outerElement, innerElement) {
                // console.log(innerElement);
                var activeItem = innerElement.position().top;
                // console.log(activeItem);
                outerElement.animate({
                    scrollTop: activeItem
                },500);  
            };
        }
    ];

})();
