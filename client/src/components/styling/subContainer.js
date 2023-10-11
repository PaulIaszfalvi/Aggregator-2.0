import React from 'react';
import DataItem from '../data/dataItem';
import './stylesheets/subContainer.css';

function SubContainer({ data }) {
  if (!data || !Array.isArray(data)) {
    return (
      <div className="sub-container">
        <h3>No data available.</h3>
      </div>
    );
  }

  // Create an object to group data by category
  const groupedData = data.reduce((result, item) => {
    const category = item.category;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(item);
    return result;
  }, {});

  return (
    <div className="sub-container">
      {Object.keys(groupedData).map((category, index) => (
        <div key={index}>
          <h3>{category}</h3>
          {groupedData[category].map((item, itemIndex) => (
            <div key={itemIndex}>
              <DataItem item={item.data} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SubContainer;
