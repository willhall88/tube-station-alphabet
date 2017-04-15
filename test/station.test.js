const expect = require('chai').expect;
const Station = require('../src/station');

describe('Station', function() {
  it('should have an initial station name', function() {
    const station = new Station('Aldgate');
    expect(station.name).to.eql('Aldgate');
  });

  it('raises error if no name', function() {
    expect(function(){new Station()}).to.throw(RangeError);
  });

  it('should know the unique characters in its name', function() {
    const station = new Station('Aldgate');
    expect(station.characters()).to.eql('aldgte');
  });

  it('starts off without a score', function() {
    const station = new Station('Aldgate');
    expect(station.score).to.eql(null);
  });

  it('should know its letter score', function() {
    const station = new Station('Aldgate');
    station.setScore(15);
    expect(station.score).to.eql(15);
  });
});