<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

## Repo Filter app

This application permits you to enter a Github username and view a list of repositories in that user's Github account.

You may also filter the list of repositories by name by typing some text into the filter text box.

The application has a light mode and a dark mode, which you can toggle between by clicking on the toggle button.
Your preference is saved and persists between page refreshes.

## Installation & Startup

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
- `deploy` deploys the application to a server
- `test` runs the test suite with Karma, and displays test coverage
- `lint` runs the linter for the project

## Development dependency configs

For most of the development dependencies, the configuration is in `package.json`.

## Credits
[![](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

This application was built using a simple application template provided by the Open-wc Starter App, and follows open-wc recommendations.
