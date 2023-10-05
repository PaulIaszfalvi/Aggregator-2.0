const axios = require('axios');
const fs = require('fs').promises;

async function scanFile() {
  try {
    const file = require("./textFiles/links.json")
    const dataArray = [];

    for (const site of file.sites) {
      if (site.title === 'reddit') {
        const promises = site.subs.map(async (sub) => {
          const data = await fetchRedditData(sub);
          dataArray.push([sub, data]);
        });

        await Promise.all(promises);
      } else if (site.title === 'ycombinator') {
        // get y combinator
      } else {
        // throw error
      }
    }

    return { dataArray };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function fetchRedditData(sub) {
  try {
    const response = await axios.get(`https://www.reddit.com/r/${sub}.json`);
    const jsonData = response.data;

    const myArray = jsonData.data.children.slice(0, 15).map((child) => {
      const childData = child.data;
      const title = childData ? childData.title : undefined;
      const user = childData ? childData.author : undefined;
      const score = childData ? childData.score : undefined;
      const permaLink = childData ? `https://www.reddit.com${childData.permalink}` : undefined;
      const selftext = childData ? childData.selftext : undefined;
      const sourceLink = childData ? childData.url : undefined;

      return {
        title,
        user,
        score,
        selftext,
        sourceLink,
        permaLink,
      };
    });

    return myArray;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = { scanFile };
