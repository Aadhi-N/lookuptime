#!/usr/bin/env node

const https = require('https');
const argv = process.argv.slice(2);


//Makes https request to API
function apiRequest(argv, callback) {
  https.get(`https://worldtimeapi.org/api/timezone/${argv}` , (res) => {
    res.on('data', (fetchedApiData) => {
      // process.stdout.write(fetchedApiData);
      console.log("fetched data... printing to console")
      callback(JSON.parse(fetchedApiData.toString()));
    });
  }).on('error', (e) => {
    console.error(e);
  })
}

// Prints to console
function printLocalTime() {
  const timeZoneLocation = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const cityName = timeZoneLocation.substring(timeZoneLocation.indexOf("/") + 1);
  const timeZoneAbbr= new Date().toLocaleTimeString('en-us',{timeZoneName:'short'});
  console.log("Fetching local time...")
  console.log(`Your local time in ${cityName} is ${timeZoneAbbr}.\n\nUse the following commands to compare timezones:...`)
}


function fetchGlobalTime(argv, callback) {
  console.log(`Fetching current time in ${argv[0]}...`)
  apiRequest(argv[0], callback)
}

function printToConsole(result) {
  console.log(`The time in ${result.timezone} is ${result.unixtime}.`)
}

// printLocalTime()
fetchGlobalTime(argv, printToConsole)