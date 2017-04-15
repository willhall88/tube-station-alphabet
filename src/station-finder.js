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
      }
    })
  }
};

module.exports = StationFinder;
