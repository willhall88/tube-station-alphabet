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
    expect(stations.length).to.eql(3);
    expect(stations[0].name).to.eql('Acton Town');
  });

  it('counts the number of occurrences for each letter', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    finder.countLetters();
    expect(finder.letters.get('a').value).to.eql(3);
  });

  it('scores each letter based on how frequently it occurs', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    finder.countLetters();
    expect(finder.letters.get('a').score).to.be.within(0.857, 0.858);
  });

  it('scores each station according to the letter count', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    finder.countLetters();
    finder.scoreStations();
    expect(finder.stations[0].score).to.be.within(5.380, 5.381);
  });

  it('finds the lowest scoring station', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    finder.countLetters();
    finder.scoreStations();

    expect(finder.valuableStation().name).to.eql('Woolwich Arsenal');
  });

  it('should set all Letters in valuable station to detected', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    finder.countLetters();
    finder.scoreStations();
    finder.detectLetters('actonw')

    expect(finder.letters.get('a').detected).to.be.true;
  });

  it('the valuable station should be set to "selected"', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    finder.countLetters();
    finder.scoreStations();
    finder.findAndUpdate();

    expect(finder.selectedStations().length).to.eql(1);
    expect(finder.selectedStations()[0].name).to.eql('Woolwich Arsenal');
  });

  it('the found letters should have a zero score and count', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    finder.countLetters();
    finder.scoreStations();
    finder.findAndUpdate();

    finder.countLetters();
    expect(finder.letters.get('a').score).to.eql(0);
    expect(finder.letters.get('a').value).to.eql(0);
  });

  it('the selected station should no longer be counted', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    expect(finder.totalCharacters().length).to.eql(21);
    finder.countLetters();
    finder.scoreStations();
    finder.findAndUpdate();
    expect(finder.totalCharacters().length).to.eql(17);
  });

  it('the selected station should no longer be counted', function() {
    const stations = finder.fileToArray('./lib/test.csv');
    stations[0].setSelect();

    expect(finder.unselectedStations().length).to.eql(2);
  });
});