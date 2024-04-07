import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Select from 'react-select';
// import './Tables.css';
import { ResizableBox } from 'react-resizable'; // Import ResizableBox


const DetailsForm = ({ table, onSave, onRemove, onCancel, }) => {
  const [tableNumber, setTableNumber] = useState(table.number || '');
  const [seatingCapacity, setSeatingCapacity] = useState(table.seatingCapacity || '');
  const [selectedTags, setSelectedTags] = useState(table.tags || []);

  const tagOptions = [
    { value: '#ფანჯარასთან ახლოს', label: '#ფანჯარასთან ახლოს' },
    { value: '#მყუდრო', label: '#მყუდრო' },
    { value: '#რომანტიული', label: '#რომანტიული' },
    { value: '#ღიაცისქვეშ', label: '#ღიაცისქვეშ' },
  ];

  const handleSave = () => {
    // Convert input values to numbers
    const tableNumberValue = parseInt(tableNumber, 10);
    const seatingCapacityValue = parseInt(seatingCapacity, 10);

    // Validate table number and seating capacity
    if (isNaN(tableNumberValue) || tableNumberValue < 0) {
      // Show alert for invalid table number
      alert('Invalid table number. Please enter a valid non-negative number.');

      // Clear bad table number field
      setTableNumber('');
      return;
    }

    if (isNaN(seatingCapacityValue) || seatingCapacityValue < 0 || seatingCapacityValue === 0) {
      // Show alert for invalid seating capacity
      alert('Invalid seating capacity. Please enter a valid non-negative number greater than 0.');

      // Clear bad seating capacity field
      setSeatingCapacity('');
      return;
    }

    // Call the onSave callback with the validated details
    onSave(table.id, {
      number: tableNumberValue,
      seatingCapacity: seatingCapacityValue,
      tags: selectedTags,
    });
  };

  const handleRemove = () => {
    onRemove(table.id);
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions.map((option) => option.value));
  };

  return (
    <div style={{position:'absolute'}}  className="details-form">
      <label>
        Table Number:
        <input type="number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} />
      </label>
      <label>
        Seating Capacity:
        <input type="number" value={seatingCapacity} onChange={(e) => setSeatingCapacity(e.target.value)} />
      </label>
      <label style={{maxWidth:'300px'}}>
        Tags:
        <Select
          value={tagOptions.filter((option) => selectedTags.includes(option.value))}
          onChange={handleTagChange}
          options={tagOptions}
          isMulti
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              color: 'red',
              borderColor: state.isFocused ? '#8C1D2F' : '#8C1D2F',
              '&:hover': {
                borderColor: '#8C1D2F', // Change border color on hover
              },
              width: '270px',
              backgroundColor: '#D9D9D9',
              outline: 'none', // Remove default outline,
              border: '1px solid #8C1D2F',
              // This line disable the blue border
              boxShadow: 'none'
            }),
            multiValue: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: '#C6B0B4', // Set the background color for added tags
            }),
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              color: state.isFocused ? '#8C1D2F' : '#8C1D2F', // Change the color when focused
            }),
          }}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleRemove}>Remove</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
const Table = ({ type, index, onClick }) => {
  return (
    <Draggable draggableId={type} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`table ${type}`}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.5 : 1,
          }}
          onClick={onClick}
        />
      )}
    </Draggable>
  );
};


export const TablesForProfile = ({prevStep,nextStep}) => {
  const [initialTables] = useState(['circle', 'square', 'rectangle', 'rectangleUpsideDown', 'octagon']);
  const [tablesOnFloor, setTablesOnFloor] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [tablePositions, setTablePositions] = useState({});
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [floors, setFloors] = useState([{ id: uuidv4(), tables: [] }]);
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
  const [isEditingFloor, setIsEditingFloor] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Update dimensions when the window is resized
  useEffect(() => {
    // Retrieve floors from local storage on component mount
    const savedFloors = localStorage.getItem('floors');
    if (savedFloors) {
      setFloors(JSON.parse(savedFloors));
    }
  }, []);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  };

  useEffect(() => {
    const handlePointerMove = (event) => {
      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);
      
      setLastMousePosition({ x: clientX, y: clientY });
    };
  
    document.addEventListener('mousemove', handlePointerMove);
    document.addEventListener('touchmove', handlePointerMove);
  
    return () => {
      document.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  useEffect(() => {
    // Initial dimensions setup
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
  console.log(screenHeight)
  }, [screenHeight]);

  useEffect(() => {
    console.log(screenWidth)
    }, [screenWidth]);
  useEffect(() => {
    // Update the tablesOnFloor state and table positions for the selected floor
    setTablesOnFloor(floors[currentFloorIndex]?.tables || []);
    setTablePositions(floors[currentFloorIndex]?.tablePositions || []);
  }, [floors, currentFloorIndex]);
  const handleAddFloor = () => {
    setFloors((prevFloors) => [
      ...prevFloors,
      {
        id: uuidv4(),
        tables: [],
        tablePositions: {},
      },
    ]);
    setCurrentFloorIndex(floors.length);
  };

  const handleDeleteFloor = () => {
    if (floors.length > 1) {
      setFloors((prevFloors) => {
        const newFloors = [...prevFloors];
        newFloors.splice(currentFloorIndex, 1);
        return newFloors;
      });

      setCurrentFloorIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleNavigateFloor = (index) => {
    setCurrentFloorIndex(index);

    const selectedFloor = floors[index] || { tables: [], tablePositions: {} };
    setTablesOnFloor(selectedFloor.tables || []);
    setTablePositions(selectedFloor.tablePositions || {});
  };
  const handleSaveAndNavigate = () => {
    // Save the current floors state to local storage
    localStorage.setItem('floors', JSON.stringify(floors));

  };

  const handleBackAndSave = () => {
    // Save the current floors state to local storage
    localStorage.setItem('floors', JSON.stringify(floors));

    // Go back to the previous step
    prevStep();
  };

  // Function to handle editing the current floor
  const handleEditFloor = () => {
    setIsEditingFloor(true);
  };

  // Function to save the edited floor
  const handleSaveDetails = (tableId, details) => {
    // Validate table number, seating capacity, and tags
    if (!details.number || !details.seatingCapacity || details.tags.length === 0) {
      alert('Please enter table number, seating capacity, and at least one tag.');
      return;
    }
  
    // Convert input values to numbers
    const tableNumberValue = parseInt(details.number, 10);
    const seatingCapacityValue = parseInt(details.seatingCapacity, 10);
  
    // Validate table number and seating capacity
    if (isNaN(tableNumberValue) || tableNumberValue < 0) {
      alert('Invalid table number. Please enter a valid non-negative number.');
      return;
    }
  
    if (isNaN(seatingCapacityValue) || seatingCapacityValue < 0 || seatingCapacityValue === 0) {
      alert('Invalid seating capacity. Please enter a valid non-negative number greater than 0.');
      return;
    }
  
    // Check if the table number is unique
    const isTableNumberUnique = floors[currentFloorIndex]?.tables.every(
      (table) => table.number !== tableNumberValue
    );
  
    if (!isTableNumberUnique) {
      alert('Table number must be unique. Please choose a different table number.');
      return;
    }
  
    // Update the floors state with the validated details
    setFloors((prevFloors) =>
      prevFloors.map((floor, index) =>
        index === currentFloorIndex
          ? {
              ...floor,
              tables: floor.tables.map((table) =>
                table.id === tableId ? { ...table, ...details } : table
              ),
            }
          : floor
      )
    );
  
    setSelectedTable(null);
    setIsDetailsOpen(false); // Close the details form
  };
  
  
  const handleRemoveDetails = (tableId) => {
    setFloors((prevFloors) =>
      prevFloors.map((floor, index) =>
        index === currentFloorIndex
          ? {
              ...floor,
              tables: floor.tables.filter((table) => table.id !== tableId),
            }
          : floor
      )
    );
    setSelectedTable(null);
    setIsDetailsOpen(false); // Close the details form
  };
  
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setLastMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Run effect only once on mount

  const handleShapeClick = (tableId) => {
    const clickedTable = tablesOnFloor.find((table) => table.id === tableId);

    const isSameTable = selectedTable && selectedTable.id === tableId;

    // Close the existing details form if it's open
    if(isSameTable){
      setTimeout(() => {
        // Open the details form for the clicked shape
        setSelectedTable(null);
        setIsDetailsOpen(true);
      }, 10);
    } else{
    if (isDetailsOpen ) {
      setSelectedTable(null);
      setIsDetailsOpen(false);
  
      // Use setTimeout to wait for the details form to close before opening the new one
      setTimeout(() => {
        // Open the details form for the clicked shape
        setSelectedTable(clickedTable);
        setIsDetailsOpen(true);
      }, 10); // Adjust the timeout duration as needed
    } else {

      // Open the details form for the clicked shape directly if it's not open
      setSelectedTable(clickedTable);
      setIsDetailsOpen(true);
    }
  }
  };
  
  const handleCancelDetails = () => {
    setSelectedTable(null);
    setIsDetailsOpen(false); // Close the details form
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list
  
    const sourceTable = result.source.droppableId;
    const destinationTable = result.destination.droppableId;
  
    if (destinationTable === 'tables') {
      // Shape was accidentally placed on the table-selection div
      // Revert the shape to its original position in table-selection
      const movedTable = initialTables[result.source.index];
      const mouseX = lastMousePosition.x;
      const mouseY = lastMousePosition.y;
  
      setTablePositions((prevPositions) => ({
        ...prevPositions,
        [movedTable]: {
          x: mouseX,
          y: mouseY,
        },
      }));
  
      return;
    } else if (sourceTable === destinationTable) {
      // Extract the moved table from the tablesOnFloor array
      const movedTable = tablesOnFloor[result.source.index];
    
      // Remove the table from its current position
      const updatedTables = [...tablesOnFloor];
      updatedTables.splice(result.source.index, 1);
    
      // Insert the table at its new position
      updatedTables.splice(result.destination.index, 0, {
        ...movedTable,
        x: lastMousePosition.x,
        y: lastMousePosition.y,
      });
    
      // Update the state with the new order of tables on the floor
      // setTablesOnFloor(updatedTables);
    
      // Update the position of the moved table in the tablePositions state
      // setTablePositions((prevPositions) => ({
      //   ...prevPositions,
      //   [movedTable.id]: {
      //     x: lastMousePosition.x,
      //     y: lastMousePosition.y,
      //   },
      // }));
    
      // Update the floor state for the moved table
      setFloors((prevFloors) =>
    prevFloors.map((floor, index) =>
      index === currentFloorIndex
        ? {
            ...floor,
            tables: floor.tables.map((table) =>
              table.id === movedTable.id ? { ...table, ...movedTable, x: lastMousePosition.x, y: lastMousePosition.y } : table
            ),
          }
        : floor
    )
  );
    
      return;
    }
  
    // If source and destination tables are different, update positions and add to tablesOnFloor
    const movedTable = initialTables[result.source.index];
    const tableId = uuidv4();
    const mouseX = lastMousePosition.x;
    const mouseY = lastMousePosition.y;
    const floorWidth = 800; // Change this value based on your floor's width
    const floorHeight = 400; // Change this value based on your floor's height
  
    // Update the tables on the floor state
    if (
      // mouseX - 20 < floorWidth &&
      // mouseY - 50 < floorHeight &&
      // mouseY - 90 > 0 &&
      // mouseX - 50 > 0
      0<1
    ) {
      console.log(`Placing ${movedTable} on floor with id ${tableId}`);
      const placedTable = { type: movedTable, id: tableId, x: mouseX, y: mouseY };
  
      // setTablesOnFloor((prevTables) => [...prevTables, placedTable]);
  
      // setTablePositions((prevPositions) => ({
      //   ...prevPositions,
      //   [tableId]: {
      //     x: mouseX,
      //     y: mouseY,
      //   },
      // }));
  
      setFloors((prevFloors) =>
        prevFloors.map((floor, index) =>
          index === currentFloorIndex
            ? {
                ...floor,
                tables: [...floor.tables, placedTable],
                tablePositions: {
                  ...floor.tablePositions,
                  [tableId]: {
                    x: mouseX,
                    y: mouseY,
                  },
                },
              }
            : floor
        )
      );
  
      setSelectedTable(placedTable);
      setIsDetailsOpen(true);
    } else {
      // Revert to the previous position if the new position is outside the floor's boundaries
      console.log(`Failed to place ${movedTable} on floor. Position is outside boundaries.`);
      setTablePositions((prevPositions) => prevPositions);
    }
  };
  
  
//   useEffect(() => {
//     // Save floors to local storage whenever the floors state changes
//     localStorage.setItem('floors', JSON.stringify(floors));
//   }, [floors]);

  return (
    <div style={{border:'2px #784a4a solid',marginTop:'5%',borderRadius:'5px',position:'relative'}} className="tables-container">
       <div style={{position:'absolute',right:"5%",width:"20%"}} className='table-flex1'>
        <button style={{ width: '40%' }} className="final-save-button1" type="submit" onClick={handleSaveAndNavigate}>
          Save Changes
        </button>
    </div>
      <DragDropContext onDragEnd={handleDragEnd} dragThreshold={10}>
        <Droppable droppableId="tables" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="table-selection">
              {initialTables.map((table, index) => (
                <Table key={table} type={table} index={index} onClick={() => handleShapeClick(table)} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="restaurant-floors" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={{position:'absolute',right:'30%',top:"10%"}} className="restaurant-floors-container">
              {floors.map((floor, index) => (
                <button key={floor.id} onClick={() => handleNavigateFloor(index)}>
                  Floor {index + 1}
                </button>
              ))}
              <button onClick={handleAddFloor}>Add Floor</button>
              <button onClick={handleDeleteFloor}>Delete Floor</button>
              {/* <button onClick={handleEditFloor}>Edit Floor</button> */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId={`restaurant-floor-${currentFloorIndex}`} direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="restaurant-container">
            <div  className="restaurant-floor">
            {[...Array(10)].map((_, rowIndex) => (
    <div key={`row-${rowIndex}`} className="row10">
      {[...Array(20)].map((_, colIndex) => (
        <React.Fragment key={`col-${colIndex}`}>
          <div className="column"></div>
        </React.Fragment>
      ))}
    </div>
  ))}

{tablesOnFloor.map((table, index) => {
                const tableKey = table.id;

                return (
                  <Draggable key={tableKey} draggableId={tableKey} index={index}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`table ${table.type}`}
                        style={{
                          ...provided.draggableProps.style,
                          position: 'absolute',
                          opacity: snapshot.isDragging ? 0.5 : 1,
                          top: `${(table.y / screenHeight) * 100 || 0}%`,
                          left: `${(table.x / screenWidth) * 100 || 0}%`,
                        }}
                        onClick={() => handleShapeClick(tableKey)}
                        >
                          {table.number && (
                            <span className="table-number" style={{ color: 'white' }}>
                              {table.number}
                            </span>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {selectedTable && (
          <DetailsForm
          table={selectedTable}
          onSave={handleSaveDetails}
          onRemove={handleRemoveDetails} // Pass the removal function
          onCancel={handleCancelDetails}
        />
      )}
    </div>
  );
} 