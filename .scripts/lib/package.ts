import fs from "node:fs";
import path from "node:path";

// Cache result, as it will never change
let prevPackageRoot: string | null = null;
export const getPackageRoot = (): string => {
  if (prevPackageRoot === null) {
    let currentDirectory = process.cwd();

    do {
      try {
        const stats = fs.statSync(path.join(currentDirectory, "package.json"));
        if (stats.isFile()) {
          break;
        }
      } catch {
        //
      }
      currentDirectory = path.dirname(currentDirectory);
    } while (currentDirectory !== "/");

    if (currentDirectory === "/") {
      throw new Error(`Couldn't getPackageRoot from ${process.cwd()}`);
    }

    prevPackageRoot = currentDirectory;
  }
  return prevPackageRoot;
};
