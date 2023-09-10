// routes/api.js

const express = require('express');
const router = express.Router();
const yourScraperFunction = require('../yourScraperFunction'); // Import your scraper function

// Define a route that returns the data from your scraper function
router.get('/data', async (req, res) => {
  try {
    const data = await yourScraperFunction(); // Call your scraper function
    res.json(data); // Send the data as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
