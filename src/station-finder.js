const fs = require('fs');
const Letter = require('./letter');
const Station = require('./station');

class StationFinder {
  constructor() {
  }

  fileToArray (filename) {
    let file = fs.readFileSync(filename, 'utf8');
    let array = file.split('\r\n');
    let stations = array.map(value => new Station(value));
    return stations;
  }


};

module.exports = StationFinder;
