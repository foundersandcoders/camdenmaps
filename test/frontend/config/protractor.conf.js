exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './test/frontend/acceptance/*.js'
  ],
<<<<<<< HEAD

  sauceUser: process.env.SAUCE_USERNAME ,

  sauceKey: process.env.SAUCE_ACCESS_KEY, 

=======
  
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  
>>>>>>> dev
  capabilities: {
    'browserName': 'chrome',
    'platform': 'ANY',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': 'App Tests'
  },

<<<<<<< HEAD
  baseUrl: 'http://0.0.0.0:8080/',
=======
  baseUrl: 'http://0.0.0.0:9001/',
>>>>>>> dev

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};

