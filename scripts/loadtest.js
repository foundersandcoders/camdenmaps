var benchrest = require("bench-rest");
var incrementAmount = 10;

function returnsAcceptableNumberOfResponses (numberOfErrors, speedStatistic) {
    var acceptableSpeed = 5000;
    var acceptableNumberOfErrors = 1;
    return (numberOfErrors <= acceptableNumberOfErrors &&
           speedStatistic <= acceptableSpeed);

}

var flow = {
    main: [
        {get: "http://camdenmaps.herokuapp.com/"},
        {get: "http://camdenmaps.herokuapp.com/services/Lunch club"},
        {get: "http://camdenmaps.herokuapp.com/services/Lunch club/locations/nw1 0ne"},
        {get: "http://camdenmaps.herokuapp.com/services/Lunch club/locations/well road"}
    ]
}

var runOpts = {

    limit: 10,
    iterations: 10

};

function runTests(){

    benchrest(flow, runOpts)
    .on("error", function(err, ctxName) {
        console.log("Failed in %s with err:", ctxName, err);
    })
    .on("end", function(stats, errCount) {
        console.log("requests:", runOpts.limit);
        console.log("number of errors: ", errCount);
        console.log("95% returned within: ", stats.main.histogram.p95);
        if (returnsAcceptableNumberOfResponses(errCount, stats.main.histogram.p95)) {
            runOpts.limit += incrementAmount;
            runOpts.iterations += incrementAmount;
            runTests();
        } else {
            console.log("responses outside acceptable threshold");
            console.log("failed at", runOpts.limit-10, "requests");
        }
    });
}

runTests();
