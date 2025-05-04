// @ts-check
const { defineConfig, devices } = require('@playwright/test');


var config =({
  testDir: './tests',
  timeout : 20*1000,
  expect : {timeout: 5000,},
  reporter: 'html',
  retries:1,
  worker:3,
  projects: [
    {
      name: 'chrome',
      use: {
        browserName : 'chromium',
        headless : false,
        screenshot : 'on',
        video : 'retain-on-failure',
        trace : 'on',
        ignoreHttpsErrors:true,
        permissions : ['geolocation'],
        //viewport:{width:720,height:720}
        
          }
    },
    {
      name: 'safari',
      use: {
        browserName : 'webkit',
        headless : true,
        screenshot : 'only-on-failure',
        trace : 'retain-on-failure',
        //...devices['iPhone 14'] 
      }
    },
  ]
  

  
});
module.exports = config;
