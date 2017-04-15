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

  countLetters () {
    let characters = this.stations.map(station => station.characters).join('');

    this.letters.forEach(letter => {
      let re = new RegExp(letter.name ,"gi");
      if (characters.match(re) != null) {
        let count = characters.match(re).length;
        letter.setValue(count);
        letter.setScore(1 - (count / characters.length));
      }
    })
  }

  scoreStations () {
    this.stations.map(station => {
      let numbers = station.characters.split('').map(character => {
        return this.letters.get(character).score;
      })
      let score = numbers.reduce( (acc, cur) => acc + cur);
      station.setScore(score);
    })
  }

  valuableStation () {
    let StationScores = new Map()
    this.stations.forEach(station => {
      StationScores.set(station.score, station);
    })
    let SortedStations = new Map([...StationScores.entries()].sort((a,b) => {
      return b[0] - a[0];
    }));
    return SortedStations.values().next().value; //returns first value in map
  }

  detectLetters (stationLetters) {
    stationLetters.split('').map(character => {
      this.letters.get(character).hit();
    })
  }

  findAndUpdate() {
    let station = this.valuableStation();
    this.detectLetters(station.characters);
    station.setSelect();
    // let index = this.stations.indexOf(station);
    // if (index > -1) {
    //   this.stations.splice(index, 1);
    // }
  }

  selectedStations() {
    return this.stations.filter( station => {
      return station.selected;
    })
  }
};

module.exports = StationFinder;
