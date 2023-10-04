const express = require("express");
const helmet = require("helmet");
const scraper = require("./scraper");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.use(express.static('public'))

app.get("/info", async (req, res, next) => {
  try {
    const data = await scraper.scanFile();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'An error occurred' + err});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
