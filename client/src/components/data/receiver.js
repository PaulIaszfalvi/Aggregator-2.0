import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubContainer from '../styling/subContainer';

const Receiver = () => {
  const [data, setData] = useState(null);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/info';

    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
        setHasData(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Data Fetcher Component</h2>
      <div className="main-container">
        {hasData && <SubContainer data={data.dataArray} />}
      </div>
    </div>
  );
};

export default Receiver;
