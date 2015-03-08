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


  sauceKey: process.env.SAUCE_ACCESS_KEY, 

  multiCapabilities: [
    {
      'browserName': 'chrome',
      'platform': 'ANY',
      'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'name': 'App Tests'
    }, 
    {
      'browserName': 'firefox',
      'platform': 'ANY',
      'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'name': 'App Tests'
    }, 
    // {
    //   'browserName': 'safari',
    //   'platform': 'ANY',
    //   'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
    //   'build': process.env.TRAVIS_BUILD_NUMBER,
    //   'name': 'App Tests'
    // }, 
    // {
    //   'browserName': 'internet explorer',
    //   'platform': 'ANY',
    //   'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
    //   'build': process.env.TRAVIS_BUILD_NUMBER,
    //   'name': 'App Tests'
    // }
  ],

  baseUrl: Config.path.main,

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    //Timeout 30min.
    defaultTimeoutInterval: 60 *1000 * 30,
    isVerbose: true
  },

  
};

