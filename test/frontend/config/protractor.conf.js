exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '../test/frontend/acceptance/*.js'
  ],

  capabilities: {
    'browserName': 'firefox',
    'platform': 'ANY'
  },

  directConnect: true,

  baseUrl: 'http://0.0.0.0:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
