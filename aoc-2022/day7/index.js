const { readData } = require("../helper");

const MAX_SIZE = 70000000;
const REQ_SIZE = 30000000;

class Dir {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.files = [];
    this.subs = [];
  }

  calcSize() {
    return (
      this.files.reduce((prev, file) => prev + file.size, 0) +
      this.subs.reduce((prev, dir) => prev + dir.calcSize(), 0)
    );
  }

  appendFile(name, size) {
    this.files.push({ name, size });
  }

  appendSub(dir) {
    this.subs.push(dir);
  }

  /**
   * Part #1
   */
  calSumSmallerThan100000() {
    const size = this.calcSize();

    let sum = size <= 100000 ? size : 0;
    sum += this.subs.reduce(
      (prev, dir) => prev + dir.calSumSmallerThan100000(),
      0
    );

    return sum;
  }

  /**
   * Part #2
   */
  calcToDelete(free = MAX_SIZE - this.calcSize()) {
    let min = this.calcSize();

    for (const dir of this.subs) {
      const size = dir.calcToDelete(free);
      if (free + size >= REQ_SIZE) min = Math.min(size, min);
    }

    return min;
  }
}

const data = readData(__dirname + "/data.txt").split("\n");

const root = new Dir("/", null);
let currentDir = root;

for (const command of data) {
  // Switch dir
  if (command.slice(0, 4) === "$ cd") {
    const regCommand = new RegExp(/^\$ cd (.+)$/);
    const [_, switchDir] = command.match(regCommand);

    switch (switchDir) {
      case "/":
        currentDir = root;
        break;
      case "..":
        currentDir = currentDir.parent;
        break;
      default:
        currentDir = currentDir.subs.find((dir) => dir.name === switchDir);
        break;
    }

    // Create dir
  } else if (command.slice(0, 3) === "dir") {
    const regCommand = new RegExp(/^dir (.+)$/);
    const [_, newDir] = command.match(regCommand);
    currentDir.appendSub(new Dir(newDir, currentDir));

    // Create file
  } else if (Number.isInteger(+command.charAt(0))) {
    const regCommand = new RegExp(/^([0-9]+) (.+)$/);
    const [_, newFileSize, newFile] = command.match(regCommand);
    currentDir.appendFile(newFile, +newFileSize);
  }
}
