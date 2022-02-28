const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');

if (fs.readdirSync('./cypress/cucumber-json').length > 0) {
  report.generate({
    ignoreBadJsonFile: true,
    jsonDir: './cypress/cucumber-json',
    reportPath: './cypress/cucumber-report'
  });
}
