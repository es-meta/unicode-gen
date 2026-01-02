const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const runner = yargs
  .scriptName("unicode-gen")
  .usage("Usage: $0 -p [property-name] -o [output-file]")
  .example(
    "$0 -u 17.0.0 -p ID_Start -o id_start.json",
  )
  .option("property", {
    alias: "p",
    describe: "The property name of Unicode",
    type: "string",
    nargs: 1,
  })
  .requiresArg("property")
  .option("unicode-version", {
    alias: "u",
    describe: "The unicode version",
    type: "string",
    default: "17.0.0",
    nargs: 1,
  })
  .option("out", {
    alias: "o",
    describe: "The output filename",
    type: "string",
    nargs: 1,
  })
  .alias("help", "h")
  .version("1.0.0")
  .alias("version", "v")
  .wrap(80);

function error(msg) {
  console.error(`[ERROR] ${msg}`);
  process.exit();
}

module.exports = function getArgv(args) {
  const argv = runner.parse(hideBin(args));
  const { property, unicodeVersion, out } = argv;
  if (property === undefined) {
    error("Please input Unicode property with `-p`\n");
  }
  const { versions } = require("./data")
  if (versions.indexOf(unicodeVersion) === -1) {
    console.log("- possible Unicode version list:")
    console.log(versions)
    error(`Invalid unicode version: ${unicodeVersion}`);
  }
  if (out === undefined) argv.out = `${property}.json`;
  return argv
}
