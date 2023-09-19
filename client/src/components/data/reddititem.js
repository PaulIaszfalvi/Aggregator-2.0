import React, { useState, useEffect } from 'react';
import './stylesheets/reddititem.css';

const RedditItem = ({ item }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [leftSpace, setLeftSpace] = useState(false);

  useEffect(() => {
    // Check if the selfText is an image URL
    if (item.selfText && item.selfText.match(/\.(jpeg|jpg|gif|png)$/)) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }

    // Check if there's more space on the left or right side of the screen
    const screenWidth = window.innerWidth;
    const redditItemRect = document.querySelector('.reddit-item').getBoundingClientRect();
    const itemLeftSpace = redditItemRect.left;
    const itemRightSpace = screenWidth - redditItemRect.right;

    setLeftSpace(itemLeftSpace > itemRightSpace);
  }, [item.selfText]);

  return (
    <div className={`reddit-item ${leftSpace ? 'left-space' : 'right-space'}`}>
      <div className="left-box">
        <div className="scorebox">
          <p className="score">{item.score}</p>
        </div>
        <div className="userbox">
          <p className="user">{item.user}</p>
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
          {console.log(item.selfText)}
          {showPopup && (            
            <div className={`popup ${leftSpace ? 'left-space' : 'right-space'}`}>
              {item.selfText && item.selfText.match(/\.(jpeg|jpg|gif|png)$/) ? (
                <img src={item.selfText} alt="SelfText" className="self-image" />
              ) : (
                <p className="self-text">{item.selfText}</p>
              )}
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default RedditItem;
