import React from 'react';
import RedditItem from '../data/reddititem';

function SubContainer({ data }) {
  // Check if 'data' is defined
  if (!data || !Array.isArray(data.dataArray)) {
    return (
      <div className='sub-container'>
        <h3>No data available.</h3>
      </div>
    );
  }

  return (
    <div className='sub-container'>
      {data.dataArray.map((subArray, index) => (
        <div key={index}>
          <h3>{subArray[0]}</h3>
          {subArray[1].map((item) => (
            <div key={item.id}>
              <RedditItem item={item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SubContainer;
