#!/usr/bin/env node
const StationFinder = require('./src/station-finder');
const finder = new StationFinder();

let stationList = finder.fileToArray('./lib/underground-stations.csv');


console.log(`
  There are ${finder.lettersToBeFound()} letters left to find`);

while (finder.lettersToBeFound() > 0) {
  finder.countLetters();
  finder.scoreStations();
  console.log(`
    Selecting ${finder.valuableStation().name.toUpperCase()}
    and removing ${finder.valuableStation().characters.length} letters`);
  finder.findAndUpdate();
  console.log(`    There are ${finder.lettersToBeFound()} letters left to find`);
}

console.log(``);
console.log(`All letters have been found`);
console.log(`The tube stations are:`)
finder.selectedStations().forEach(station =>{
  console.log(station.name.toUpperCase());
})

