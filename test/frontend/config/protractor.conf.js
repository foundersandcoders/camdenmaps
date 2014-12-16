exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '../test/frontend/acceptance/*.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    'platform': 'ANY'
  },

  chromeOnly: true,

  baseUrl: 'http://0.0.0.0:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
