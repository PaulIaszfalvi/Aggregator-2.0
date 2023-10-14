import React, { useState } from 'react';
import './stylesheets/dataItem.css';

const DataItem = ({ item }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event) => {
    setShowPopup(true);
    setPopupPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const isImage = /\.(jpg|jpeg|png|gif)$/.test(item.permaLink);
  const popupStyle = {
    display: showPopup ? 'block' : 'none',
    position: 'absolute',
    top: Math.min(popupPosition.y, window.innerHeight - 200) + 'px',
    left: Math.min(popupPosition.x, window.innerWidth - 500) + 'px',
    zIndex: 1000,
  };

  return (
    <div
      className="data-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="left-box">
        <div className="scorebox">
          <p className="score">{item.score}</p>
        </div>
      </div>

      <div className="right-box">
        <a
          href={item.permaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="title-box"
        >
          <h3>{item.title}</h3>
        </a>
      </div>

      {item.sourceLink && !item.selfText && (
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

      <div className="popup" style={popupStyle}>
        {showPopup && (
          <div className="popup-content">
            {item.selfText && !isImage && (
              <div
                className="discussion-text"
                dangerouslySetInnerHTML={{ __html: item.selfText }}
              />
            )}
            {isImage && (
              <img
                src={item.permaLink}
                alt={item.title}
                className="popup-image"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataItem;
