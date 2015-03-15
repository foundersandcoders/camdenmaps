var Config = require('../acceptance/config.js'),
    Sauce = require("./sauce.conf.json");


exports.config = {

  specs: [
    "./performance.all.js"
  ],

  sauceUser: Sauce.uname,

  sauceKey: Sauce.aKey, 


  capabilities: {
    "browserName": "chrome"
  },


  baseUrl: Config.path.main,

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    //Timeout 60min.
    defaultTimeoutInterval: 60 *1000 * 30 *2,
    isVerbose: true
  },

  
};

