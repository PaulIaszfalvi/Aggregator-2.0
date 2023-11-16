const axios = require('axios');
const fs = require('fs').promises;
const { MongoClient, ServerApiVersion } = require('mongodb');
const puppeteer = require('puppeteer');
require('dotenv').config();
const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

async function scanFile(mongodbUri) {
  try {
    const linksFilePath = process.env.LINKS_FILE_PATH;
    const fetchedDataFilePath = process.env.FETCHED_DATA_FILE_PATH;

    const linksData = await fs.readFile(linksFilePath, 'utf8');
    const file = JSON.parse(linksData);

    // Extract the database name from the MongoDB URI
    const uriParts = mongodbUri.split('/');
    const databaseName = uriParts[uriParts.length - 1];

    // Connect to the database using the extracted database name
    const client = new MongoClient(mongodbUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    const db = client.db(databaseName);

    // Check the timestamp and fetch data if needed
    let dataArray = await checkTimestampAndFetchData(file, fetchedDataFilePath, db);

    if (!dataArray) {
      return;
    }

    // Save the data to the database
    await saveDataToDatabase(dataArray, db, 'your_collection_name');

    return { dataArray };
  } catch (error) {
    logger.error('Error:', error);
    throw error;
  }
}

async function checkTimestampAndFetchData(file, fetchedDataFilePath, db) {
  let dataArray = [];
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
    const redditPromises = file.sites
      .filter((site) => site.title === 'reddit')
      .map(async (site) => {
        const promises = site.subs.map(async (sub) => {
          const data = await fetchRedditData(sub);

          // Ensure 'data' is an array of valid document objects
          const validData = data.map((item) => ({
            category: sub,
            data: item,
          }));

          dataArray.push(...validData);
        });

        await Promise.all(promises);
      });

    const ycombinatorPromises = file.sites
      .filter((site) => site.title === 'ycombinator')
      .map(async (site) => {
        const data = await fetchYCombinatorData(site.main);

        // Ensure 'data' is an array of valid document objects
        const validData = data.map((item) => ({
          category: 'ycombinator',
          data: item,
        }));

        dataArray.push(...validData);
      });

    // Execute promises concurrently
    await Promise.all([...redditPromises, ...ycombinatorPromises]);

    // Save the fetched data to the file with a new timestamp
    const currentTime = Date.now();
    await writeToFile(
      fetchedDataFilePath,
      JSON.stringify({ timestamp: currentTime, data: dataArray }, null, 2), // Formatting with 2 spaces
    );
  }

  return dataArray;
}

async function saveDataToDatabase(dataArray, db, collectionName) {
  const collection = db.collection(collectionName);

  // Flatten the dataArray to remove nested arrays
  const flattenedArray = dataArray.flat(1);

  // Insert the flattened array into the MongoDB collection
  const result = await collection.insertMany(flattenedArray);

  console.log(`Inserted ${result.insertedCount} documents into the collection.`);
}

async function fetchRedditData(sub) {
  try {
    const jsonData = await makeHttpRequest(`https://www.reddit.com/r/${sub}.json`);

    const myArray = jsonData.data.children.slice(0, 15).map((child) => {
      const childData = child.data;
      const title = childData ? childData.title : undefined;
      const user = childData ? childData.author : undefined;
      const score = childData ? childData.score : undefined;
      const permaLink = childData ? `https://www.reddit.com${childData.permalink}` : undefined;
      const selftext = childData ? childData.selftext : undefined;
      const sourceLink = childData ? childData.url : undefined;

      return {
        title: title,
        user: user,
        score: score,
        selfText: selftext,
        sourceLink: sourceLink,
        permaLink: permaLink,
      };
    });

    return myArray;
  } catch (error) {
    logger.error('Error:', error);
    throw error;
  }
}

async function fetchYCombinatorData(main) {
  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.goto(main, {
      waitUntil: 'networkidle0',
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
    logger.error('Error:', error);
    throw error;
  }
}

async function makeHttpRequest(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    logger.error('Error:', error);
    throw error;
  }
}

async function readFromFile(filePath) {
  return await fs.readFile(filePath, 'utf8');
}

async function writeToFile(filePath, data) {
  return await fs.writeFile(filePath, data, 'utf8');
}

async function launchBrowser() {
  try {
    const browser = await puppeteer.launch();
    return browser;
  } catch (error) {
    logger.error('Error:', error);
    throw error;
  }
}

module.exports = { scanFile };
