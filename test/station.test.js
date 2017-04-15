const expect = require('chai').expect;
const Station = require('../src/station');

describe('Station', function() {
  beforeEach(function() {
    this.station = new Station('Aldgate');
  });

  it('should have an initial station name', function() {
    expect(this.station.name).to.eql('Aldgate');
  });

  it('raises error if no name', function() {
    expect(function(){new Station()}).to.throw(RangeError);
  });


  it('should know the unique characters in its name', function() {
    expect(this.station.characters).to.eql('aldgte');
  });

  it('should remove any non letter characters', function() {
    let station = new Station('Blackfriar [7')
    expect(station.characters).to.eql('blackfri');
  });

  it('starts off without a score', function() {
    expect(this.station.score).to.eql(null);
  });

  it('should know its letter score', function() {
    this.station.setScore(15);
    expect(this.station.score).to.eql(15);
  });

  it('starts off unselected', function() {
    expect(this.station.selected).to.be.false;
  });

  it('should know if has been selected', function() {
    this.station.setSelect();
    expect(this.station.selected).to.be.true;
  });
});