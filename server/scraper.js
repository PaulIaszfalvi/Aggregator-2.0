const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function scanFile() {
  try {
    const linksFilePath = path.join(__dirname, 'textFiles', 'links.json');
    const linksData = await fs.readFile(linksFilePath, 'utf8');
    const file = JSON.parse(linksData);
    const dataArray = [];

    const fetchedDataFilePath = path.join(__dirname, 'textFiles', 'fetchedData.json');
    let shouldFetchData = true;

    try {
      const fetchedData = await fs.readFile(fetchedDataFilePath, 'utf8');
      const { timestamp, data } = JSON.parse(fetchedData);
      const currentTime = Date.now();

      // Check if the timestamp is less than one hour ago
      if (currentTime - timestamp <= 3600000) {
        shouldFetchData = false;
        dataArray.push(...data);
      }
    } catch (error) {
      // File does not exist or is not valid JSON, proceed with fetching data.
    }

    if (shouldFetchData) {
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

      // Save the fetched data to the file with a new timestamp
      const currentTime = Date.now();
      await fs.writeFile(
        fetchedDataFilePath,
        JSON.stringify({ timestamp: currentTime, data: dataArray }, null, 2), // Formatting with 2 spaces
        'utf8'
      );
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
        "title": title,
        "user" : user,
        "score" : score,
        "selftext" : selftext,
        "sourceLink" : sourceLink,
        "premaLink" : permaLink,
      };
    });

    return myArray;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = { scanFile };


