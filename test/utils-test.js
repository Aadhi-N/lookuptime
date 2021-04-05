const expect = require('chai').expect;
const display = require('../bin/utils.js');


describe('display', function() {
  describe('currentTime function', function() {
    it('should convert unix time to string date', function() {
     expect(display.currentTime(1617051593)).to.equal('4:59:53 PM')
    });
  })

  describe('timeZone function', function() {
    it('should print out the time that was requested', function() {
      const mockData = {timezone: 'America/Toronto', unixtime: 1617051593, abbreviation: 'EDT'}
            mockRes = 'The time in \u001b[34m America/Toronto \u001b[0m is \u001b[32m 4:59:53 PM EDT.'; 
      return display.timeZone(mockData).then(function(data) {
        expect(data).to.equal(mockRes);
      })
    })
  })
});

describe('listOfTimezones function', function() {
})

describe('makeApiRequest function', function() {
  
})

