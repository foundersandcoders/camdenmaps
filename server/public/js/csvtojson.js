var fs = require('fs');

function csvJSON(err, csv){

    var lines=csv.split("\r");
    var result = [];
    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");

        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    console.log(headers);
    console.log(JSON.stringify(result));
}

fs.readFile('../../../prep/nearestservices.csv', 'utf8', csvJSON);