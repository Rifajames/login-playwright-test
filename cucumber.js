module.exports = {
  default: {
    require: ['features/step-definitions/*.js', 'support/hooks.js'],
    format: ['html:reports/cucumber_report.html'],
    tags: '@positive or @negative', // default semua tag, bisa override via CLI
    timeout: 60000
  }
};