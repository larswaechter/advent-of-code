const { readData } = require("../../helper");

const binaries = readData(__dirname + "/data.txt").split("\n");

const binToDec = (prev, val, i, arr) =>
  prev + val * Math.pow(2, arr.length - i - 1);

/**
 * Part #1
 */
const part1 = () => {
  const gamma = [];

  for (let i = 0; i < binaries[0].length; i++) {
    let tmpCounter = [0, 0];
    for (const bin of binaries) tmpCounter[+bin[i]]++;
    gamma.push(tmpCounter[0] > tmpCounter[1] ? 0 : 1);
  }

  const gammaDec = gamma.reduce(binToDec, 0);
  const epsilonDec = gamma
    .map((bit) => (bit === 0 ? 1 : 0))
    .reduce(binToDec, 0);

  return gammaDec * epsilonDec;
};

/**
 * Part #2
 */
const part2 = () => {
  const calc = (numbers, column, maximize) => {
    if (numbers.length === 1)
      return numbers[0]
        .split("")
        .map((n) => +n)
        .reduce(binToDec, 0);

    const tmpCounter = [0, 0];
    for (const bin of numbers) tmpCounter[+bin[column]]++;

    const newNumbers = maximize
      ? numbers.filter(
          (n) => +n[column] === (tmpCounter[1] >= tmpCounter[0] ? 1 : 0)
        )
      : numbers.filter(
          (n) => +n[column] === (tmpCounter[0] <= tmpCounter[1] ? 0 : 1)
        );

    return calc(newNumbers, column + 1, maximize);
  };

  const oxygen = calc(binaries, 0, true);
  const co2 = calc(binaries, 0, false);

  return oxygen * co2;
};

console.log(part2());
