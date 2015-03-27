/*************************************
*   VALIDATE SERVICE.JS
*
*************************************/
var menu = require("../menu.json");

;(function () {
    "use strict";

    module.exports = [
        "$http",
        function ($http) {

            this.service = function (service) {

                var match = menu.filter(function (item) {
                    return item.title.toLowerCase() === service.toLowerCase();
                });
                return (match.length >= 1);
            };

            this.checkValidAddress = function (address, cb) {

               return $http.get("/uprn/" + address)
                    .success(function (res) {
                        return cb(!!res);
                    })
            }

            this.isWithinCamden = function (latitude, longitude) {
                //coordinates represent a square around Camden to roughly test if location is inside boundary
                if((51.590 > latitude && latitude > 51.495) && (-0.0750 > longitude && longitude > -0.255)) {
                    return true;
                } else {
                    return false;
                }
            };

            //this will capitalise street addresses
            //and upper case postcodes
            this.cleanDisplayAddress = function (address) {
                var displayAddress = (address.replace(/\s/g, "").length < 7)
                                    ? address.toUpperCase()
                                    : address.replace(/\b./g, function(m){ return m.toUpperCase()});

                return displayAddress;
            };

            this.roundDistances = function (distance) {
                return (Math.floor( (Number(distance) + 0.05) * 10 )) /10;
            };

            this.isNewPostcode = function (postcode) {
                var newPostcodes = ["EC1M 5BU", "EC1N 2NU", "EC1N 8AF", "EC1N 8AS", "EC1N 8CB", "EC1N 8DB", "EC1N 8JP", "EC1N 8LG", "EC1R 5AD", "EC1R 5LQ", "N1 0AS", "N1 0FF", "N1 9AQ", "N1C 1FA", "N1C 4AA", "N1C 4AB", "N1C 4AD", "N1C 4AE", "N1C 4AF", "N1C 4AH", "N1C 4AJ", "N1C 4AL", "N1C 4AN", "N1C 4AP", "N1C 4AQ", "N1C 4AR", "N1C 4AS", "N1C 4AT", "N1C 4AW", "N1C 4AY", "N1C 4BD", "N1C 4BE", "N1C 4BF", "N1C 4BG", "N1C 4BN", "N1C 4BP", "N1C 4BQ", "N1C 4BR", "N1C 4BS", "N1C 4BT", "N1C 4PF", "N1C 4PL", "N1C 4PN", "N1C 4PP", "N1C 4PW", "N1C 4QL", "N1C 4QP", "N1C 4TB", "N1C 4UR", "N1C 4UZ", "N1C 4WH", "N6 4JX", "N7 9GY", "NW1 0NT", "NW1 0NT", "NW1 0NY", "NW1 0PX", "NW1 0QR", "NW1 1ND", "NW1 1PZ", "NW1 2AR", "NW1 2AS", "NW1 2AT", "NW1 2AW", "NW1 2AY", "NW1 2BD", "NW1 2BN", "NW1 2FA", "NW1 2FE", "NW1 2LJ", "NW1 2LT", "NW1 2NS", "NW1 2NU", "NW1 2PN", "NW1 2QB", "NW1 2RD", "NW1 3AF", "NW1 3BF", "NW1 3BR", "NW1 3DE", "NW1 3DF", "NW1 3DL", "NW1 3DS", "NW1 3FA", "NW1 3FE", "NW1 3FF", "NW1 3FG", "NW1 3FN", "NW1 3LA", "NW1 3NY", "NW1 3SU", "NW1 4DZ", "NW1 7AL", "NW1 7EL", "NW1 7JU", "NW1 7LS", "NW1 8DZ", "NW1 8EQ", "NW1 8EZ", "NW1 8QZ", "NW1 9DF", "NW1 9DG", "NW1 9DJ", "NW1 9QZ", "NW3 1HQ", "NW3 1QR", "NW3 2BJ", "NW3 2DL", "NW3 2DU", "NW3 2FU", "NW3 2PX", "NW3 2QA", "NW3 2QW", "NW3 2YL", "NW3 3BR", "NW3 4PT", "NW3 4QN", "NW3 5TG", "NW3 6JN", "NW3 6NA", "NW3 6NW", "NW3 7AY", "NW3 7BE", "NW3 7BP", "NW3 7SZ", "NW5 1BE", "NW5 1BF", "NW5 1BH", "NW5 1BS", "NW5 1RS", "NW5 1TB", "NW5 2BG", "NW5 2DA", "NW5 2EQ", "NW5 3AW", "NW5 3EQ", "NW5 3EZ", "NW5 3NH", "NW5 3NN", "NW5 3PX", "NW5 4AA", "NW5 4AD", "NW5 4AE", "NW5 4BD", "NW5 4NJ", "NW5 4QD", "NW6 1AQ", "NW6 1DF", "NW6 1DW", "NW6 1LW", "NW6 2HU", "NW6 2LR", "NW6 4BF", "NW6 5HX", "NW8 7EB", "NW8 7ED", "NW8 7EF", "W1T 1DA", "W1T 1EP", "W1T 1EY", "W1T 1QN", "W1T 1UY", "W1T 2AB", "W1T 2AS", "W1T 2AT", "W1T 2BT", "W1T 2BX", "W1T 2BY", "W1T 2LN", "W1T 2LN", "W1T 2PA", "W1T 4EG", "W1T 4HA", "W1T 4RF", "W1T 4RS", "W1T 5BB", "W1T 5BD", "W1T 5BQ", "W1T 5DF", "W1T 5EL", "W1T 5EU", "W1T 5JD", "W1T 5LB", "W1T 6AW", "W1T 6AX", "W1T 6BR", "W1T 6EH", "W1T 6ET", "W1T 6LR", "W1T 7HH", "W1T 7LG", "W1T 7QE", "W1T 7RH", "W1T 7RQ", "WC1A 1AD", "WC1A 1AW", "WC1A 1BU", "WC1A 1JP", "WC1A 1NQ", "WC1A 1PP", "WC1A 2SL", "WC1B 1NN", "WC1B 3BS", "WC1B 3HL", "WC1B 3RJ", "WC1B 4JY", "WC1B 5AH", "WC1B 5JL", "WC1B 5JR", "WC1E 6AG", "WC1E 6AQ", "WC1E 7HY", "WC1E 7JD", "WC1E 7JH", "WC1H 0AQ", "WC1H 0HS", "WC1H 0PF", "WC1H 0QP", "WC1H 8AD", "WC1H 8AH", "WC1H 8AQ", "WC1H 9PS", "WC1H 9RR", "WC1H 9RR", "WC1H 9UT", "WC1N 1AU", "WC1N 1DF", "WC1N 1NB", "WC1N 2EA", "WC1N 2JR", "WC1N 3DE", "WC1N 3EJ", "WC1N 3HD", "WC1N 3HQ", "WC1N 3NL", "WC1R 4JL", "WC1R 4PP", "WC1R 4QB", "WC1R 4QL", "WC1R 4QN", "WC1V 6AN", "WC1V 6JD", "WC1V 6LQ", "WC1V 6NS", "WC1V 6TT", "WC1V 7BE", "WC1V 7LS", "WC1X 8AP", "WC1X 8AU", "WC1X 8BJ", "WC1X 8NF", "WC1X 8UP", "WC1X 8US", "WC1X 9AH", "WC1X 9AQ", "WC1X 9AY", "WC1X 9BB", "WC1X 9BF", "WC1X 9JJ", "WC1X 9JL", "WC1X 9JP", "WC1X 9LL", "WC1X 9LQ", "WC1X 9LS", "WC1X 9NU", "WC2A 2JG", "WC2A 3AB", "WC2A 3BA", "WC2A 3LS", "WC2A 3RH", "WC2A 3SH", "WC2A 3SJ", "WC2A 3TJ", "WC2A 3UB", "WC2B 5PW", "WC2B 5RJ", "WC2B 5RS", "WC2B 6EN", "WC2B 6JX", "WC2B 6PQ", "WC2H 8AB", "WC2H 8AG", "WC2H 8AJ", "WC2H 8JH", "WC2H 8JS", "WC2H 9HT"]
                
                if (newPostcodes.indexOf(postcode) > -1 ) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ];

})();
