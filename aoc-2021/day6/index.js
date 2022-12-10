const { readData } = require("../../helper");

const printFishes = (fishes, i) => {
  console.log(
    `After ${i} days:\t${fishes.map((fish) => fish.timer).join(",")}`
  );
};

class Fish {
  constructor(timer) {
    this.timer = timer;
  }

  passDay() {
    this.timer--;
    if (this.timer === -1) {
      this.timer = 6;
      return new Fish(9);
    }
    return undefined;
  }
}

const timers = readData(__dirname + "/data.txt")
  .split(",")
  .map((timer) => +timer);

const part1 = () => {
  const fishes = timers.map((timer) => new Fish(timer));

  for (let i = 1; i <= 80; i++) {
    for (const fish of fishes) {
      const newFish = fish.passDay();
      if (newFish !== undefined) fishes.push(newFish);
    }
  }

  return fishes.length;
};

const timersByIndexToFishes = (timersByIndex) => {
  const fishes = [];
  for (let i = 0; i < timersByIndex.length; i++) {
    for (let k = 0; k < timersByIndex[i]; k++) fishes.push(new Fish(i));
  }

  return fishes;
};

const part2 = () => {
  const timersByIndex = Array(9).fill(0);
  for (const timer of timers) timersByIndex[timer]++;

  let newAmount;
  for (let day = 1; day <= 256; day++) {
    for (let i = 0; i < timersByIndex.length - 1; i++) {
      if (i === 0) newAmount = timersByIndex[i];
      timersByIndex[i] = timersByIndex[i + 1];
    }

    timersByIndex[timersByIndex.length - 1] = newAmount;
    timersByIndex[6] += newAmount;

    // printFishes(build(timersByIndex), day);
  }

  return timersByIndex.reduce((prev, val) => prev + val, 0);
};

console.log(part2());
