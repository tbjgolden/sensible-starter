#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fromMarkdown } from "mdast-util-from-markdown";
import HTMLToJSX from "htmltojsx";
import dedent from "dedent";
import yaml, { JSON_SCHEMA } from "js-yaml";
import prettier from "prettier";
import { ESLint } from "eslint";
import { frontmatter } from "micromark-extension-frontmatter";
import { frontmatterFromMarkdown } from "mdast-util-frontmatter";
const args = new Set(process.argv.slice(2));
if (args.has("-h") || args.has("--help")) {
  console.log(dedent`
    md-to-tsx cli help:
      -h, --help  | this message
      -f, --force | overwrite ALL tsx files
  `);
  process.exit(0);
}
const eslint = new ESLint({
  cwd: path.join(path.dirname(fileURLToPath(import.meta.url)), ".."),
});
const eslintFix = async (str, filePath) => {
  const results = await eslint.lintText(str, {
    filePath,
    warnIgnored: true,
  });
  return results.length === 1 ? results[0].source ?? str : str;
};
const prettierFormat = async (str, filepath) => {
  const config = await prettier.resolveConfig(filepath);
  return prettier.format(str, {
    ...config,
    filepath,
  });
};
const HTMLToJSXConverter = new HTMLToJSX({
  createClass: false,
});
// overwrites all
const shouldForce = args.has("-f") || args.has("--force");
const pagesRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/pages");
const templatePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/utilities/markdownTemplate.tsx"
);
main();
async function main() {
  const pagesSet = new Set(await getFiles(pagesRoot));
  for (const file of pagesSet.values()) {
    if (file.endsWith(".md")) {
      const tsxFile = file.slice(0, -3) + ".tsx";
      if (!shouldForce && pagesSet.has(tsxFile)) {
        console.log(dedent`
            Not converting '${path.relative(pagesRoot, file)}'
              (tsx file already exists)
          `);
      } else {
        const fileNameBase = path.relative(path.dirname(file), file).slice(0, -3);
        const componentName = fileNameBase
          .split("-")
          .map(
            (frag) => `${frag.slice(0, 1).toUpperCase()}${frag.slice(1).toLowerCase()}`
          )
          .join("");

        const [tsx, frontMatterArray] = mdBlockToTSX(
          fromMarkdown(await fs.readFile(file), "utf8", {
            extensions: [frontmatter(["yaml"])],
            mdastExtensions: [frontmatterFromMarkdown(["yaml"])],
          })
        );
        // currently unused but could be adapted to make this generation more powerful
        const _mergedFrontMatter = frontMatterArray.reduce((a, b) => {
          return { ...a, ...b };
        }, {});
        const template = await fs.readFile(templatePath, "utf8");

        const withoutExtraImports = template
          .replace(`<Slot />`, tsx)
          .replace(/\/\*+\s*THIS FILE IS A TEMPLATE[\s\S]*?(?:\*\/)/g, "")
          .replace(/ComponentName/g, componentName);

        const withImports = withoutExtraImports.replace(
          `import Slot from "slot";\n`,
          withoutExtraImports.includes("</Link>")
            ? `import { Link } from "_c/Link";\n`
            : ""
        );

        await fs.writeFile(
          tsxFile,
          await prettierFormat(await eslintFix(withImports, tsxFile), tsxFile)
        );
        console.log(dedent`
            ${path.relative(pagesRoot, file)} → ${path.relative(pagesRoot, tsxFile)}
          `);
      }
    }
  }
}
async function getFiles(filePath) {
  const subdirs = await fs.readdir(filePath);
  const allPaths = await Promise.all(
    subdirs.map(async (subdir) => {
      const newPath = path.resolve(filePath, subdir);
      const stat = await fs.stat(newPath);
      if (stat.isDirectory()) {
        return getFiles(newPath);
      } else if (stat.isFile()) {
        const isMarkdown = newPath.endsWith(".md");
        const isTSX = newPath.endsWith(".tsx");
        if (isMarkdown || isTSX) {
          return newPath;
        }
      }
      return [];
    })
  );
  return allPaths.flat();
}
const phrasingContentArrayToTSX = (phrasingContentArray) => {
  let str = "";
  for (const phrasingContent of phrasingContentArray) {
    str += phrasingContentToTSX(phrasingContent);
  }
  return str;
};
const phrasingContentToTSX = (p) => {
  switch (p.type) {
    case "text": {
      return escapeHtml(p.value);
    }
    case "break": {
      return "<br />";
    }
    case "strong": {
      return `<strong>${phrasingContentArrayToTSX(p.children)}</strong>`;
    }
    case "emphasis": {
      return `<em>${phrasingContentArrayToTSX(p.children)}</em>`;
    }
    case "delete": {
      return `<del>${phrasingContentArrayToTSX(p.children)}</del>`;
    }
    case "link": {
      return `<Link to="${p.url}">${phrasingContentArrayToTSX(p.children)}</Link>`;
    }
    case "inlineCode": {
      return `<code>${escapeJSString(p.value)}</code>`;
    }
    case "html": {
      return HTMLToJSXConverter.convert(p.value);
    }
    case "image": {
      return `<img src="${p.url}" alt="${p.alt ?? ""}" />`;
    }
    default: {
      return ``;
    }
  }
};

const mdBlockToTSX = (root) => {
  const frontMatterArray = [];
  let output = "";
  for (const c of root.children) {
    // console.log(child.type);
    switch (c.type) {
      case "heading": {
        const tsx = phrasingContentArrayToTSX(c.children);
        const uniqueId = headingContentToId(tsx);
        output += `<h${c.depth}${uniqueId ? ` id="${uniqueId}"` : ""}>${tsx}</h${
          c.depth
        }>`;
        break;
      }
      case "paragraph": {
        output += `<p>${phrasingContentArrayToTSX(c.children)}</p>`;
        break;
      }
      case "text":
      case "break":
      case "strong":
      case "emphasis":
      case "delete":
      case "link":
      case "inlineCode":
      case "image": {
        output += `<p>${phrasingContentToTSX(c)}</p>`;
        break;
      }
      case "html": {
        output += phrasingContentToTSX(c);
        break;
      }
      case "code": {
        output += `<pre><code>${escapeJSString(c.value)}</code></pre>`;
        break;
      }
      case "thematicBreak": {
        output += "<hr />";
        break;
      }
      case "yaml": {
        try {
          const parsedData = yaml.load(c.value, {
            schema: JSON_SCHEMA,
          });
          if (typeof parsedData === "object" && parsedData !== null) {
            frontMatterArray.push(parsedData);
          }
        } catch (error) {
          if (error instanceof Error) {
            frontMatterArray.push({ yamlError: error.message });
          }
        }
        break;
      }
      case "blockquote": {
        output += `<blockquote>${mdBlockToTSX(c)[0]}</blockquote>`;
        break;
      }
      case "list": {
        const tag = c.ordered ? "ol" : "ul";
        output += `<${tag}>`;
        for (const cc of c.children) {
          output += `<li>${mdBlockToTSX(cc)[0]}</li>`;
        }
        output += `</${tag}>`;
        break;
      }
      case "listItem": {
        output += `<li>${mdBlockToTSX(c)[0]}</li>`;
        break;
      }
    }
  }
  return [output, frontMatterArray];
};
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/{/g, "&lbrace;")
    .replace(/}/g, "&rbrace;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
const escapeJSString = (unsafe) => {
  return `{\`${unsafe.replace(/\\/g, "\\\\").replace(/`/g, "\\`")}\`}`;
};
const TSX_REGEX = /<([a-zA-Z][a-zA-Z0-9]+)[^>]*>([\s\S]*?)(<\/\1>)/g;
const APOS_REGEX = /\'+/g;
const NON_ALPHANUM = /[^a-zA-Z0-9]+/g;
const SPACE = / /g;
const headingContentToId = (content) => {
  return content
    .replace(TSX_REGEX, "$2")
    .slice(0, 128)
    .replace(APOS_REGEX, "")
    .replace(NON_ALPHANUM, " ")
    .trim()
    .replace(SPACE, "-")
    .toLowerCase();
};
