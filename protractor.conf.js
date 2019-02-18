module.exports.config = {
  specs: ['test/**/*.e2e.js', 'src/Search/*.e2e.js'],
  baseUrl: `http://localhost:6006/`,
  jasmineNodeOpts: { defaultTimeoutInterval: 120000 },
  onPrepare() {
    browser.ignoreSynchronization = true;
  },
};
