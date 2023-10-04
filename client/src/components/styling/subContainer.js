import React from 'react';
import RedditItem from '../data/reddititem';

function SubContainer({ data: { title, array } }) {
  // Check if 'array' is defined and is an array

  if (!array || !Array.isArray(array)) {
    return (
      <div className='sub-container'>
        <h3>{title}</h3>
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className='sub-container'>
      <h3>{title}</h3>
      {array.map((subArray, index) => (
        <div key={index}>
          <h4>Subreddit: {subArray[0]}</h4>
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
