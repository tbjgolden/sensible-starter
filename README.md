<!-- Edit me: start -->

# Sensible Starter

A tried and tested TypeScript toolchain for building a full-stack app in as little as a day.

Designed to scale to thousands of users and be easy to iterate on.

- each inclusion evaluated against alternatives
- sensible choices enabled by default
- integrations with linters, formatters and git hooks
- easy to chop and change config and tools
- thorough documentation

<!--
Starter: notes

- [x] remove error catcher plugin and come [](https://www.bbc.co.uk/sport)up with something better
- [x] attempt to set up vite legacy mode?
- [x] get the sample husky scripts installed? or gitignored?
- [x] fix NODE_ENV variable
- [x] create getEnv fn
  - [ ] remove defaults and rely entirely on env vars
  - [x] compare against .env.example to achieve this
- [ ] remove keystone script
- [ ] upgrade deps
- [ ] fix flex-shrink issues on baseweb components
- [ ] revisit typography (esp font weights etc)
- [ ] replace postcss with sass

---

- [ ] git repo root vs package root
- [ ] load utilities with common use cases
- [ ] form starter hooks

- Better alternatives to nivo graphs:
  - chart.js for simple
  - react > requestAnimationFrame > svg for complex

Long-term:

- [ ] add file upload example
-->

<!-- Edit me: end -->

## First-time setup

```sh
git clone https://github.com/tbjgolden/sensible-starter.git project-name
cd project-name
rm -rf .git                       # wipes starter repo git
npm install
git init                          # inits new repo
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
