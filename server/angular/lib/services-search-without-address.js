;(function(){
    "use strict";

   module.exports = function servicesSearchWithoutAddress(path){
        var url = path,
            streetworks = (url.indexOf("streetworks") > -1),
            neighbourhood = (url.indexOf("neighbourhood") > -1),
            location = (url.indexOf("location") > -1),
            search = (url.indexOf("search") > -1);

        if(search && !streetworks && !neighbourhood && !location) {
            return true;
        } else {
            return false;
        }

    };
}());


