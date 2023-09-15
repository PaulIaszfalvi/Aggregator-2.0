import React from 'react';

const RedditItem = ({ item }) => {
  return (
    <div className="reddit-item">
        {console.log(item)}
      <h3>{item.title}</h3>
      <p>Posted by {item.user}</p>
      <p>Score: {item.score}</p>
      <a href={item.sourceLink} target="_blank" rel="noopener noreferrer">Link</a>
      <br/>
      <a href={item.permaLink} target="_blank" rel="noopener noreferrer">Link to reddit</a>
    </div>
  );
};

export default RedditItem;
