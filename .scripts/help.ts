#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "node:fs/promises";
import path from "node:path";
import { getPackageRoot } from "./lib/package";

const bold = (str: string): string => {
  return `\u001B[1m${str}\u001B[0m`;
};
const yellow = (str: string): string => {
  return `\u001B[33m${str}\u001B[0m`;
};
const red = (str: string): string => {
  return `\u001B[31m${str}\u001B[0m`;
};
const faded = (str: string): string => {
  return `\u001B[2m${str}\u001B[0m`;
};

const main = async () => {
  const packageRoot = await getPackageRoot();

  try {
    const packageJSON: {
      scripts: {
        [key: string]: string;
      };
      [key: string]: unknown;
    } = JSON.parse(await fs.readFile(path.join(packageRoot, "package.json"), "utf8"));
    const map = new Map();
    for (const [k, v] of Object.entries(packageJSON.scripts)) {
      const isHelp = k.endsWith(":help");
      const kTrimmed = isHelp ? k.slice(0, -5) : k;
      const pair = map.get(kTrimmed) ?? [null, null];
      pair[isHelp ? 0 : 1] = isHelp ? v.slice(6, -1) : v;
      map.set(kTrimmed, pair);
    }
    console.log(`Available scripts (${bold(yellow("npm run"))} ...):`);
    console.log(
      [...map.entries()]
        .filter(([script]) => {
          return script !== "help";
        })
        .map(([script, [help, command]]) => {
          return `  ${bold(yellow(script))}\n    ${
            help ? help : red(`Missing help text; add "${script}:help" to package.json`)
          }\n    ${
            command
              ? faded(command.split(" && ").join("\n      && "))
              : red("Not implemented")
          }`;
        })
        .join("\n\n")
    );

    try {
      const statNodeModules = await fs.stat(path.join(packageRoot, "node_modules"));
      if (!statNodeModules.isDirectory()) {
        throw new Error("node_modules is not a directory");
      }
    } catch {
      console.log(
        `\n${red(`You probably need to install dependencies with "`)}${red(
          bold(`npm install`)
        )}${red('"')}`
      );
    }

    try {
      const linkPath = await fs.readlink(path.join(packageRoot, ".git/hooks"));
      if (linkPath !== "../.husky") {
        throw new Error("git hooks not correctly set up");
      }
    } catch {
      console.log(
        `\n${red(`You probably need to install git hooks with "`)}${red(
          bold(`npm run prepare`)
        )}${red('"')}`
      );
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
