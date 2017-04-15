const expect = require('chai').expect;
const StationFinder = require('../src/station-finder.js');
const finder = new StationFinder();

describe('StationFinder', function() {
  it('makes an array of stations from file', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    expect(stations).to.be.instanceOf(Array);
    expect(stations.length).to.eql(2);
    expect(stations[0].name).to.eql('Acton Town');
  });
});