import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RedditItem from './reddititem'; 

const Receiver = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = 'http://localhost:5000/info';

    // Fetch data from the server
    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Data Fetcher Component</h2>
      <div className="reddit-items-container">
        {data.map(item => (
          <div key={item.id}>
            <RedditItem item={item} /> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Receiver;
