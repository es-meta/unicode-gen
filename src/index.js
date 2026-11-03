const fs = require("fs");
const getArgv = require("./args");

async function execute(args) {
  const { property, out, unicodeVersion } = getArgv(args);

  async function read(property) {
    let path = `@unicode/unicode-${unicodeVersion}/Binary_Property/${property}/code-points.mjs`;
    console.log(`Trying to load the unicode table from ${path}...`);
    try {
      return (await import(path)).default;
    } catch (e) {
      if (e.code === "ERR_MODULE_NOT_FOUND") {
        console.error(`[ERROR] invalid package name: ${path}`);
        process.exit(1);
      }
      throw e;
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

  const cps = await read(property);
  const result = compress(cps);
  const json = JSON.stringify(result);
  fs.writeFileSync(out, json);
  console.log(`Dumped compressed unicode table to ${out}.`)

  return 0;
}

module.exports = { execute };
