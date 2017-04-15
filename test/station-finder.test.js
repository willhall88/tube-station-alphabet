const expect = require('chai').expect;
const StationFinder = require('../src/station-finder.js');
const finder = new StationFinder();
const Letter = require('../src/letter');

describe('StationFinder', function() {
  it('has an array of Letters on initialise', function() {
    const letters = finder.letters;
    expect(letters.get('a')).to.be.instanceOf(Letter);
    expect(letters.size).to.eql(26);
  });

  it('makes an array of stations from file', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    expect(stations).to.be.instanceOf(Array);
    expect(stations.length).to.eql(2);
    expect(stations[0].name).to.eql('Acton Town');
  });

  it('counts the number of occurrences for each letter', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    finder.countLetters()
    expect(finder.letters.get('a').value).to.eql(2);
  });
});