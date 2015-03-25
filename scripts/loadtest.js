var request = require("request");
var async = require("async");

var repLimit = 500;     //max number of concurrent requests
var timeLimit = 5000;  //in milliseconds
var stats = {};

function duvet (path, cb) {

  stats[path] = {};
  stats[path].times = [];
  stats[path].errors = 0;

  function makeRequest (cb) {

    var d = new Date().getTime();
    request("http://camdenmaps.herokuapp.com" + path, function(e, h) {

      var x = new Date().getTime();
      var responseTime = x - d;

      if(!e && (h.statusCode === 200)){
        stats[path].times.push(responseTime);
      } else {
        stats[path].errors += 1;
      }

      cb()

    });
  }


  function createTasks (reps) {

    var tasks = [];
    for(var i = 0; i < reps; i += 1) {

      tasks[i] = makeRequest;

    }

    return tasks
  }


  function execute (reps) {

    async.parallel(createTasks(reps), function() {

      var result;

      stats[path].mean = mean(stats[path].times);
      stats[path].p95 = p95(stats[path].times);

      console.log("\nMaking %s requests to %s", reps, path);
      console.log("Mean speed:", stats[path].mean);
      console.log("95th percentile:", stats[path].p95);

      console.log("\n-------------------------");

      if(stats[path].errors < 1 && stats[path].p95 < timeLimit && reps < repLimit) {
        return execute(reps+10);
      } else if(reps >= repLimit) {
        result = {};
        result[path] = "Max (over " + repLimit + ")";
        cb(null, result);

      } else {
        console.log(path, "tests failed at", (reps-10), "requests");
        result = {};
        result[path] = (reps-10);
        cb(null, result);
      }

    });

  }

  return execute(10);
}


async.series([
  function (cb) {
    duvet("/", cb);
  },
  function (cb) {
    duvet("/services/Library", cb);
  },
  function (cb) {
    duvet("/services/Post office/locations/well road", cb);
  }
], function(err, results) {
  console.log("\n-------------\n")
  console.log("Number of requests to degrade past acceptable limits:\n");

  results.forEach(function(r) {
    var prop = Object.keys(r)[0];
    console.log(prop + ":", r[prop])
  });

  console.log("\nAcceptable limits are 95% responses received in less than " + timeLimit + "ms");
});


function p95 (arr) {

  var subsect = Math.floor((arr.length/100)*95);
  arr = arr.slice(0, subsect);

  return mean(arr);

}

function mean (arr) {

  var sum;

  if(arr.length > 1) {
    sum = arr.reduce(function(a, b) {
      return a + b;
    });
    return sum / arr.length;

  } else {
    return "No data";
  }

}
