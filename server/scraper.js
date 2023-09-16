const axios = require('axios'); 

async function fetchData() {
  try {
    const response = await axios.get('https://www.reddit.com/r/programming.json');
    const jsonData = response.data;

    const myArray = jsonData.data.children.slice(0, 15).map(child => {
      let childData = child.data;
      let title = childData ? childData.title : undefined;
      let user = childData ? childData.author : undefined;
      let score = childData ? childData.score : undefined;
      const permaLink = childData ? `https://www.reddit.com${childData.permalink}` : undefined;
      let selftext = childData ? childData.selftext : undefined;
      let sourceLink = childData ? childData.url : undefined;
     

      return ({
        title: title,
        user: user,
        score: score,
        selfText: selftext,
        sourceLink: sourceLink,
        permaLink: permaLink
      });
    });
    console.log(myArray)
    return myArray; // Return the array outside the for loop
  } catch (error) {
    console.error('Error:', error);
    throw error; // Throw the error to handle it outside this function
  }
}

module.exports = { fetchData };
