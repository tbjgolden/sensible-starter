#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "node:fs/promises";
import path from "node:path";
import dotenv, { DotenvParseOutput } from "dotenv";
import { getPackageRoot } from "./lib/package";
import dedent from "dedent";

const generatedRegex =
  /\/\*\s*GENERATED-START[\S\s]*?(\/\*\s*GENERATED-END[\S\s]*?(\*\/))/;

const main = async () => {
  const packageRoot = await getPackageRoot();

  const exampleEnvResult = dotenv.config({
    path: path.join(getPackageRoot(), ".env.example"),
  }) as { error: Error } | { parsed: DotenvParseOutput };
  if ("error" in exampleEnvResult) {
    throw new Error(
      `Require valid .env.example file:\n${exampleEnvResult.error.message}`
    );
  }

  const viteEnvFilePath = path.join(packageRoot, "src/vite-env.d.ts");
  const prevViteEnvFile = await fs.readFile(viteEnvFilePath, "utf8");

  const generatedMatch = prevViteEnvFile.match(generatedRegex);

  const newGenerated =
    "/* GENERATED-START (DO NOT EDIT) */\n" +
    dedent`
      interface ImportMetaEnv {${Object.keys(exampleEnvResult.parsed)
        .map((varName) => {
          return `
        readonly ${varName}: string;`;
        })
        .join("")}
      }

      interface ImportMeta {
        readonly env: ImportMetaEnv;
      }
    ` +
    "\n/* GENERATED-END */\n";

  const newFileContent = generatedMatch
    ? `${prevViteEnvFile.slice(
        0,
        generatedMatch.index
      )}${newGenerated}${prevViteEnvFile.slice(
        generatedMatch.index + generatedMatch[0].length
      )}`
    : `${prevViteEnvFile}\n${newGenerated}`;

  await fs.writeFile(viteEnvFilePath, newFileContent);
};

main();
