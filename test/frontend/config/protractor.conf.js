exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './test/frontend/acceptance/*.js'
  ],

  sauceUser: process.env.SAUCE_USERNAME ,

  sauceKey: process.env.SAUCE_ACCESS_KEY, 


  capabilities: {
    'browserName': 'chrome',
    'platform': 'ANY',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': 'App Tests'
  },

  baseUrl: 'http://0.0.0.0:8080/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};

