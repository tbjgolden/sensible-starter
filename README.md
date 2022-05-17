# Sensible Starter

A tried and tested TypeScript toolchain for building a full-stack app in as little as a day.

Designed to scale to thousands of users.

- Each inclusion evaluated against alternatives.
- Sensible choices enabled by default.
- Integrations with linters, formatters and git hooks.
- Thorough documentation.
- Easy to chop and change config and tools.

## First-time setup

```sh
git clone https://github.com/tbjgolden/sensible-starter.git project-name
cd project-name
npm install
git init                          # reinits git repo
npm run prepare                   # installs git hooks
git add .
git commit -m 'Initial commit'
```

## Usage

For all commands run:

```sh
npm run help
```

To run in dev mode:

```sh
npm run dev
```

To run in prod mode:

```sh
npm run prod
```

<!--
TODOs:

- [ ] Create READMEs
  - [ ] for starter
  - [ ] for user
- [ ] Put a seed.db file in version control

---

- Better alternatives to nivo graphs:
  - chart.js for simple
  - react > requestAnimationFrame > svg for complex

Long-term:

- [ ] add file upload example
-->
