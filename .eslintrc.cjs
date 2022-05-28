const fs = require("fs");
const path = require("path");

// Use gitignore as eslintignore (single source of truth)
const ignorePatterns = fs
  .readFileSync(path.join(__dirname, ".gitignore"), "utf8")
  .split("\n")
  .map((line) => {
    return line.split("#")[0].trim();
  })
  .filter((withoutComment) => {
    return withoutComment.length > 0;
  });

module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  plugins: ["react", "unicorn", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns,
  rules: {
    "arrow-body-style": ["warn", "always"],
    "no-array-constructor": "off",
    "no-console": "warn",
    //
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": [1, { forbid: [">", "}"] }],
    //
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "baseui/link",
            message: "Use \"import { Link } from '_/components/Link'\" instead.",
          },
          {
            name: "react-router-dom",
            importNames: ["Link"],
            message: "Use \"import { Link } from '_/components/Link'\" instead.",
          },
          {
            name: "baseui/modal",
            message: "Use \"import { Modal } from '_/components/Modal'\" instead.",
          },
          {
            name: "baseui/drawer",
            message: "Use \"import { Drawer } from '_/components/Drawer'\" instead.",
          },
        ],
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^(_|error$)",
      },
    ],
    "@typescript-eslint/no-array-constructor": ["error"],
    //
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: ["-env\\.d\\.ts$"],
      },
    ],
    "unicorn/no-null": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        extendDefaultReplacements: false,
        replacements: {
          def: { defer: true, deferred: true, define: true, definition: true },
          dir: { direction: true, directory: true },
          docs: { documentation: true, documents: true },
          dst: { daylightSavingTime: true, destination: true, distribution: true },
          e: { error: true, event: true },
          rel: { related: true, relationship: true, relative: true },
          res: { response: true, result: true },
        },
      },
    ],
    "unicorn/prefer-switch": ["error", { minimumCases: 5 }],
    "unicorn/no-new-array": "off",
  },
  overrides: [
    {
      files: ["*.cjs"],
      rules: {
        "unicorn/prefer-module": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: "src/pages/**/*.tsx",
      rules: {
        "unicorn/filename-case": [
          "error",
          {
            case: "kebabCase",
          },
        ],
      },
    },
    {
      files: "src/inline/index.ts",
      rules: {
        "no-var": "off",
        "no-restricted-imports": [
          "error",
          {
            patterns: ["*"],
          },
        ],
        "unicorn/consistent-destructuring": "off",
        "unicorn/no-array-for-each": "off",
        "unicorn/no-array-reduce": "off",
        "unicorn/no-empty-file": "off",
        "unicorn/no-for-loop": "off",
        "unicorn/no-new-array": "off",
        "unicorn/no-thenable": "off",
        "unicorn/no-this-assignment": "off",
        "unicorn/prefer-add-event-listener": "off",
        "unicorn/prefer-array-find": "off",
        "unicorn/prefer-array-flat": "off",
        "unicorn/prefer-array-flat-map": "off",
        "unicorn/prefer-array-index-of": "off",
        "unicorn/prefer-array-some": "off",
        "unicorn/prefer-at": "off",
        "unicorn/prefer-code-point": "off",
        "unicorn/prefer-date-now": "off",
        "unicorn/prefer-default-parameters": "off",
        "unicorn/prefer-dom-node-append": "off",
        "unicorn/prefer-dom-node-dataset": "off",
        "unicorn/prefer-dom-node-remove": "off",
        "unicorn/prefer-dom-node-text-content": "off",
        "unicorn/prefer-export-from": "off",
        "unicorn/prefer-includes": "off",
        "unicorn/prefer-json-parse-buffer": "off",
        "unicorn/prefer-keyboard-event-key": "off",
        "unicorn/prefer-math-trunc": "off",
        "unicorn/prefer-modern-dom-apis": "off",
        "unicorn/prefer-modern-math-apis": "off",
        "unicorn/prefer-module": "off",
        "unicorn/prefer-native-coercion-functions": "off",
        "unicorn/prefer-negative-index": "off",
        "unicorn/prefer-node-protocol": "off",
        "unicorn/prefer-number-properties": "off",
        "unicorn/prefer-object-from-entries": "off",
        "unicorn/prefer-optional-catch-binding": "off",
        "unicorn/prefer-prototype-methods": "off",
        "unicorn/prefer-query-selector": "off",
        "unicorn/prefer-reflect-apply": "off",
        "unicorn/prefer-regexp-test": "off",
        "unicorn/prefer-set-has": "off",
        "unicorn/prefer-spread": "off",
        "unicorn/prefer-string-replace-all": "off",
        "unicorn/prefer-string-slice": "off",
        "unicorn/prefer-string-starts-ends-with": "off",
        "unicorn/prefer-string-trim-start-end": "off",
        "unicorn/prefer-switch": "off",
        "unicorn/prefer-ternary": "off",
        "unicorn/prefer-top-level-await": "off",
        "unicorn/prefer-type-error": "off",
      },
    },
  ],
};
