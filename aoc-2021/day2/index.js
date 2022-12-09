const { readData } = require("../../helper");

const steps = readData(__dirname + "/data.txt").split("\n");

/**
 * Part #1
 */
const part1 = () => {
  let [x, y] = [0, 0];

  for (const step of steps) {
    switch (step[0]) {
      case "u":
        y += +step.replace("up ", "");
        break;
      case "d":
        y -= +step.replace("down ", "");
        break;
      default:
        x += +step.replace("forward ", "");
        break;
    }
  }

  return Math.abs(x * y);
};

/**
 * Part #2
 */
const part2 = () => {
  let [x, y, aim] = [0, 0, 0];

  for (const step of steps) {
    switch (step[0]) {
      case "u":
        aim -= +step.replace("up ", "");
        break;
      case "d":
        aim += +step.replace("down ", "");
        break;
      default:
        const tmp = +step.replace("forward ", "");
        x += tmp;
        y -= tmp * aim;
        break;
    }
  }

  return Math.abs(x * y);
};

console.log(part2());
