<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

## Open-wc Starter App

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Installation & Usage

To install and run this application:

```bash
# Create a local environment-specific config file named .env-config.js
cp .env-config-TEMPLATE.js .env-config.js
# THEN get a Github Personal Access Token and install it in the environment-specific config file

# Use Node.js v12.13.1
nvm use v12.13.1

# Install dependencies
npm install

# Start the app.  It should open in a browser window
npm start
```

## Scripts

- `start` runs the app for development, reloading on file changes
- `start:build` runs the app after it has been built using the build command
- `build` builds the app and outputs it in the `dist` directory
- `test` runs the test suite with Karma, and displays test coverage
- `lint` runs the linter for the project

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
