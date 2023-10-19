import React, { useState } from 'react';
import './details.css'; // Import your custom CSS for styling

export const Details = function ({ prevStep, nextStep }) {
  const [selectedOptions, setSelectedOptions] = useState({
    select1: [],
    select2: [],
    select3: [],
    select4: [],
    select5: [],
  });

  const handleSelectChange = (selectName, selectedValue) => {
    setSelectedOptions((prevState) => {
      const currentSelections = prevState[selectName];

      if (currentSelections.includes(selectedValue)) {
        // Item is already selected, unselect it and remove it from the results
        const updatedSelections = currentSelections.filter((item) => item !== selectedValue);
        return {
          ...prevState,
          [selectName]: updatedSelections,
        };
      } else if (currentSelections.length >= 3) {
        // User has already selected 3 items, unselect the oldest and select the new one
        const updatedSelections = currentSelections.slice(1).concat(selectedValue);
        return {
          ...prevState,
          [selectName]: updatedSelections,
        };
      } else {
        // User hasn't selected the maximum (3) items, select the new one
        return {
          ...prevState,
          [selectName]: [...currentSelections, selectedValue],
        };
      }
    });
  };

  const renderSelect = (selectName, options) => {
    return (
      <div key={selectName} className="select-container">
        <h3>{`Select ${selectName}`}</h3>
        <select className="custom-select" multiple={true}>
          {options.map((option) => (
            <option
              key={option}
              value={option}
              onClick={() => handleSelectChange(selectName, option)}
              className={selectedOptions[selectName].includes(option) ? 'selected' : ''}
            >
              {option}
            </option>
          ))}  
        </select>
      </div>
    );
  };

  const handleDone = () => {
    // You can access the selected options from the selectedOptions object
    console.log('Selected Options:', selectedOptions);
    // Perform any other actions as needed
    nextStep();
  };

  return (
    <div className='detailes-div'>
      {renderSelect('select1', ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10'])}
      {renderSelect('select2', ['Option A', 'Option B', 'Option C', 'Option D', 'Option E', 'Option F', 'Option G', 'Option H', 'Option I', 'Option J'])}
      {renderSelect('select3', ['Choice X', 'Choice Y', 'Choice Z', 'Choice P', 'Choice Q', 'Choice R', 'Choice S', 'Choice T', 'Choice U', 'Choice V'])}
      {renderSelect('select4', ['Item I', 'Item II', 'Item III', 'Item IV', 'Item V', 'Item VI', 'Item VII', 'Item VIII', 'Item IX', 'Item X'])}
      {renderSelect('select5', ['Category A', 'Category B', 'Category C', 'Category D', 'Category E', 'Category F', 'Category G', 'Category H', 'Category I', 'Category J'])}

    <div className='menu-flex'>
    <button className="last-step-button1" onClick={(e) => prevStep()}>
        Back
      </button>
      <button onClick={handleDone}>Done</button>
    </div>
      
    </div>
  );
};
