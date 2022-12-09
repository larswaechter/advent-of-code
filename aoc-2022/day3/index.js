const { readData } = require("../../helper");

const data = readData(__dirname + "/data.txt").split("\n");

const calcPrio = (letter) => {
  const isLower = new RegExp(/[a-z]/g);
  if (isLower.test(letter)) return letter.charCodeAt(0) - 96;
  else return letter.charCodeAt(0) - 38;
};

/**
 * Part #1
 */
const part1 = () => {
  let sum = 0;

  for (const sack of data) {
    const m = sack.length / 2;
    const c1 = sack.slice(0, m);
    const c2 = sack.slice(m, sack.length);
    const memo = new Set();

    for (let i = 0; i < c1.length; i++) {
      const letter = c1.charAt(i);

      if (c2.includes(letter) && !memo.has(letter)) {
        const prio = calcPrio(letter);
        sum += prio;
        memo.add(letter);
      }
    }
  }

  return sum;
};

/**
 * Part #2
 */
const part2 = () => {
  let sum = 0;
  for (let i = 0; i < data.length; i += 3) {
    const [r1, r2, r3] = [data[i], data[i + 1], data[i + 2]];
    const len = Math.max(r1.length, r2.length, r3.length);
    const memo = new Set();

    for (let i = 0; i < len; i++) {
      let lookup;

      if (r1.charAt(i).length) lookup = [r1.charAt(i), r2, r3];
      else if (r2.charAt(i).length) lookup = [r2.charAt(i), r1, r3];
      else lookup = [r3.charAt(i), r1, r2];

      const [letter, rA, rB] = lookup;

      if (!memo.has(letter) && rA.includes(letter) && rB.includes(letter)) {
        sum += calcPrio(letter);
        memo.add(letter);
      }
    }
  }

  return sum;
};
