const { readData } = require("../../helper");

const signals = readData(__dirname + "/data.txt")
  .split("\n")
  .map((val) => +val);

/**
 * Part #1
 */
const part1 = () => {
  let counter = 0;
  for (let i = 1; i < signals.length; i++)
    if (signals[i - 1] < signals[i]) counter++;

  return counter;
};

/**
 * Part #2
 */
const part2 = () => {
  let counter = 0;
  let prevSum = Number.MAX_SAFE_INTEGER;

  for (let i = 2; i < signals.length; i++) {
    const sum = signals[i] + signals[i - 1] + signals[i - 2];
    if (prevSum < sum) counter++;
    prevSum = sum;
  }

  return counter;
};

console.log(part2());
