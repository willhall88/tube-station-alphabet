class Station {
  constructor(name) {
    if (name == undefined) {throw new RangeError('Initial station name should be set')} ;
    this.name = name;
    this.score = null;
    this.characters = this.getCharacters();
    this.selected = false;
  }

  getCharacters() {
    let uniqCharacters = this.name
      .toLowerCase()
      .split('')
      .filter((item, pos, self) => {
        return self.indexOf(item) == pos && item.match(/[a-z]/);
      })
      .join('')
    return uniqCharacters;
  }

  setScore(value) {
    this.score = value;
  }

  setSelect() {
    this.selected = true;
  }

};

module.exports = Station;
