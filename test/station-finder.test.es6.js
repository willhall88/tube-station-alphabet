const expect = require('chai').expect;
const StationFinder = require('../src/station-finder.es6.js');
const finder = new StationFinder();

describe('StationFinder', function() {
  it('makes an array of stations from file', function() {
    const array = finder.fileToArray('./lib/test.csv');
    expect(array).to.eql([ 'Acton Town', 'Aldgate' ]);
  });

  it('reduces station names down to unique letters', function() {
    const uniqLetteredStation = finder.stripDuplicateLetters([ 'Acton Town', 'Aldgate' ]);
    expect(uniqLetteredStation).to.eql({ 'Acton Town': 'actonw', 'Aldgate': 'aldgte' });
  });

  it('counts the number of times each letter of the alphabet occurs', function() {
    const letterScores = finder.scoreLetters([ 'Acton Town', 'Aldgate' ]);
    expect(letterScores['a']).to.eql(3);
    expect(letterScores['b']).to.eql(0);
  });
});