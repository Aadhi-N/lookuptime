#!/usr/bin/env node

const { resolveCname } = require('dns');
const https = require('https');
const { resolve, format } = require('path');
const helpers = require('./helpers');
const argv = process.argv.slice(2);
const API = "https://worldtimeapi.org/api/timezone/";


/* Makes HTTPS request to API */
function makeApiRequest(formattedStr) {
  let url = formattedStr === null ? API : API.concat(formattedStr); //if requesting timezone, the defalt API url already contains it
  return new Promise ((resolve, reject) => {
    const req = https.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => {body += chunk.toString()}); 
      res.on('error', reject); //does this error mean server returned with error?
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          resolve({ statusCode: res.statusCode, headers: res.headers, body: body });
        } else {
          reject('Request failed. status: ' + res.statusCode);
        }
      })
    })
    req.on('error', reject);
    req.setTimeout(3000, function() {
      reject("Server connection timeout (after 3 seconds)")
      this.abort();
    });
    req.end();
  })
};


/* Redirects user input to either API request or helper function */
const processUserInput = (argv) => {
  return new Promise((resolve, reject) => {
    const userInput = !argv.length ? null : argv.toString(); //convert input from array to string to match cases
    
    switch(userInput) {
      case "-t":
      case "--timezone":
        resolve(null); //sending null because API is already formatted with 'timezone' in URL
        break;

      case "-h":
      case "--help":
        console.log(`List of commands ...`);
        break;
      
      case null: 
        reject("Provide an input")
      default: 
        let i = userInput.search(/\//g);
        if (i !== -1) {
          let subStr1 = userInput.substr(0, 1), subStr2 = userInput.substr(i+1, 1),
          capitalized  = userInput.replace(subStr1, subStr1.toUpperCase()).replace(subStr2, subStr2.toUpperCase());
          return resolve(capitalized);
        } else {
          console.log('nope')
        }
        break;
    }
  }) 
};

/* Display list of timezones in console */
const displayTimeZones = (data) => {
  //need to format data into tables... 
}

/* Executing promises one by one */
const fetchDataPromise = (argv) => {
  processUserInput(argv)
  .then((formattedStr) => {
    return makeApiRequest(formattedStr)
  })
  .then((apiResponse) => {
    return displayTimeZones(apiResponse.body)
  })
  .catch((errorMsg) => {
    console.log("Error:", errorMsg)
  })
}

fetchDataPromise(argv);
