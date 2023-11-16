import React, { useState, useEffect } from 'react';
import DataItem from '../data/dataItem';
import './stylesheets/subContainer.css';

function SubContainer({ data }) {
  const [collapseStates, setCollapseStates] = useState({});

  // Initialize the collapse states when the component is mounted or when data changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const initialCollapseStates = {};
      data.forEach((item) => {
        const category = item.category;
        initialCollapseStates[category] = true;
      });
      setCollapseStates(initialCollapseStates);
    }
  }, [data]);

  if (!data || !Array.isArray(data)) {
    return (
      <div className="sub-container">
        <h3>No data available.</h3>
      </div>
    );
  }

  const toggleCollapse = (category) => {
    setCollapseStates((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div className="sub-container">
      {Object.keys(collapseStates).map((category, index) => (
        <div className={`category-container ${collapseStates[category] ? 'collapsed' : ''}`} key={index}>
          <div className="title">
            <h3>{category}</h3>
            <button onClick={() => toggleCollapse(category)}>
              {collapseStates[category] ? 'Collapse' : 'Expand'}
            </button>
          </div>  
          {collapseStates[category] && (
            <div className="content">
              {data
                .filter((item) => item.category === category)
                .map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <DataItem item={item.data} />
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SubContainer;
