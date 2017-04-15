const expect = require('chai').expect;
const Letter = require('../src/letter');

describe('Letter', function() {
  it('should have an initial name', function() {
    const letter = new Letter('a');
    expect(letter.name).to.eql('a');
  });

  it('raises error if no name', function() {
    expect(function(){new Letter()}).to.throw(RangeError);
  });

  it('has not been detected on initialise', function() {
    const letter = new Letter('a');
    expect(letter.detected).to.be.false;
  });

  it('can be detected', function() {
    const letter = new Letter('a');
    letter.hit();
    expect(letter.detected).to.be.true;
  });

  it('has a count of 0 on initialise', function() {
    const letter = new Letter('a');
    expect(letter.value).to.eql(0);
  });

  it('has a count of how many times it occurs', function() {
    const letter = new Letter('a');
    letter.setValue(15);
    expect(letter.value).to.eql(15);
  });
});