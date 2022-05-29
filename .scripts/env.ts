import dotenv, { DotenvParseOutput } from "dotenv";
import path from "node:path";
import { getPackageRoot } from "./lib/package";

// This should only be used in build scripts and devtools
// To access env vars inside the ./web/src dir, use:
// import.meta.env.ENV_VAR_NAME

export const getEnv = (): Record<string, string> => {
  const exampleEnvResult = dotenv.config({
    path: path.join(getPackageRoot(), ".env.example"),
  }) as { error: Error } | { parsed: DotenvParseOutput };
  if ("error" in exampleEnvResult) {
    throw new Error(
      `Require valid .env.example file:\n${exampleEnvResult.error.message}`
    );
  }

  let envVarFile = {};
  try {
    envVarFile =
      dotenv.config({
        path: path.join(getPackageRoot(), ".env"),
      }).parsed ?? {};
  } catch {
    //
  }

  const allEnv: Record<string, string | undefined> = {
    ...envVarFile,
  };

  const validEnvVarNames = Object.keys(exampleEnvResult.parsed);
  const safeEnv: Record<string, string> = {};
  for (const envVarName of validEnvVarNames) {
    if (typeof allEnv[envVarName] === "string") {
      safeEnv[envVarName] = allEnv[envVarName];
    } else {
      throw new TypeError(
        `Expected variable '${envVarName}' to be defined in .env\nEither:\n  - add it to .env\n  - remove it from .env.example (if it's no longer being used)`
      );
    }
  }

  return safeEnv;
};
