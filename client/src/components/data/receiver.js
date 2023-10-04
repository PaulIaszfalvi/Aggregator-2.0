// Receiver.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubContainer from "../styling/subContainer";
import { Container } from "react-bootstrap";
import "./stylesheets/receiver.css"

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
    <Container>
      <h2>Data Fetcher Component</h2>
      <div className="main-container">
      
      <SubContainer data={data} /> {/* Pass 'data' as a prop */}   
      </div>
     
    </Container>
  );
};

export default Receiver;
