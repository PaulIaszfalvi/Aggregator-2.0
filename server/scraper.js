const reddit = require("./templates/reddit");
const ycombinator = require("./templates/ycombinator");

/**
 * Asynchronous function that scrapes data from different websites based on the links provided in a JSON file.
 * It uses different templates for different websites and retrieves a specified number of results for each website.
 * 
 * @param {number} numResults - The number of results to retrieve for each website.
 * @returns {Promise<Array<Array<any>>>} - An array of arrays, where each inner array contains the sub-site and the corresponding results for that sub-site.
 */

console.log("accessing scraper")
const scraper = async (numResults) => {

  console.log("scrapper started")
  // Get the links
  const linkList = getList();
  const templates = {};

  console.log("template is being accessed")

  // Dynamically import templates based on the title provided in the JSON file
  for (const link of linkList.links) {
    const title = link.title;
    templates[title] = await import(`./templates/${title}`);
  }

  console.log("creating promise")

  // Create an array of promises using Array.prototype.map()
  const promises = linkList.links.map(async (link) => {
    const title = link.title;

    // Determine which template to use based on which site will be scraped
    const myTemplate = templates[title];

    // Check if template exists
    if (!myTemplate) {
      throw new Error(`Invalid title '${title}' provided in JSON file.`);
    }
   
    // Loop through subs
    const subPromises = link.subs.map(async (subSite) => {
      subSite = subSite || "ycombinator";
      await myTemplate.initialize(subSite);
      let result = await myTemplate.getResults(numResults);
      return [subSite, result];
    });

    // Return sub promises
    return Promise.all(subPromises);
  });

  // Wait for all promises to resolve using Promise.all()
  const resultsArray = await Promise.all(promises);
  console.log(resultsArray)
  return resultsArray;
};
//Get a list (json format) with the titles, links, and subs for the websites that will be scraped
function getList() {
  var json = require("./textFiles/links.json");
  
  return json;
}

module.exports = scraper;
