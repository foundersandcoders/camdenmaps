var Config = require('../acceptance/config.js');
var creds = require('./sauce.conf.json');


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

  sauceUser: creds.uname,

  sauceKey: creds.aKey,


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
    {
      'browserName': 'Safari',
      'platform': 'OS X 10.8',
      'version': '6.0',
      'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'name': 'App Tests'
    }, 
    {
      'browserName': 'internet explorer',
      'platform': 'Windows XP',
      'version': '8.0',
      'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'name': 'App Tests'
    },   
    {
      'browserName': 'internet explorer',
      'platform': 'Windows 7',
      'version': '9.0',
      'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'name': 'App Tests'
    },
    {
      'browserName': 'internet explorer',
      'platform': 'Windows 7',
      'version': '10.0',
      'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'name': 'App Tests'
    },
    {
      'browserName': 'internet explorer',
      'platform': 'Windows 7',
      'version': '11.0',
      'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'name': 'App Tests'
    }
  ],

  baseUrl: Config.path.main,

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    //Timeout 60min.
    defaultTimeoutInterval: 60 *1000 * 30 *2,
    isVerbose: true
  },

  
};

