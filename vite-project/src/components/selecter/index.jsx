import './select.css';
import React, { useState } from 'react';

const SelectInput = ({ options, defaultValue, onChange,type }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || '');

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <select style={type ? {color:"black"} : null} value={selectedOption} onChange={handleOptionChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>

        
      ))}
    </select>
  );
};

export default SelectInput;