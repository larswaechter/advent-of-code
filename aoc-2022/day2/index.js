const { readData } = require("../helper");

const data = readData(__dirname + "/data.txt").split("\n");

/**
 * 0 3 6
 * 1 2 3
 *
 *    R   P   S
 * R  4   8   3
 * P  1   5   9
 * S  7   2   6
 */

const matrix = [
  [4, 8, 3],
  [1, 5, 9],
  [7, 2, 6],
];

const matrix2 = [
  ["Z", "X", "Y"],
  ["X", "Y", "Z"],
  ["Y", "Z", "X"],
];

const toIdx = (move) => {
  if (move == "A" || move == "X") return 0;
  if (move == "B" || move == "Y") return 1;
  if (move == "C" || move == "Z") return 2;
};

const sum = data
  .map((game) => {
    const [col1, col2] = game.split(" ");
    return [col1, matrix2[toIdx(col1)][toIdx(col2)]];
  })
  .reduce((prev, val) => prev + matrix[toIdx(val[0])][toIdx(val[1])], 0);

console.log(sum);
