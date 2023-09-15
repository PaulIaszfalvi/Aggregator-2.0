const express = require("express");
const scraper = require("./scraper");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'))

app.get("/info", async (req, res) => {
  try {
    const data = await scraper.fetchData(); // Call the fetchData function
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
