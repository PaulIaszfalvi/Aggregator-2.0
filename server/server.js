const express = require("express");
<<<<<<< HEAD
const scraper = require("./scraper");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
=======
const { stringify } = require("nodemon/lib/utils");
const scraper = require("./scraper");
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;
var favicon = require("serve-favicon");
var path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
>>>>>>> github/main

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
<<<<<<< HEAD

app.use(express.static('public'))

app.get("/info", async (req, res) => {
  try {
    const data = await scraper.fetchData(); // Call the fetchData function
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
=======
//fetch(request, { mode: "cors" });

app.use(favicon(path.join(__dirname, "../client/public/network.png")));

app.get("/", async (req, res) => {
  console.log(await scraper); //, new Date().getTime());
  res.json(await scraper);
>>>>>>> github/main
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
<<<<<<< HEAD
=======

module.exports = app;
module.exports = router;
>>>>>>> github/main
