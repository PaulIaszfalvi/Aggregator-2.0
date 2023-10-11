const express = require("express");
const helmet = require("helmet");
const scraper = require("./scraper");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const winston = require('winston');
const dotenv = require('dotenv').config();

// Configure the Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Access the MongoDB connection string
const mongodbUri = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(express.static('public'));

app.get("/info", async (req, res, next) => {
  try {
    const data = await scraper.scanFile(mongodbUri);
    res.json(data);
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});
