import React from 'react';
import "./stylesheets/reddititem.css"

const RedditItem = ({ item }) => {
  return (
    <div className="reddit-item">
      <div className='left-box'>
        <div className="scorebox">
          <p className="score">{item.score}</p>
        </div>
        <div className="userbox">
          <p className='user'>{item.user}</p>
        </div>
        
      </div>
      
        <a
          href={item.permaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="reddit-link"
        >
          <div className="rght-box">
        <h3>{item.title}</h3>
        
        
        {item.selfText !== '' ? (
          <p className="self-text">{item.selfText}</p>
        ) : (
          <p className='permalink'>
            <a
              href={item.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Link
            </a>
          </p>
        )}
         
          </div>
        </a>
      
      
    </div>
  );
};


export default RedditItem;
