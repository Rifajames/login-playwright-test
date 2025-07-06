const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  metadata: {
    browser: {
      name: 'chrome',
      version: '113',
    },
    device: 'Local Test Machine',
    platform: {
      name: 'Windows',
      version: '11',
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Login Automation' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cycle', value: 'Regression' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
    ],
  },
});