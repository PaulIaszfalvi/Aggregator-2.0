const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const puppeteer = require("puppeteer");
const { MongoClient, ServerApiVersion } = require('mongodb');

const dotenv = require('dotenv');
require('dotenv').config();
const { mongodbUri } = require('./server'); // Adjust the import path as needed

async function scanFile(mongodbUri) {
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

            // Ensure 'data' is an array of valid document objects
            const validData = data.map((item) => ({
              category: sub, 
              data: item
            }));

            dataArray.push(...validData);
          });

          await Promise.all(promises);
        } else if (site.title === 'ycombinator') {
          const data = await fetchYCombinatorData(site.main); // Pass the main URL

          // Ensure 'data' is an array of valid document objects
          const validData = data.map(item => ({
            category: 'ycombinator',
            data: item
          }));

          dataArray.push(...validData);
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

    const client = new MongoClient(mongodbUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    const db = client.db(); // Get the default database or specify a database name if needed
    const collection = db.collection('your_collection_name'); // Replace with your collection name

    console.log(dataArray)
    // Flatten the dataArray to remove nested arrays
    const flattenedArray = dataArray.flat(1);
    console.log(flattenedArray)
    // Insert the flattened array into the MongoDB collection
    const result = await collection.insertMany(flattenedArray);

    console.log(`Inserted ${result.insertedCount} documents into the collection.`);

    // Close the MongoDB connection
    await client.close();

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
        "selfText" : selftext,
        "sourceLink" : sourceLink,
        "permaLink" : permaLink,
      };
    });

    return myArray;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function fetchYCombinatorData() {
  try {
    const browser = await puppeteer.launch({
      // headless: false,
    });
    const page = await browser.newPage();

    const subredditURL = `https://news.ycombinator.com`;
    await page.goto(subredditURL, {
      waitUntil: "networkidle0",
    });

    const items = await page.evaluate(() => {
      const itemsArray = Array.from(document.querySelectorAll('tr.athing'));

      return itemsArray.slice(0, 15).map((item) => {
        const titleElement = item.querySelector('td.title span.titleline a');
        const scoreElement = item.nextElementSibling.querySelector('span.score');
        const userElement = item.nextElementSibling.querySelector('a.hnuser');
        const ageElement = item.nextElementSibling.querySelector('span.age');

        const title = titleElement ? titleElement.textContent.trim() : '';
        const link = titleElement ? titleElement.href : '';
        const score = scoreElement ? scoreElement.textContent.trim() : '';
        const user = userElement ? userElement.textContent.trim() : '';
        const age = ageElement ? ageElement.getAttribute('title') : '';

        return {
          title,
          link,
          score,
          user,
          age,
        };
      });
    });

    await browser.close();
   
    return items;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

module.exports = { scanFile };


