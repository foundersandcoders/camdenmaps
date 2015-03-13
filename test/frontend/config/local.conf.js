var Config = require('../acceptance/config.js');


exports.config = {

  specs: [
    // Desktop Tests below
        '../acceptance/desktop/landing.e2e.js',
        '../acceptance/desktop/services/categories.e2e.js',
        '../acceptance/desktop/services/services.e2e.js',
        '../acceptance/desktop/streetworks/streetworks.e2e.js',
        '../acceptance/desktop/neighbourhood/neighbourhood.e2e.js',
    // Mobile Tests below
        '../acceptance/mobile/landing.e2e.js',
        '../acceptance/mobile/services/categories.e2e.js',
        '../acceptance/mobile/services/services.e2e.js'
  ],

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