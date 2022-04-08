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
  rules: {
    "arrow-body-style": ["warn", "always"],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "baseui/link",
            message: "Use \"import { Link } from '_c/Link'\" instead.",
          },
          {
            name: "react-router-dom",
            importNames: ["Link"],
            message: "Use \"import { Link } from '_c/Link'\" instead.",
          },
        ],
      },
    ],
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
  },
  overrides: [
    {
      files: "*.js",
      rules: {
        "unicorn/prefer-module": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: "src/pages/*.tsx",
      rules: {
        "unicorn/filename-case": [
          "error",
          {
            case: "kebabCase",
          },
        ],
      },
    },
  ],
};
