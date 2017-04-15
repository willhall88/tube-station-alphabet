const expect = require('chai').expect;
const StationFinder = require('../src/station-finder.js');
const Letter = require('../src/letter');

describe('Stationthis.Finder', function() {
  beforeEach(function() {
    this.finder = new StationFinder();
    this.stations = this.finder.fileToArray('./lib/test.csv');
  });

  it('has an array of Letters on initialise', function() {
    const letters = this.finder.letters;
    expect(letters.get('a')).to.be.instanceOf(Letter);
    expect(letters.size).to.eql(26);
  });

  it('makes an array of stations from file', function() {
    expect(this.stations).to.be.instanceOf(Array);
    expect(this.stations.length).to.eql(3);
    expect(this.stations[0].name).to.eql('Acton Town');
  });

  it('counts the number of occurrences for each letter', function() {
    this.finder.countLetters();
    expect(this.finder.letters.get('a').value).to.eql(3);
  });

  it('scores each letter based on how frequently it occurs', function() {
    this.finder.countLetters();
    expect(this.finder.letters.get('a').score).to.be.within(0.857, 0.858);
  });

  it('scores each station according to the letter count', function() {
    this.finder.countLetters();
    this.finder.scoreStations();
    expect(this.finder.stations[0].score).to.be.within(5.380, 5.381);
  });

  it('finds the lowest scoring station', function() {
    this.finder.countLetters();
    this.finder.scoreStations();

    expect(this.finder.valuableStation().name).to.eql('Woolwich Arsenal');
  });

  it('should set all Letters in valuable station to detected', function() {
    this.finder.countLetters();
    this.finder.scoreStations();
    this.finder.detectLetters('actonw')

    expect(this.finder.letters.get('a').detected).to.be.true;
  });

  it('the valuable station should be set to "selected"', function() {
    this.finder.countLetters();
    this.finder.scoreStations();
    this.finder.findAndUpdate();

    expect(this.finder.selectedStations().length).to.eql(1);
    expect(this.finder.selectedStations()[0].name).to.eql('Woolwich Arsenal');
  });

  it('the found letters should have a zero score and count', function() {
    this.finder.countLetters();
    this.finder.scoreStations();
    this.finder.findAndUpdate();

    this.finder.countLetters();
    expect(this.finder.letters.get('a').score).to.eql(0);
    expect(this.finder.letters.get('a').value).to.eql(0);
  });

  it('the selected station should no longer be counted', function() {
    expect(this.finder.totalCharacters().length).to.eql(21);
    this.finder.countLetters();
    this.finder.scoreStations();
    this.finder.findAndUpdate();
    expect(this.finder.totalCharacters().length).to.eql(10);
  });

  it('the selected station should no longer be counted', function() {
    this.stations[0].setSelect();

    expect(this.finder.unselectedStations().length).to.eql(2);
  });

  it('should know if there are still letters left to find', function() {
    expect(this.finder.lettersToBeFound()).to.eq(26);
    this.finder.letters.get('a').hit()
    this.finder.letters.get('f').hit()
    expect(this.finder.lettersToBeFound()).to.eq(24);
  });
});