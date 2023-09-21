// SubContainer.js
import React from 'react';
import RedditItem from '../data/reddititem';

function SubContainer({ data }) {
  return (
    <div className='sub-container'>
      {data.map((item) => (
        <div key={item.id}>
          <RedditItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default SubContainer;
