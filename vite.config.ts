import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import path from "node:path";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";
import { buildSync } from "esbuild";
import { minify } from "terser";

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
        let minifiedJS = getCompiledJS();
        try {
          const minifiedJSResult = await minify(minifiedJS, {
            format: { ascii_only: true },
            ecma: 5,
            ie8: true,
            safari10: true,
          });
          minifiedJS = minifiedJSResult?.code ?? minifiedJS;
        } catch {
          //
        }
        return html.replace("<script ", `<script>${minifiedJS}</script>\n    <script `);
      },
      enforce: "post",
      apply: "build",
    },
    legacy({ modernPolyfills: true }),
  ],
});

function getCompiledJS(): string {
  const buildResult = buildSync({
    entryPoints: ["src/inline/index.ts"],
    target: "es5",
    bundle: true,
    write: false,
  });
  if (buildResult.errors.length > 0) {
    throw new Error(buildResult.errors[0].text);
  } else if (buildResult.outputFiles.length !== 1) {
    throw new Error("Expected 1 output file to have been generated");
  } else {
    return buildResult.outputFiles[0].text;
  }
}
