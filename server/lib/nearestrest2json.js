var xml2js = require('xml2js');
var request = require('request');
var host = 'http://maps.camden.gov.uk';
var path = '/nearest/nearestrest.aspx?area=nw1%200ne&find=library';

var parser = new xml2js.Parser();

console.log(host+path);

var response = {};
response.properties = [];

request(host+path, function(err, res, body){
// console.log(body);
  parser.parseString(body, function (err, result) {
    // console.log(result.Locations.Properties[0].Property);
    response.location = result.Locations.AddressSearchResults[0]['$'];
    result.Locations.Properties[0].Property.map(function(p){
      var formatProperty = p['$'];
      formatProperty.display = p.PoI[0]['$']
      response.properties.push(formatProperty);
    });
    console.dir(response);
    console.log('Done');
  });
});
