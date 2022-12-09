const { readData } = require("../../helper");

/**
 * Prepare data
 */
let data = readData(__dirname + "/data.txt").split("\n");

const boards = [];
const numbers = data[0].split(",").map((n) => +n);

data = data.slice(2, data.length).filter((row) => row.length > 0);

for (let i = 0; i < data.length; i += 5) {
  const board = [];
  for (let k = i; k < i + 5; k++)
    board.push(
      data[k]
        .trim()
        .replaceAll("  ", " ")
        .split(" ")
        .map((n) => +n)
    );
  boards.push(board);
}

const hasWon = (board, draws) => {
  // Check rows
  outer: for (const row of board) {
    for (const n of row) if (!draws.has(n)) continue outer;
    return true;
  }

  // Check cols
  outer: for (let i = 0; i < 5; i++) {
    for (let k = 0; k < 5; k++) if (!draws.has(board[k][i])) continue outer;
    return true;
  }

  return false;
};

const calcScore = (board, draws) => {
  let sum = 0;

  for (const row of board) for (const n of row) if (!draws.has(n)) sum += n;

  const values = [...draws];
  return values[values.length - 1] * sum;
};

/**
 * Part #1
 */
const part1 = () => {
  const draws = new Set();
  for (const number of numbers) {
    draws.add(number);

    for (const board of boards)
      if (hasWon(board, draws)) return calcScore(board, draws);
  }
};

/**
 * Part #2
 */
const part2 = () => {
  const draws = new Set();
  const winners = new Set();
  let lastScore = 0;

  for (const number of numbers) {
    draws.add(number);

    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      if (hasWon(board, draws) && !winners.has(i)) {
        winners.add(i);
        lastScore = calcScore(board, draws);
      }
    }
  }

  return lastScore;
};

console.log(part2());
