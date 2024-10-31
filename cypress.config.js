const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://cypress-playground.s3.eu-central-1.amazonaws.com',
    experimentalStudio:true,
    setupNodeEvents(on, config) {},}
  //env: {MAILOSAUR_API_KEY: "your-key-here"}
});
