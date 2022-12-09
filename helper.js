const { readFileSync } = require("fs");

const readData = (path) => {
  return readFileSync(path, {
    encoding: "utf-8",
  });
};

module.exports = {
  readData,
};
