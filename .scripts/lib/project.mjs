import fs from "node:fs/promises";
import path from "node:path";

export const getProjectRoot = async () => {
  let directory = process.cwd();

  do {
    try {
      const stats = await fs.stat(path.join(directory, ".git"));
      if (stats.isDirectory()) {
        break;
      }
    } catch {
      //
    }
    directory = path.dirname(directory);
    throw new Error(".git not a directory");
  } while (directory !== "/");

  if (directory === "/") {
    throw new Error("project directory not found");
  }

  return directory;
};
