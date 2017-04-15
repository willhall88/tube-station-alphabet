const expect = require('chai').expect;
const Letter = require('../src/letter');

describe('Letter', function() {
  beforeEach(function() {
    this.letter = new Letter('a');
  });

  it('should have an initial name', function() {
    expect(this.letter.name).to.eql('a');
  });

  it('raises error if no name', function() {
    expect(function(){new Letter()}).to.throw(RangeError);
  });

  it('has not been detected on initialise', function() {
    expect(this.letter.detected).to.be.false;
  });

  it('can be detected', function() {
    this.letter.hit();
    expect(this.letter.detected).to.be.true;
  });

  it('has a count of 0 on initialise', function() {
    expect(this.letter.value).to.eql(0);
  });

  it('has a count of how many times it occurs', function() {
    this.letter.setValue(15);
    expect(this.letter.value).to.eql(15);
  });
});