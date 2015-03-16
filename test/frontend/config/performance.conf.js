var Config = require('../acceptance/config.js');


exports.config = {

  specs: [
    "../performance/performance.all.js"
  ],
 
 seleniumAddress: 'http://localhost:4444/wd/hub',
 
 capabilities: {'browserName' : 'chrome'},


  baseUrl: Config.path.main,

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    //Timeout 60min.
    defaultTimeoutInterval: 60 *1000 * 30 *2,
    isVerbose: true
  },

  
};

