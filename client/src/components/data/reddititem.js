import React, { useState } from 'react';
import './stylesheets/reddititem.css';

const RedditItem = ({ item }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className="reddit-item"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <div className="left-box">
        <div className="scorebox">
          <p className="score">{item.score}</p>
        </div>
  
      </div>

      <a
        href={item.permaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="reddit-link"
      >
        <div className="right-box">
          <h3>{item.title}</h3>
          <p className="permalink">
            <a
              href={item.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Link
            </a>
          </p>
        </div>
      </a>

      {showPopup && (
        <div className="popup">
          {item.selfText && (

            <pre>{item.selfText}</pre>
            // <div
            //   className="self-text"
            //   dangerouslySetInnerHTML={{ __html: item.selfText }}
            // />
          )}
        </div>
      )}
    </div>
  );
};

export default RedditItem;
