var Config = require('../config/testConfig.js');


exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    './test/frontend/acceptance/categories.e2e.js'
  ],

  sauceUser: process.env.SAUCE_USERNAME ,

  sauceKey: process.env.SAUCE_ACCESS_KEY, 

  capabilities: {
    'browserName': 'chrome',
    'platform': 'ANY',
    'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': 'App Tests'
  },

  baseUrl: Config.path.main,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
  
};

