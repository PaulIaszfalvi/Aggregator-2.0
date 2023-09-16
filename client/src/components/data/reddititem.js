import React from 'react';
import "./stylesheets/reddititem.css"
const RedditItem = ({ item }) => {
  return (
    <div className="reddit-item">
      <h3>{item.title}</h3>
      <p>Posted by {item.user}</p>
      <p>Score: {item.score}</p>
      {item.selfText !== '' ? (
        <p>{item.selfText}</p>
      ) : (
        <p>
          <a href={item.sourceLink} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </p>
      )}
      <br />
      <a href={item.permaLink} target="_blank" rel="noopener noreferrer">
        Link to Reddit
      </a>
    </div>
  );
};

export default RedditItem;
