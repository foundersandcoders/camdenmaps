var Config = require("../acceptance/config.js");
var creds = require("./sauce.conf.json");


exports.config = {

  sauceUser: creds.uname,

  sauceKey: creds.aKey,

  multiCapabilities: [
    {
      "browserName": "chrome",
      "platform": "ANY",
      "tunnel-identifier": (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
      "build": process.env.TRAVIS_BUILD_NUMBER,
      "name": "App Tests",
      //Three hours
      "max-duration": 10800
    }, 
    // {
    //   "browserName": "firefox",
    //   "platform": "ANY",
    //   "tunnel-identifier": (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
    //   "build": process.env.TRAVIS_BUILD_NUMBER,
    //   "name": "App Tests",
    //  "max-duration": 10800
    // }, 
    // {
    //   "browserName": "Safari",
    //   "platform": "OS X 10.8",
    //   "version": "6.0",
    //   "tunnel-identifier": (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
    //   "build": process.env.TRAVIS_BUILD_NUMBER,
    //   "name": "App Tests",
    //  "max-duration": 10800
    // }, 
    // {
    //   "browserName": "internet explorer",
    //   "platform": "Windows XP",
    //   "version": "8.0",
    //   "tunnel-identifier": (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
    //   "build": process.env.TRAVIS_BUILD_NUMBER,
    //   "name": "App Tests",
    //  "max-duration": 10800
    // },   
    // {
    //   "browserName": "internet explorer",
    //   "platform": "Windows 7",
    //   "version": "9.0",
    //   "tunnel-identifier": (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
    //   "build": process.env.TRAVIS_BUILD_NUMBER,
    //   "name": "App Tests",
    //  "max-duration": 10800
    // },
    // {
    //   "browserName": "internet explorer",
    //   "platform": "Windows 7",
    //   "version": "10.0",
    //   "tunnel-identifier": (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
    //   "build": process.env.TRAVIS_BUILD_NUMBER,
    //   "name": "App Tests",
    //  "max-duration": 10800
    // },
    // {
    //   "browserName": "internet explorer",
    //   "platform": "Windows 7",
    //   "version": "11.0",
    //   "tunnel-identifier": (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
    //   "build": process.env.TRAVIS_BUILD_NUMBER,
    //   "name": "App Tests",
    //  "max-duration": 10800
    // }
  ],

  baseUrl: Config.path.main,

  framework: "jasmine",

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 1000 *60 * 60 *2,
    isVerbose: true
  },
};
