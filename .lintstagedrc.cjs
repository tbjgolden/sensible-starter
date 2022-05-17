module.exports = {
  "*.{tsx,ts}": [
    "eslint --cache --fix --max-warnings=0 --rule 'no-console: error'",
    "prettier --write",
  ],
  "*.{pcss,css,js,json,html}": ["prettier --write"],
  ".vscode/settings.json": ["ts-node ./.scripts/vscCheck.ts"],
};
