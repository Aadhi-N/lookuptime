const expect = require('chai').expect;
const helpers = require('../bin/helpers.js');

describe('helpers', function() {
  describe('processUserInput function', function() {
    it('should display help menu', function() {
      return helpers.processUserInput('--help').then(function(data) {
        expect(data).to.equal(`List of commands ...`);
        done();
      }).catch()
    })
  })
})
