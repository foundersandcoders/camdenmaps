exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '../test/frontend/acceptance/*.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    'platform': 'ANY'
  },

  directConnect: true,

  baseUrl: 'http://0.0.0.0:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};

if (process.env.TRAVIS_BUILD_NUMBER) {
  exports.config.seleniumAddress = 'http://localhost:4445/wd/hub';
  exports.config.capabilities = {
    'username': process.env.SAUCE_USERNAME,
    'accessKey': process.env.SAUCE_ACCESS_KEY,
    'browserName': 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': 'App Tests'
  }
  exports.config.sauceUser = process.env.SAUCE_USERNAME;
  exports.config.sauceKey = process.env.SAUCE_ACCESS_KEY;
}
