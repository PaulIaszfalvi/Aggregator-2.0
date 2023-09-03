const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the Reddit URL
    await page.goto('https://www.reddit.com/r/programming.json');

    // Wait for the page to load completely (you can adjust the timeout as needed)
    await page.waitForSelector('body');

    // Extract the JSON data from the page
    const jsonData = await page.evaluate(() => {
      return JSON.parse(document.querySelector('pre').textContent);
    });

    // Close the browser
    await browser.close();

    // Extract the title from the JSON data
    const title = jsonData.data.children[0].data.title;

    console.log('Title:', title);
  } catch (error) {
    console.error('Error:', error);
  }
})();
