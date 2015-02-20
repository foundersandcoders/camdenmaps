var fs = require('fs'),
    srcPath = 'prep/Camden LPG Extract 20150216.csv',
    savePath = 'server/lib/address.json';

fs.readFile(srcPath, 'utf8', function (err, csv){

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

    var data = JSON.stringify(result, null, 4)

    fs.writeFile(savePath, data, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("JSON saved to " + savePath);
        }
    });
});
