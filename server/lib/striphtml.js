;(function() {
    "use strict";

    module.exports = function(word) {
        return (typeof word === "undefined") ? undefined
            : word.replace(/<\/?[^>]+(>|$)/g, "");
    };

}());
