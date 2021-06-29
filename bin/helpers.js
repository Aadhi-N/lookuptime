/* Redirects user input to either API request or helper function */

const processUserInput = (argv) => {
  return new Promise((resolve, reject) => {
    const userInput = !argv.length ? null : argv.toString(); 
    
    switch(userInput) {
      case "-t":
      case "--timezone":
        resolve(null); //sending null because API is already formatted with 'timezone' in URL
        break;

      case "-h":
      case "--help":
        console.log(`

        \x1b[36mlookuptime:\x1b[0m
          A NodeJS cli world time checking app. 
      
        \x1b[36mUsage:\x1b[0m
          Input is based on the formatting required by [worldtimeapi.org](https://worldtimeapi.org/):
          
          $ node index.js <area>/<location>/[region]
      
        \x1b[36mExample:\x1b[0m
          INPUT:  $ node index.js america/toronto
          OUTPUT: $ The time in  America/Toronto  is  2:32:34 PM EDT.

        `);
        break;

      case null: 
        reject("Please provide an input");

      default: 
        let onlyAlphabetic = userInput.match(/^[a-z\/]+$/i);
        if (userInput.length > 1 && onlyAlphabetic !== null) {
          resolve(userInput);
        }
        else {
          console.log("Please provide an input matching accepted format. See help (-h or --help) for details.")
        }
        break;
    }
  })
};



module.exports = processUserInput;