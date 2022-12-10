const { readData } = require("../../helper");

let moves = readData(__dirname + "/data.txt").split("\n");

const printBoard = ([hX, hY], tail) => {
  let s = "";
  for (let row = 21; row >= 0; row--) {
    s += (row < 10 ? `0${row}` : row) + " ";
    inner: for (let col = 0; col < 26; col++) {
      if (row === hY && col === hX) s += "H";
      else {
        for (let i = 0; i < tail.length; i++) {
          if (tail[i][0] === col && tail[i][1] === row) {
            s += i + 1;
            continue inner;
          }
        }
        s += ".";
      }
    }
    s += "\n";
  }
  console.log(s);
};

const printHistory = (history) => {
  let s = "";
  for (let row = 21; row >= 0; row--) {
    for (let col = 0; col < 26; col++) {
      if (history.has(`${col}-${row}`)) s += "#";
      else s += ".";
    }
    s += "\n";
  }
  console.log(s);
};

const moveTail = (tail, head) => {
  let [tX, tY] = tail;
  let [hX, hY] = head;

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

const part1 = () => {
  const moveHistory = new Set();

  let [tX, tY] = [0, 0];
  let [hX, hY] = [0, 0];

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

      [tX, tY] = moveTail([tX, tY], [hX, hY]);
      moveHistory.add(`${tX}-${tY}`);
    }
  }

  return moveHistory.size;
};

const part2 = () => {
  const moveHistory = new Set();
  const tail = Array(9)
    .fill(null)
    .map(() => [11, 5]);

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

  return moveHistory.size;
};

console.log(part1());
console.log(part2());
