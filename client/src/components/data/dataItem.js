import React, { useState } from 'react';
import './stylesheets/dataItem.css';

const DataItem = ({ item }) => {
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
          <div className="title-box">
            <h3>{item.title}</h3>
          </div>
        </div>
      </a>

      {item.sourceLink !== item.permaLink && (
        <p className="source-link">
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

      {showPopup && (
        <div className="popup">
          {item.selfText && (
            <div className="discussion-text" dangerouslySetInnerHTML={{ __html: item.selfText }} />
          )}
        </div>
      )}
    </div>
  );
};

export default DataItem;
