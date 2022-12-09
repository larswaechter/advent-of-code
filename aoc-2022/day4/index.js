const { readData } = require("../../helper");

const data = readData(__dirname + "/data.txt").split("\n");

const inRange = (val, [from, to]) => val >= from && val <= to;

/**
 * Part #1
 */
const part1 = () => {
  let counter = 0;

  for (const row of data) {
    const [s1, s2] = row.split(",");

    const [s1From, s1To] = s1.split("-");
    const [s2From, s2To] = s2.split("-");

    if (
      (+s1From <= +s2From && +s1To >= +s2To) ||
      (+s2From <= +s1From && +s2To >= +s1To)
    )
      counter++;
  }

  return counter;
};

/**
 * Part #2
 */
const part2 = () => {
  let counter = 0;

  for (const row of data) {
    const [s1, s2] = row.split(",");

    const [s1From, s1To] = s1.split("-");
    const [s2From, s2To] = s2.split("-");

    if (
      inRange(+s2From, [+s1From, +s1To]) ||
      inRange(+s2To, [+s1From, +s1To]) ||
      inRange(+s1From, [+s2From, +s2To]) ||
      inRange(+s1To, [+s2From, +s2To])
    )
      counter++;
  }

  return counter;
};
