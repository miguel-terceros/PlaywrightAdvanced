# Playwright Advanced 🎭

Starter repo for the **"Advanced Playwright" Pluralsight course** — a hands-on playground for leveling up your Playwright skills beyond the basics: page objects, custom fixtures, tags, secrets management, and avoiding common anti-patterns.

The repo ships with a small demo web app (a mock stock trading dashboard) and a suite of TypeScript tests written against it, organized by course module.

## ✨ What's inside

- **A demo app** — a static stock trading + analytics dashboard, served locally with Express.
- **Page Object Model (POM)** examples, including fixture-based composition.
- **Custom Playwright fixtures** for shared setup, JS error detection, and network error assertions.
- **Test tagging** (`@smoke`, `@login`, etc.) for selective test runs.
- **Secrets management** examples using `dotenv` and `@dotenvx/dotenvx` (encrypted `.env` files).
- **Anti-pattern examples** — tests that show what *not* to do, and why.
- Linting and formatting via [Biome](https://biomejs.dev/), including Playwright-specific lint rules.

## 🧰 Tech stack

- [Playwright](https://playwright.dev/) (`@playwright/test`)
- TypeScript
- [Express](https://expressjs.com/) — serves the demo app on `localhost:3000`
- [Biome](https://biomejs.dev/) — linting & formatting
- [dotenvx](https://dotenvx.com/) — encrypted environment variables

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) 18+ (tested with Node 24)
- npm

## 🚀 Getting started

1. **Clone the repo**

   ```bash
   git clone https://github.com/miguel-terceros/PlaywrightAdvanced.git
   cd PlaywrightAdvanced
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Run the tests**

   ```bash
   npm test
   ```

   Playwright automatically starts the demo app (`npm run start`) on `http://localhost:3000` before the test run, via its built-in `webServer` config.

## 🧪 Available scripts

| Command             | Description                                          |
| -------------------- | ----------------------------------------------------- |
| `npm start`          | Runs the demo app standalone (Express, port 3000).     |
| `npm test`           | Runs the full Playwright test suite.                   |
| `npm run smoke`      | Runs only tests tagged `@smoke`.                       |
| `npm run uimode`     | Opens the Playwright UI mode for interactive debugging.|
| `npm run codegen`    | Launches Playwright Codegen to record new tests.       |

## 📁 Project structure

```
├── app/                    # Demo stock trading & analytics web app
├── tests/
│   ├── module1/            # Fundamentals & warm-up exercises
│   └── module2/            # POM, fixtures, tags, secrets, anti-patterns
│       └── pages/          # Page objects, fixtures, and shared types
├── server.js               # Minimal Express server for the demo app
├── playwright.config.ts    # Playwright test runner configuration
├── biome.json              # Linting & formatting rules
└── tsconfig.json           # TypeScript compiler options
```

## 🔐 Environment variables

This project demonstrates secrets handling with `@dotenvx/dotenvx`. A `.env` file (encrypted with a public key) is used to illustrate safer alternatives to hard-coded secrets — see `tests/module2/secrets.test.ts` for the full walkthrough. You won't need to configure anything to run the test suite out of the box.

## 🧹 Linting

```bash
npx biome check .
```

## 📄 License

Licensed under the [ISC License](https://opensource.org/licenses/ISC).
