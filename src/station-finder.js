const fs = require('fs');
const Letter = require('./letter');
const Station = require('./station');

class StationFinder {
  constructor() {
    this.letters = new Map();
    this.initLetters();
  }

  initLetters () {
    let letterInstances = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => new Letter(letter));
    letterInstances.forEach(letter => this.letters.set(letter.name, letter));
  }

  fileToArray (filename) {
    let file = fs.readFileSync(filename, 'utf8');
    let array = file.split('\r\n');
    this.stations = array.map(value => new Station(value));
    return this.stations;
  }

  totalCharacters () {
    return this.unselectedStations().map(station => station.characters ).join('');
  }

  countLetters () {
    let characters = this.totalCharacters();

    this.letters.forEach(letter => {
      if(letter.detected) { return; }
      let re = new RegExp(letter.name ,"gi");
      if (characters.match(re) != null) {
        let count = characters.match(re).length;
        letter.setValue(count);
        letter.setScore(1 - (count / characters.length));
      }
    })
  }

  scoreStations () {
    this.unselectedStations().map(station => {
      let numbers = station.characters.split('').map(character => {
        return this.letters.get(character).score;
      })
      let score = numbers.reduce( (acc, cur) => acc + cur);
      station.setScore(score);
    })
  }

  valuableStation () {
    let StationScores = new Map()
    this.unselectedStations().forEach(station => {
      StationScores.set(station.score, station);
    })
    let SortedStations = new Map([...StationScores.entries()].sort((a,b) => {
      return b[0] - a[0];
    }));
    return SortedStations.values().next().value; //returns first value in map
  }

  detectLetters (stationLetters) {
    stationLetters.split('').map(character => {
      let letter = this.letters.get(character);
      letter.hit();
      letter.score = 0;
      letter.value = 0;
    })
  }

  findAndUpdate() {
    let station = this.valuableStation();
    this.detectLetters(station.characters);
    station.setSelect();
  }

  selectedStations() {
    return this.stations.filter( station => {
      return station.selected;
    })
  }

  unselectedStations() {
    return this.stations.filter( station => {
      return !station.selected;
    })
  }

  lettersToBeFound() {
    return [...this.letters.values()].filter(letter => !letter.detected).length
  }
};

module.exports = StationFinder;
