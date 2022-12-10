const { readData } = require("../../helper");

let moves = readData(__dirname + "/data.txt").split("\n");

let moveHistory = new Set();

const tail = Array(9)
  .fill(null)
  .map(() => [11, 5]);

const moveTail = ([tX, tY], [hX, hY]) => {
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
    if ((hX - tX >= 2 && hY - tY >= 1) || (hX - tX >= 1 && hY - tY >= 2)) {
      tX++;
      tY++;
      // DR
    } else if (
      (hX - tX >= 2 && hY - tY <= -1) ||
      (hX - tX >= 1 && hY - tY <= -2)
    ) {
      tX++;
      tY--;
      // U L
    } else if (
      (hX - tX <= -2 && hY - tY >= 1) ||
      (hX - tX <= -1 && hY - tY >= 2)
    ) {
      tX--;
      tY++;
      // D L
    } else if (
      (hX - tX <= -2 && hY - tY <= -1) ||
      (hX - tX <= -1 && hY - tY <= -2)
    ) {
      tX--;
      tY--;
    }
  }

  return [tX, tY];
};

const part2 = () => {
  let [hX, hY] = [11, 5];

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

      for (let i = 0; i < tail.length; i++) {
        if (i === 0) tail[0] = moveTail(tail[0], [hX, hY]);
        else tail[i] = moveTail(tail[i], tail[i - 1]);

        if (i === 8) moveHistory.add(`${tail[i][0]}-${tail[i][1]}`);
      }
    }
  }

  console.log(moveHistory.size);
};

part2();
