const puppeteer = require('puppeteer');
const axios = require('axios'); 


async function fetchData() {
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

    let myArray = [];

    // Extract the title from the JSON data
    for (let i = 0; i < 15; i++) {
      let title = jsonData.data.children[i].data.title;
      let user = jsonData.data.children[i].data.author;
      let score = jsonData.data.children[i].data.score;
      const permalink = jsonData.data.children[i].data.permalink;
      let selftext = jsonData.data.children[i].data.selftext;
      let sourceLink = jsonData.data.children[i].data.url;
      // If the post isn't a discussion, return the link to what it points to instead of the discussion
      if (selftext === "") {
        selftext = jsonData.data.children[i].data.url;
      }

      myArray.push({
        title: title,
        user: user,
        score: score,
        selfText: selftext,
        sourceLink: sourceLink,
      });

      console.log(myArray)
      return JSON.stringify(myArray)     
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = {fetchData};