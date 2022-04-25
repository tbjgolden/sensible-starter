#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const bold = (str) => `\x1b[1m${str}\x1b[0m`;
const yellow = (str) => `\x1b[33m${str}\x1b[0m`;
const red = (str) => `\x1b[31m${str}\x1b[0m`;
const grey = (str) => `\x1b[2m${str}\x1b[0m`;

const main = async () => {
  try {
    const packageJSON = JSON.parse(
      await fs.readFile(path.join(projectRoot, "package.json"), "utf8")
    );
    const map = new Map();
    for (const [k, v] of Object.entries(packageJSON.scripts)) {
      const isHelp = k.startsWith("help:");
      const kTrimmed = isHelp ? k.slice(5) : k;
      const pair = map.get(kTrimmed) ?? [null, null];
      pair[isHelp ? 0 : 1] = isHelp ? v.slice(6, -1) : v;
      map.set(kTrimmed, pair);
    }
    console.log(`Available scripts (${bold(yellow("npm run"))} ...):`);
    console.log(
      Array.from(map.entries())
        .filter(([script]) => script !== "help")
        .map(([script, [help, command]]) => {
          return `  ${bold(yellow(script))}\n    ${
            help ? help : red(`Missing help text; add "help:${script}" to package.json`)
          }\n    ${
            command
              ? grey(command.split(" && ").join("\n      && "))
              : red("Not implemented")
          }`;
        })
        .join("\n\n")
    );

    try {
      const statNodeModules = await fs.stat(path.join(projectRoot, "node_modules"));
      if (!statNodeModules.isDirectory()) {
        throw new Error();
      }
    } catch (err) {
      console.log(
        `\n${red(`You probably need to install dependencies with "`)}${red(
          bold(`npm install`)
        )}${red('"')}`
      );
    }

    try {
      const linkPath = await fs.readlink(path.join(projectRoot, ".git/hooks"));
      if (linkPath !== "../.husky") {
        throw new Error();
      }
    } catch (err) {
      console.log(
        `\n${red(`You probably need to install git hooks with "`)}${red(
          bold(`npm run prepare`)
        )}${red('"')}`
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
