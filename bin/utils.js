const https = require('https');
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
        } else if (res.statusCode >= 300 && res.statusCode <= 399) {
          reject(`Request failed. Status code: ${res.statusCode}. Redirect Error.`);
        } else if (res.statusCode >= 400 && res.statusCode <= 499) {
          reject (`Request failed. Status code: ${res.statusCode}. Unknown Location.`);
        } else if (res.statusCode >= 500 && res.statusCode <= 599) {
          reject (`Request failed. Status code: ${res.statusCode}. Server Error.`);
        } else {
          reject(`Something went wrong... Try again.`)
        }
      })
    })
    req.on('error', reject);
    req.setTimeout(3000, function() {
      reject("Request to server took too long. Server connection timeout (after 3 seconds).")
      this.abort();
    });
    req.end();
  })
};

/* Display list of requested valid timezones */
const listOfTimezones = (data) => {
  // If API data returned as array, *making assumption* that it was directly from an API response
  switch (Array.isArray(data)) {
    case true:
      // Splits location:region into separate strings, and print to console.table
      let arr = [];
      let regexSlashChar = /\//g;
      for (let i = 0; i < data.length; i++) {
        if (data[i].search(regexSlashChar)) {
          let b = data[i].split(regexSlashChar); 
          //Create object name for console.table, and assign names to 3 columns; if array data has only 2 elements, leave 3rd column as n/a
          let obj = {[":area/"]: b[0], [":location/"]: b[1] ? b[1] : "n/a", [":region"]: b[2] ? b[2] : "n/a"};
          arr.push(obj)
        }
      }
      return console.table(arr);

      case false: 
        return new Promise ((resolve) => {resolve(data)});
  }
};

/* Format epoch/unixtime to date string */
const currentTime = (unixtime) => {return new Date(unixtime * 1000).toLocaleTimeString('en-us');}

/* Print timezone to console */
const timeZone = (data) => {
  return new Promise ((resolve) => {
    console.log(`The time in \x1b[34m ${data.timezone} \x1b[0m is \x1b[32m ${currentTime(data.unixtime)} ${data.abbreviation}.`)
  }) 
};

module.exports = {
  makeApiRequest,
  listOfTimezones,
  timeZone,
  currentTime
}
