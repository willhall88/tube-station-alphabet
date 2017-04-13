const fs = require('fs');

class StationFinder {
  constructor() {
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  }

  fileToArray (filename) {
    let file = fs.readFileSync(filename, 'utf8');
    let array = file.split('\n');
    return array;
  }

  stripDuplicateLetters (stations) {
    let hash = {};
    stations.forEach(station => {
      let strippedStation = station
                              .toLowerCase()
                              .split('')
                              .filter((item, pos, self) => {
                                return self.indexOf(item) == pos && item != ' ';
                              })
                              .join('');
      return hash[station] = strippedStation;
    })
    return hash;
  }

  scoreLetters (stations) {
    let letterScores = {};
    this.alphabet.split('').forEach(letter => {
      let re = new RegExp(letter ,"gi");
      let count = 0;
      if(Array.isArray(stations.join('').match(re))) {
        count = stations.join('').match(re).length;
      }
      return letterScores[letter] = count;
    })
    return letterScores;
  }
};

module.exports = StationFinder;
