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
        console.log(`List of commands ...`);
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



module.exports = {processUserInput}