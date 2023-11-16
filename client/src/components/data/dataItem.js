import React, { useState } from 'react';
import './stylesheets/dataItem.css';

const DataItem = ({ item }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event) => {
    setShowPopup(true);

    // Calculate the position of the popup based on the mouse cursor's position
    const x = event.clientX;
    const y = event.clientY;
    setPopupPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const isImage = /\.(jpg|jpeg|png|gif)$/.test(item.permaLink);
  const popupStyle = {
    display: showPopup ? 'block' : 'none',
    position: 'fixed', // Use 'fixed' for popup positioning
    top: `${popupPosition.y}px`, // Set the top position based on the mouse cursor
    left: `${popupPosition.x}px`, // Set the left position based on the mouse cursor
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
            {console.log(item.selfText)}
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
