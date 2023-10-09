const express = require("express");
const helmet = require("helmet");
const scraper = require("./scraper");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");

const dbURI = require("./textFiles/dbURI.json")

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Close the MongoDB connection when your Node.js application exits
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
});



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
