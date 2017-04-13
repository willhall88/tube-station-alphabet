const fs = require('fs');

class StationFinder {
  constructor() {
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  }

  fileToArray (filename) {
    let file = fs.readFileSync(filename, 'utf8');
    let array = file.split('\r\n');
    return array;
  }

  stripDuplicateLetters (stations) {
    let map = new Map();
    stations.forEach(station => {
      let strippedStation = station
                              .toLowerCase()
                              .split('')
                              .filter((item, pos, self) => {
                                return self.indexOf(item) == pos && item != ' ';
                              })
                              .join('');
      map.set(station, strippedStation)
    })
    return map;
  }

  scoreLetters (stations) {
    const allLetters = [...stations.values()].join('');
    let letterScores = {};

    this.alphabet.split('').forEach(letter => {
      let count = 0;
      let re = new RegExp(letter ,"gi");
      if(Array.isArray(allLetters.match(re))) {
        count = allLetters.match(re).length;
      }
      return letterScores[letter] = count;
    })
    return letterScores;
  }
};

module.exports = StationFinder;
