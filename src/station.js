class Station {
  constructor(name) {
    if (name == undefined) {throw new RangeError('Initial station name should be set')} ;
    this.name = name;
    this.score = null;
    this.characters = this.getCharacters();
  }

  getCharacters() {
    let uniqCharacters = this.name
      .toLowerCase()
      .split('')
      .filter((item, pos, self) => {
        return self.indexOf(item) == pos && item != ' ';
      })
      .join('')
    return uniqCharacters;
  }

  setScore(value) {
    this.score = value;
  }

};

module.exports = Station;
