import { StoreContextRecipe } from '../../App';
import './select.css';
import React, { useContext, useEffect, useState } from 'react';

const SelectInput = ({ isEdit, options, defaultValue, onChange, type }) => {
  
  const [selectedOption, setSelectedOption] = useState(defaultValue || '');

  // useEffect(() => {
  //   setSelectedOption(defaultValue || ''); // Update selected option when default value changes
  // }, [defaultValue]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <select disabled={!isEdit} style={type ? { color: "black", fontFamily: 'YourCustomFont, sans-serif' } : { fontFamily: 'YourCustomFont, sans-serif' }} value={selectedOption} onChange={handleOptionChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;