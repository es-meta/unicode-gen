const fs = require("fs");
const getArgv = require("./args");

async function execute(args) {
  const { property, out, unicodeVersion } = getArgv(args);

  function read(property) {
    let path = `@unicode/unicode-${unicodeVersion}/Binary_Property/${property}/code-points.js`;
    try {
      console.log(`Trying to load the unicode table from ${path}...`);
      return require(path);
    } catch {
      console.error(`[ERROR] invalid package name`);
      process.exit(1);
    }
  }

  function compress(cps) {
    let result = [];
    let cur;
    let prev = -1;
    for (let cp of cps) {
      if (prev == -1 || prev + 1 != cp) {
        cur = [cp,cp];
        result.push(cur);
      } else {
        cur[1] = cp;
      }
      prev = cp;
    }
    for (let i = 0; i < result.length; i++) {
      let cur = result[i];
      if (cur[0] == cur[1]) result[i] = cur[0];
    }
    return result;
  }

  const cps = read(property);
  const result = compress(cps);
  const json = JSON.stringify(result);
  fs.writeFileSync(out, json);
  console.log(`Dumped compressed unicode table to ${out}.`)

  return 0;
}

module.exports = { execute };
