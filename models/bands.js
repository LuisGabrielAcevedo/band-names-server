class Bands {
  constructor() {
    this.bands = [];
  }

  addBand(band) {
    this.bands.push(band);
  }

  getBands() {
    return this.bands;
  }

  deleteBand(id) {
    this.bands = this.bands.filter((b) => b.id !== id);
  }

  voteBand(id) {
    this.bands = this.bands.map((b) => {
      if (b.id === id) {
        b.votes++;
        return b;
      } else {
        return b;
      }
    });
  }
}

module.exports = Bands;
