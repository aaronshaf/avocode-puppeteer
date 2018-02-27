const chalk = require("chalk");
const rimraf = require("rimraf");
const path = require("path");

const DIR = path.join(__dirname, ".jest_puppeteer_global_setup");

module.exports = async function() {
  if (process.env.DEBUG == null) {
    console.log(chalk.green("Tearing down Puppeteer"));
    await global.__BROWSER__.close();
    rimraf.sync(DIR);
  }
};
