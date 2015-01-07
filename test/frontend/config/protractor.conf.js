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

  baseUrl: 'http://0.0.0.0:8080',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};

if (process.env.TRAVIS_BUILD_NUMBER) {
  config.seleniumAddress = 'http://localhost:4445/wd/hub';
  config.capabilities = {
    'username': process.env.SAUCE_USERNAME,
    'accessKey': process.env.SAUCE_ACCESS_KEY,
    'browserName': 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': 'App Tests'
  }
}
