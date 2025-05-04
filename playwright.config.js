// @ts-check
const { defineConfig, devices } = require('@playwright/test');


var config =({
  testDir: './tests',
  timeout : 40*1000,
  expect : {timeout: 5000,},
  reporter: [['line'], ['allure-playwright']],
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'retain-on-failure',
  }

  
});
module.exports = config;
