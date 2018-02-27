const puppeteer = require("puppeteer");

test("first test", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  await page.waitForSelector(".App-title");
  browser.close();
});
