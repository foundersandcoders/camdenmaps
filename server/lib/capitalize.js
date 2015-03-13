;(function() {
    "use strict";

    //capitalize first letter of word (norm
    module.exports = function cap(word) {
        if(typeof word === "string") {
            return word[0].toUpperCase() + word.substring(1, word.length).toLowerCase();
        } else {
            return word;
        }
    };

}());

