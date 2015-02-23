module.exports = function addressdb (json) {
    "use strict";

    var that = {};


    that.search = function search (searchTerm, cb) {
        var expression, results, address, error;
        expression = new RegExp(searchTerm, "i");
    
        results = json.filter(function(item) {
            address = [item.Unit, item.BuildingName, item.BuildingNumber, item.Street,
                item.Town, item.Postcode].join(" ");
            return expression.test(address);
        });

        if (results.length > 0) {
            return cb(null, results);
        } else {
            error = new Error();
            error.status = "Search not found";
            error.message = "Sorry, could not find any matches";
            return cb(error);
        }
    };


    return that;
};
