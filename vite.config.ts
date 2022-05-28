import "dotenv/config";

import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";
import { minify } from "terser";

const compiledInlineJS = getCompiledJS("src/inline/index");

const frontEndHost = {
  port: 3000,
};

export default defineConfig({
  server: {
    watch: {
      ignored: ["**/tsconfig.json"],
    },
    port: frontEndHost.port,
  },
  resolve: {
    alias: [{ find: "_", replacement: path.resolve(process.cwd(), "src") }],
  },
  plugins: [
    react(),
    pages(),
    {
      name: "add-inline-to-html",
      transformIndexHtml: async (html: string): Promise<string> => {
        let minifiedJS = compiledInlineJS;
        try {
          const minifiedJSResult = await minify(compiledInlineJS, {
            format: { ascii_only: true },
            ecma: 5,
            ie8: true,
            safari10: true,
          });
          minifiedJS = minifiedJSResult?.code ?? compiledInlineJS;
        } catch {
          //
        }
        return html.replace("<script ", `<script>${minifiedJS}</script>\n    <script `);
      },
      enforce: "post",
      apply: "build",
    },
  ],
});

function getCompiledJS(filePath: string): string {
  const outputJSPath = path.join(process.cwd(), `${filePath}.js`);
  try {
    execSync(`npx tsc ./${filePath}.ts`);
  } catch {
    //
  }
  if (!fs.existsSync(outputJSPath)) {
    throw new Error(`Failed to generate ${outputJSPath}`);
  }
  const compiledJS = fs.readFileSync(outputJSPath, "utf8");
  fs.unlinkSync(outputJSPath);
  return compiledJS;
}
