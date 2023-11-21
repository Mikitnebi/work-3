import React, { useEffect, useState } from 'react';
import './tables1.css'; // Import your CSS file

export const Tables1 = function ({ prevStep, nextStep }) {
  const [tableCount, setTableCount] = useState('');
  const [seatsCount, setSeatsCount] = useState('');
  const [tablesInfo, setTablesInfo] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('tablesInfo');
    if (storedData) {
      setTablesInfo(JSON.parse(storedData));
    }
  }, []);

  const addTable = () => {
    const tableCountValue = parseInt(tableCount, 10);
    const seatsCountValue = parseInt(seatsCount, 10);
  
    if (isNaN(tableCountValue) || isNaN(seatsCountValue) || tableCountValue <= 0 || seatsCountValue <= 0) {
      alert('Please enter valid values for table count and seats count.');
      return;
    }
  
    // Check if the same seat count already exists
    const existingTableIndex = tablesInfo.findIndex((table) => table.seatsCount === seatsCountValue);
  
    if (existingTableIndex !== -1) {
      const confirmUpdate = window.confirm(
        `Seats count ${seatsCountValue} already exists. Do you want to update the table count to ${tableCountValue}?`
      );
  
      if (confirmUpdate) {
        const updatedTables = [...tablesInfo];
        updatedTables[existingTableIndex].tableCount = tableCountValue;
        setTablesInfo(updatedTables);
        setTableCount('');
        setSeatsCount('');
        setEditingIndex(-1);

      } else {
        // Clear the input fields
        setTableCount('');
        setSeatsCount('');
      }
    } else {
      const newTable = {
        tableCount: tableCountValue,
        seatsCount: seatsCountValue,
      };
  
      if (editingIndex !== -1) {
        const updatedTables = [...tablesInfo];
        updatedTables[editingIndex] = newTable;
        setTablesInfo(updatedTables);
        setEditingIndex(-1);
      } else {
        setTablesInfo([...tablesInfo, newTable]);
      }
  
      setTableCount('');
      setSeatsCount('');
    }
  };

  const deleteTable = (index) => {
    const updatedTables = [...tablesInfo];
    updatedTables.splice(index, 1);
    setTablesInfo(updatedTables);
  };

  const editTable = (index) => {
    const tableToEdit = tablesInfo[index];
    setTableCount(tableToEdit.tableCount);
    setSeatsCount(tableToEdit.seatsCount);
    setEditingIndex(index);
  };

  const handleSaveAndNext = () => {
    // Save the data to localStorage (you may add additional logic if needed)
    localStorage.setItem('tablesInfo', JSON.stringify(tablesInfo));

    // Proceed to the next step
    // nextStep();
  };

  return (
    <div className='tables-div'>
      <div className='table-flex1'>
      
        <button className="save-button" onClick={handleSaveAndNext}>
          Save
        </button>
        
      </div>

      <div className="tables-container2">
        <div className="input-section">
          <label htmlFor="tableCount">Table Count:</label>
          <input
            type="number"
            id="tableCount"
            className="table-count-input"
            placeholder="Enter Table Count"
            value={tableCount}
            onChange={(e) => setTableCount(e.target.value.replace(/^0+/, ''))}
          />
          <label htmlFor="seatsCount">Seats Per Table:</label>
          <input
            type="number"
            id="seatsCount"
            className="seats-count-input"
            placeholder="Enter Seats Per Table"
            value={seatsCount}
            onChange={(e) => setSeatsCount(e.target.value.replace(/^0+/, ''))}
          />
          <button className="add-table-button" onClick={addTable}>
            {editingIndex === -1 ? 'Add Table' : 'Update Table'}
          </button>
        </div>
        <div className="table-info-section">
          {tablesInfo.map((table, index) => (
            <div className="table-info" key={index}>
              {table.tableCount} tables, with {table.seatsCount} seats per table
              <button className="edit-button" onClick={() => editTable(index)}>Edit</button>
              <button className="delete-button" onClick={() => deleteTable(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
