var Config = require('../acceptance/config.js');


exports.config = {

  capabilities: {
    'browserName': 'chrome',
    'platform': 'ANY',
    'name': 'App Tests'
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