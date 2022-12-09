const { readData } = require("../../helper");

let data = readData(__dirname + "/data.txt").split("\n");

// Might fix dimension (breaks printing)
const matrix = Array(1000)
  .fill(null)
  .map(() => Array(1000).fill(0));

const print = () => {
  for (const row of matrix)
    console.log(row.map((r) => (r > 0 ? r : ".")).join(""));
};

const getNumbersInRange = (from, to) => {
  const numbers = [];

  if (from < to) for (let i = from; i <= to; i++) numbers.push(i);
  else for (let i = from; i >= to; i--) numbers.push(i);

  return numbers;
};

/*
3.2             7.2
    4.3     6.3
        5.4
    4.5     6.5
3.6             7.6
*/
const isDiagonal = ([fromX, fromY], [toX, toY]) =>
  Math.abs(fromX - toX) === Math.abs(fromY - toY);

const getDiagonalValues = ([fromX, fromY], [toX, toY]) => {
  const rangeX = getNumbersInRange(fromX, toX);
  const rangeY = getNumbersInRange(fromY, toY);

  return rangeX.map((val, i) => [val, rangeY[i]]);
};

for (const row of data) {
  let [from, to] = row.split(" -> ");

  from = from.split(",").map((val) => +val);
  to = to.split(",").map((val) => +val);

  const [fromX, fromY] = from;
  const [toX, toY] = to;

  if (fromX === toX)
    for (const n of getNumbersInRange(fromY, toY)) matrix[n][fromX]++;
  else if (fromY === toY)
    for (const n of getNumbersInRange(fromX, toX)) matrix[fromY][n]++;
  else if (isDiagonal(from, to))
    for (const [x, y] of getDiagonalValues(from, to)) matrix[y][x]++;
}

let counter = 0;
for (const row of matrix) for (const val of row) if (val >= 2) counter++;

console.log(counter);
