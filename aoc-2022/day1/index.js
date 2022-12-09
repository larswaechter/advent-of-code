const { readData } = require("../helper");

const answ = readData(__dirname + "/data.txt")
  .split("\n\n")
  .map((arr) => arr.split("\n").reduce((prev, val) => prev + +val, 0))
  .sort((a, b) => b - a)[0];

console.log(answ);
