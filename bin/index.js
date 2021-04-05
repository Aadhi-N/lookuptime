#!/usr/bin/env node

const processUserInput = require('./helpers');
const display = require('./utils.js');

const argv = process.argv.slice(2);

/* Executing async functions one by one */
const fetchDataPromise = (argv) => {
  processUserInput(argv)
  .then((formattedStr) => {
    return display.makeApiRequest(formattedStr)
  })
  .then((apiResponse) => {
    return display.listOfTimezones(JSON.parse(apiResponse.body));
  })
  .then((apiResponse) => {
    return display.timeZone(apiResponse);
  })
  .catch((reqFailedMsg) => {
    console.log(`Error: ${reqFailedMsg}`)
  })
}

fetchDataPromise(argv);
