const { readData } = require("../../helper");

let moves = readData(__dirname + "/data.txt").split("\n");

let moveHistory = new Set();

let [tX, tY] = [0, 0];
let [hX, hY] = [0, 0];

const moveTail = () => {
  // Move horizontal
  if (hY === tY) {
    if (hX - tX > 1) tX++;
    else if (hX - tX < -1) tX--;

    // Move vertical
  } else if (hX === tX) {
    if (hY - tY > 1) tY++;
    else if (hY - tY < -1) tY--;

    // Move diagonal
  } else {
    // U R
    if ((hX - tX === 2 && hY - tY === 1) || (hX - tX === 1 && hY - tY === 2)) {
      tX++;
      tY++;
      // DR
    } else if (
      (hX - tX === 2 && hY - tY === -1) ||
      (hX - tX === 1 && hY - tY === -2)
    ) {
      tX++;
      tY--;
      // U L
    } else if (
      (hX - tX === -2 && hY - tY === 1) ||
      (hX - tX === -1 && hY - tY === 2)
    ) {
      tX--;
      tY++;
      // D L
    } else if (
      (hX - tX === -2 && hY - tY === -1) ||
      (hX - tX === -1 && hY - tY === -2)
    ) {
      tX--;
      tY--;
    }
  }
};

const part1 = () => {
  for (const move of moves) {
    let [dir, steps] = move.split(" ");
    steps = +steps;

    for (let i = 0; i < steps; i++) {
      switch (dir) {
        case "L":
          hX--;
          break;
        case "R":
          hX++;
          break;
        case "U":
          hY++;
          break;
        case "D":
          hY--;
          break;
      }

      moveTail();
      moveHistory.add(`${tX}-${tY}`);
    }
  }

  console.log(moveHistory.size);
};

part1();
