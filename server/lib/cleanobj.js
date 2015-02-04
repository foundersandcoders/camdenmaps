;(function(){
    "use strict";

    var strip = require("./striphtml.js");

    module.exports = function (obj) {
        var prop;
        for(prop in obj) {
            if(typeof obj[prop] === "string") {
                obj[prop] = strip(obj[prop]);
                obj[prop] = obj[prop].replace("/", " and ");
            }
        }
        return obj;
    }

}());
