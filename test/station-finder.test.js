const expect = require('chai').expect
const finder = require("../src/station-finder");

describe('StationFinder', function() {
  it('makes an array of stations from file', function() {
    array = finder.fileToArray('./lib/test.csv');
    expect(array).to.eql([ 'Acton Town', 'Aldgate' ]);
  });
});