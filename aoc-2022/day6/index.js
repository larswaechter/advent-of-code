const { readData } = require("../../helper");

const data = readData(__dirname + "/data.txt").split("\n");

class Buffer {
  constructor(seq, max) {
    this.seq = seq;
    this.max = max;
    this.values = [];
  }

  push(n) {
    if (this.values.length === this.max) this.values.shift();
    this.values.push(n);
  }

  isValid() {
    if (this.values.length < this.max) return false;

    const set = new Set();
    for (const val of this.values) {
      if (set.has(val)) return false;
      set.add(val);
    }

    return true;
  }

  solve() {
    for (let i = 0; i < this.seq.length; i++) {
      this.push(this.seq.charAt(i));
      if (this.isValid()) return i + 1;
    }

    return -1;
  }
}

/**
 * Part #1
 */
const part1 = () => {
  const buf = new Buffer(data[0], 4);
  return buf.solve();
};

/**
 * Part #2
 */
const part2 = () => {
  const buf = new Buffer(data[0], 14);
  return buf.solve();
};
