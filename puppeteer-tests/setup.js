require("dotenv").config({ path: __dirname + "/.env" });
const chalk = require("chalk");
const puppeteer = require("puppeteer");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

const DIR = path.join(__dirname, ".jest_puppeteer_global_setup");

let isInitialSetup = true;

module.exports = async function() {
  if (process.env.DEBUG) {
    console.log(chalk.red("DEBUG mode"));
  }
  if (!process.env.DEBUG || (process.env.DEBUG && isInitialSetup)) {
    console.log(chalk.green("Setting up Puppeteer"));
    const browser = await puppeteer.launch(
      process.env.SHOW_BROWSER
        ? {
            headless: false,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
          }
        : { headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] }
    );
    global.__BROWSER__ = browser;
    mkdirp.sync(DIR);
    fs.writeFileSync(path.join(DIR, "wsEndpoint"), browser.wsEndpoint());
  }
  isInitialSetup = false;
};
