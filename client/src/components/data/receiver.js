import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Receiver = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = 'http://localhost:5000/info';

    // Fetch data from the server
    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });      
  }, []);

  return (
    <div>    
      <h2>Data Fetcher Component</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <strong>Title:</strong> {item.title}<br />
            <strong>Score:</strong> {item.score}<br />
            <strong>Permalink:</strong> {item.sourceLink}<br />
            <strong>Selftext:</strong> {item.selfText}<br />
            <strong>User:</strong> {item.user}<br />
            <br></br>
          </li>         
        ))}
      </ul>
    </div>
  );
};

export default Receiver;
