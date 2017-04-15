class Letter {
  constructor(name) {
    if (name == undefined) {throw new RangeError('name not set')} ;
    this.name = name;
    this.detected = false;
    this.value = 0;
  }

  hit() {
    return this.detected = true;
  }

  setValue(value) {
    return this.value = value;
  }
};

module.exports = Letter;
