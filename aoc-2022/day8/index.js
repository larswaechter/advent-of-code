const { readData } = require("../../helper");

const data = readData(__dirname + "/data.txt").split("\n");

const forest = ([] = data.map((row) => row.split("").map((n) => +n)));

const HEIGHT = forest.length;
const WIDTH = forest[0].length;

const isVisible = (y, x) => {
  if (x === 0 || y === 0 || x === WIDTH - 1 || y === HEIGHT - 1) return true;

  const height = forest[y][x];
  const row = forest[y];

  const visible = [true, true, true, true]; // L R U D

  // Left
  for (let i = x - 1; i >= 0; i--) {
    if (row[i] >= height) {
      visible[0] = false;
      break;
    }
  }

  // Right
  for (let i = x + 1; i < WIDTH; i++) {
    if (row[i] >= height) {
      visible[1] = false;
      break;
    }
  }

  // Up
  for (let i = y - 1; i >= 0; i--) {
    if (forest[i][x] >= height) {
      visible[2] = false;
      break;
    }
  }

  // Down
  for (let i = y + 1; i < HEIGHT; i++) {
    if (forest[i][x] >= height) {
      visible[3] = false;
      break;
    }
  }

  return visible.reduce((prev, vis) => prev || vis, false);
};

const calcViewingDistance = (y, x) => {
  if (x === 0 || y === 0 || x === WIDTH - 1 || y === HEIGHT - 1) return 0;

  const height = forest[y][x];
  const distances = [0, 0, 0, 0]; // L R U D

  // Left
  for (let i = x - 1; i >= 0; i--) {
    if (forest[y][i] < height) distances[0]++;
    else {
      distances[0]++;
      break;
    }
  }

  // Right
  for (let i = x + 1; i < WIDTH; i++) {
    if (forest[y][i] < height) distances[1]++;
    else {
      distances[1]++;
      break;
    }
  }

  // Up
  for (let i = y - 1; i >= 0; i--) {
    if (forest[i][x] < height) distances[2]++;
    else {
      distances[2]++;
      break;
    }
  }

  // Down
  for (let i = y + 1; i < HEIGHT; i++) {
    if (forest[i][x] < height) distances[3]++;
    else {
      distances[3]++;
      break;
    }
  }

  return distances.reduce((prev, val) => prev * val, 1);
};

const part1 = () => {
  let counter = 0;
  for (let i = 0; i < HEIGHT; i++)
    for (let k = 0; k < WIDTH; k++) if (isVisible(i, k)) counter++;

  return counter;
};

const part2 = () => {
  let max = 0;
  for (let i = 0; i < HEIGHT; i++)
    for (let k = 0; k < WIDTH; k++)
      max = Math.max(max, calcViewingDistance(i, k));

  return max;
};
