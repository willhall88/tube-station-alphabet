const fs = require('fs');

module.exports = {
  fileToArray: function (filename) {
    file = fs.readFileSync(filename, 'utf8');
    array = file.split('\n');
    return array;
  }
};