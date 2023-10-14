import React, {useState, useEffect} from 'react';
import DataItem from '../data/dataItem';
import './stylesheets/subContainer.css';

function SubContainer({ data }) {

  const [collapseStates, setCollapseStates] = useState({});


    // Initialize the collapse states when the component is mounted
    useEffect(() => {
      const initialCollapseStates = {};
      Object.keys(groupedData).forEach((category) => {
        initialCollapseStates[category] = true;
      });
      setCollapseStates(initialCollapseStates);
    }, []);


  if (!data || !Array.isArray(data)) {
    return (
      <div className="sub-container">
        <h3>No data available.</h3>
      </div>
    );
  }

  const groupedData = data.reduce((result, item) => {
    const category = item.category;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(item);
    return result;
  }, {});

  const toggleCollapse = (category) => {
    setCollapseStates((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  
 
  return (
    <div className="sub-container">
      {Object.keys(groupedData).map((category, index) => (
        <div key={index} className='container'>
          <div className="title">
          <h3 className="category">
            {category}
            </h3>
            <button onClick={() => toggleCollapse(category)}>
              {collapseStates[category] ? 'Collapse' :  'Expand'}
            </button>
          
          </div>
       
          {collapseStates[category] && (
            groupedData[category].map((item, itemIndex) => (
              <div key={itemIndex}>
                <DataItem item={item.data} />
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  
  )}

export default SubContainer;
