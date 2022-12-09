const { readData } = require("../../helper");

class Stack {
  constructor(values) {
    this.values = values.slice();
  }

  head() {
    if (this.values.length) return this.values[this.values.length - 1];
    return undefined;
  }

  push(items) {
    for (const item of items) this.values.push(item);
  }

  pop(n) {
    const items = [];

    for (let i = 0; i < n; i++) items.push(this.values.pop());

    return items;
  }
}

class Stack2 {
  constructor(values) {
    this.values = values.slice();
  }

  head() {
    if (this.values.length) return this.values[this.values.length - 1];
    return undefined;
  }

  push(items) {
    for (const item of items) this.values.push(item);
  }

  pop(n) {
    const items = [];

    for (let i = 0; i < n; i++) items.unshift(this.values.pop());

    return items;
  }
}

const data = readData(__dirname + "/data.txt").split("\n");

/**
 * Part #1
 */
const part1 = () => {
  const stacks = [
    new Stack(["W", "M", "L", "F"]),
    new Stack(["B", "Z", "V", "M", "F"]),
    new Stack(["H", "V", "R", "S", "L", "Q"]),
    new Stack(["F", "S", "V", "Q", "P", "M", "T", "J"]),
    new Stack(["L", "S", "W"]),
    new Stack(["F", "V", "P", "M", "R", "J", "W"]),
    new Stack(["J", "Q", "C", "P", "N", "R", "F"]),
    new Stack(["V", "H", "P", "S", "Z", "W", "R", "B"]),
    new Stack(["B", "M", "J", "C", "G", "H", "Z", "W"]),
  ];

  for (const row of data) {
    const reg = new RegExp(/^move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)$/);
    let [_, amount, from, to] = row.match(reg);

    const items = stacks[+from - 1].pop(amount);
    stacks[+to - 1].push(items);
  }

  return stacks.reduce((prev, val) => prev + val.head(), "");
};

/**
 * Part #2
 */
const part2 = () => {
  const stacks = [
    new Stack2(["W", "M", "L", "F"]),
    new Stack2(["B", "Z", "V", "M", "F"]),
    new Stack2(["H", "V", "R", "S", "L", "Q"]),
    new Stack2(["F", "S", "V", "Q", "P", "M", "T", "J"]),
    new Stack2(["L", "S", "W"]),
    new Stack2(["F", "V", "P", "M", "R", "J", "W"]),
    new Stack2(["J", "Q", "C", "P", "N", "R", "F"]),
    new Stack2(["V", "H", "P", "S", "Z", "W", "R", "B"]),
    new Stack2(["B", "M", "J", "C", "G", "H", "Z", "W"]),
  ];

  for (const row of data) {
    const reg = new RegExp(/^move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)$/);
    let [_, amount, from, to] = row.match(reg);

    const items = stacks[+from - 1].pop(amount);
    stacks[+to - 1].push(items);
  }

  return stacks.reduce((prev, val) => prev + val.head(), "");
};
