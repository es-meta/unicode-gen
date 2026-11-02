#!/usr/bin/env node

function onFatalError(error, origin) {
  process.exitCode = 2;
  const { version } = require("../package.json");
  console.error(`
[unicode-gen v${version}] Something went wrong! :(
${error} ${origin}`);
}

(async () => {
  process.on("uncaughtException", onFatalError);
  process.on("unhandledRejection", onFatalError);
  process.exitCode = await require("../dist/index").execute(process.argv);
})().catch(onFatalError);
