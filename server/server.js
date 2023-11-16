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

// Check if the required environment variables are set
if (!process.env.MONGODB_URI) {
  logger.error('MONGODB_URI environment variable is not set.');
  process.exit(1);
}

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Update this with your actual frontend domain
  methods: 'GET',
};

// Handle OPTIONS requests for the /info endpoint
app.options('/info', cors(corsOptions));

// Use CORS middleware
app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get("/info", async (req, res, next) => {
  try {
    const data = await scraper.scanFile(process.env.MONGODB_URI);
    res.json(data);
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Custom error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});
