;(function(){
    "use strict";

    var strip = require("./striphtml.js");

    if (!String.prototype.hasOwnProperty("contains")) {
      String.prototype.contains = function(str, startIndex) {
        return ''.indexOf.call(this, str, startIndex) !== -1;
      };
    }

    module.exports = function (obj) {
        var prop;
        for(prop in obj) {
            if(typeof obj[prop] === "string") {
                obj[prop] = strip(obj[prop]);
                if(!obj[prop].contains("http://") && obj[prop].indexOf("/") > -1) {
                    obj[prop] = obj[prop].replace(/\//g, " and ");
                }
            }
        }
        return obj;
    };

}());
