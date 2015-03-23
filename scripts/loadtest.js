var benchrest = require("bench-rest");
var incrementAmount = 10;
var colors = require("colors");

function returnsAcceptableNumberOfResponses (numberOfErrors, speedStatistic) {
    var acceptableSpeed = 5000;
    var acceptableNumberOfErrors = 1;
    return (numberOfErrors <= acceptableNumberOfErrors &&
           speedStatistic <= acceptableSpeed);

}

var paths = ["/", "/services/Library", /*"/services/Library/locations/well%20road"*/];
var base = "http://camdenmaps.herokuapp.com";

var flow = {
    main: paths.map(function(p) {
        return {
            get: base + p
        }
    })
}

console.log(flow.main);

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
        console.log(("requests: " + runOpts.limit).yellow);
        console.log(("number of errors: " + errCount).red);
        console.log(("95% returned within: " + stats.main.histogram.p95).green);
        console.log("\n----------------------------------------------\n");
        if (returnsAcceptableNumberOfResponses(errCount, stats.main.histogram.p95)) {
            runOpts.limit += incrementAmount;
            runOpts.iterations += incrementAmount;
            runTests();
        } else {
            console.log("responses outside acceptable threshold");
            console.log(("failed at " + (runOpts.limit-10) + " requests").bgGreen.black);
        }
    });
}

runTests();
