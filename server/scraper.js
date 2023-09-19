const axios = require('axios');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function captureScreenshot(url, outputFilePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.setViewport({ width: 1200, height: 800 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: outputFilePath, fullPage: true });
  } finally {
    await browser.close();
  }
}

async function fetchData() {
  try {
    const response = await axios.get('https://www.reddit.com/r/learnprogramming.json');
    const jsonData = response.data;

    const myArray = await Promise.all(jsonData.data.children.slice(0, 15).map(async (child) => {
      let childData = child.data;
      let title = childData ? childData.title : undefined;
      let user = childData ? childData.author : undefined;
      let score = childData ? childData.score : undefined;
      const permaLink = childData ? `https://www.reddit.com${childData.permalink}` : undefined;
      let selftext = childData ? childData.selftext : undefined;
      let sourceLink = childData ? childData.url : undefined;

      if (!selftext && sourceLink) {
        // Capture a screenshot and store it as a file
        const screenshotFilePath = `./screenshots/${childData.id}.png`;
        await captureScreenshot(sourceLink, screenshotFilePath);

        // Convert the image to a Base64 data URL
        const imageBuffer = await fs.readFile(screenshotFilePath);
        const imageBase64 = imageBuffer.toString('base64');
        const imageExtension = path.extname(screenshotFilePath);
        const dataURL = `data:image/${imageExtension};base64,${imageBase64}`;

        // Set selftext to the image data URL
        selftext = dataURL;

        // Delete the screenshot file
        await fs.unlink(screenshotFilePath);
      }

      return {
        title: title,
        user: user,
        score: score,
        selfText: selftext,
        sourceLink: sourceLink,
        permaLink: permaLink,
      };
    }));

    return myArray;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = { fetchData };
