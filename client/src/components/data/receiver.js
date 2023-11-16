import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubContainer from '../styling/subContainer';
import './stylesheets/receiver.css';

const Receiver = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/info');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="receiver">
      <h2>Data Fetcher Component</h2>
      <div className="main-container">
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <SubContainer data={data.dataArray} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Receiver;
