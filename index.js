#!/usr/bin/env node
const StationFinder = require('./src/station-finder.es6.js');
const finder = new StationFinder();

let stationList = finder.fileToArray('./lib/underground-stations.csv');
stations = finder.stripDuplicateLetters(stationList);
letterScores = finder.scoreLetters(stations);
console.log(letterScores);