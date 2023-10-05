import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubContainer from "../styling/subContainer";
import { Container } from "react-bootstrap";
import "./stylesheets/receiver.css"

const Receiver = () => {
  const [data, setData] = useState(null); // Initialize data as null
  const [hasData, setHasData] = useState(false); // Initialize hasData as false

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = 'http://localhost:5000/info';

    // Fetch data from the server
    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
        setHasData(true); // Set hasData to true when data is available
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Data Fetcher Component</h2>  
      <div className="main-container">
        {hasData && <SubContainer data={data} />} {/* Pass 'data' as a prop when hasData is true */}
      </div>
    </div>
  );
};

export default Receiver;
