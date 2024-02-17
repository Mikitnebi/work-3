
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle, Transformer, Line, Text } from 'react-konva';
import Select from 'react-select';
import './jjj.css';
import { v4 as uuidv4 } from 'uuid';

const tagOptions = [
  { value: '#ფანჯარასთან ახლოს', label: '#ფანჯარასთან ახლოს' },
  { value: '#მყუდრო', label: '#მყუდრო' },
  { value: '#რომანტიული', label: '#რომანტიული' },
  { value: '#ღიაცისქვეშ', label: '#ღიაცისქვეშ' },
];

const RestaurantFloorForDetails = ({ prevStep, nextStep }) => {
  const [floors, setFloors] = useState([{ id: uuidv4(), shapes: [] }]);
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
  const [selectedShapeDetails, setSelectedShapeDetails] = useState({
    tableNumber: '',
    maxPeopleAmount: '',
    minPeopleAmount: '',
    selectedTag: null,
    width: 0,
    height: 0,
  });


  const currentFloor = floors[currentFloorIndex];
  const shapes = currentFloor.shapes;

  const handleStageClick = (e) => {
    if (e && e.target) {
      const clickedShape = e.target;
      // Check if a shape is clicked
      if (
        clickedShape &&
        (clickedShape.className === 'Rect' || clickedShape.className === 'Circle' || clickedShape.className === 'Text')
      ) {
        const shapeIndex = shapes.findIndex((shape) => shape.id === clickedShape.id());
        if (shapeIndex !== -1) {
          setSelectedShapeDetails({
            tableNumber: `Table ${shapeIndex + 1}`,
            maxPeopleAmount: shapes[index].maxPeopleAmount || '',
            minPeopleAmount: shapes[index].minPeopleAmount || '',
            selectedTag: shapes[shapeIndex].selectedTag || null,
            width: shapes[index].width || '',
            height: shapes[index].height || '',

          });
          setSelectedShapeIndex(shapeIndex);
        }
      } else {
        setSelectedShapeIndex(null);
      }
    }
  };

  const addShape = (shapeType) => {
    let newShape;

    switch (shapeType) {
      case 'rectangle':
        newShape = {
          id: uuidv4(),
          type: 'rectangle',
          x: 50,
          y: 50,
          width: 85,
          height: 50,
        };
        break;

      case 'circle':
        newShape = {
          id: uuidv4(),
          type: 'circle',
          x: 50,
          y: 50,
          width: 70,
          height: 70,        };
        break;

      case 'square':
        newShape = {
          id: uuidv4(),
          type: 'square',
          x: 50,
          y: 50,
          width: 50,
          height: 50,
        };
        break;

      default:
        break;
    }

    const updatedShapes = [...shapes, newShape];

    // Check if the table number is unique across all floors and shapes
    const isTableNumberUnique = floors.every((floor) =>
      floor.shapes.every(
        (shape) =>
          shape.type !== shapeType ||
          shapes.findIndex(
            (s) => s.tableNumber === newShape.tableNumber && s.type === shapeType
          ) === -1
      )
    );

    // if (!isTableNumberUnique) {
    //   alert('Table number is already used. Please enter a unique table number.');
    //   return;
    // }

    setFloors((prevFloors) => {
      const newFloors = [...prevFloors];
      newFloors[currentFloorIndex] = { ...currentFloor, shapes: updatedShapes };
      return newFloors;
    });

    const newShapeIndex = updatedShapes.length - 1;
    setSelectedShapeIndex(newShapeIndex);
    setSelectedShapeDetails({
      tableNumber: `Table ${newShapeIndex + 1}`,
      maxPeopleAmount: '',
      minPeopleAmount: '',
      selectedTag: null,
      width: 0,
      height: 0,
    });
  };

  const handleShapeDragEnd = (index, newProps) => {
    const newShapes = shapes.slice();
    newShapes[index] = { ...newShapes[index], ...newProps };
    setFloors((prevFloors) => {
      const newFloors = [...prevFloors];
      newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
      return newFloors;
    });
  };

  const handleShapeClick = (index) => {
    setSelectedShapeIndex(index);
    const shape = shapes[index];
    setSelectedShapeDetails({
      tableNumber: shape.tableNumber || '',
      maxPeopleAmount: shape.maxPeopleAmount || '',
      minPeopleAmount: shape.minPeopleAmount || '',
      selectedTag: shape.selectedTag || null,
      width: shape.width || 0, // Set default width
      height: shape.height || 0, // Set default height
    });
    
  };

  const handleTableDetailsChange = (field, value) => {
    setSelectedShapeDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  
    // If the changed field is width or height, update the selected shape
    if (field === 'width' || field === 'height') {
      const newShapes = shapes.map((shape, index) => {
        if (index === selectedShapeIndex) {
          return {
            ...shape,
            [field]: value,
          };
        }
        return shape;
      });
  
      setFloors((prevFloors) => {
        const newFloors = [...prevFloors];
        newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
        return newFloors;
      });
    }
  };
  const handleSaveTable = () => {
    const { tableNumber, maxPeopleAmount, minPeopleAmount, selectedTag, width, height } = selectedShapeDetails;
  
    const currentShape = shapes[selectedShapeIndex];
  
    // Check if table number is modified
    if (tableNumber !== currentShape.tableNumber) {
      // Check if table number is unique across all floors
      const isTableNumberUnique = floors.every((floor) =>
        floor.shapes.every((shape) => shape.tableNumber !== tableNumber)
      );
  
      if (!isTableNumberUnique) {
        alert('Table number is already used. Please enter a unique table number.');
        return;
      }
    }
  
    if (!selectedTag || selectedTag.length === 0) {
      alert('Please select at least one tag.');
      return;
    }
  
    // Validate maxPeopleAmount and minPeopleAmount
    if (!maxPeopleAmount || !minPeopleAmount) {
      alert('Please enter both maximum and minimum people amount.');
      return;
    }
  
    // Convert the values to numbers for comparison
    const maxPeople = parseInt(maxPeopleAmount);
    const minPeople = parseInt(minPeopleAmount);
  
    // Check if maxPeopleAmount is greater than or equal to minPeopleAmount
    if (maxPeople <= minPeople) {
      alert('Maximum people amount must be greater than minimum people amount.');
      return;
    }
  
    const newShapes = shapes.map((shape, index) => {
      if (index === selectedShapeIndex) {
        return {
          ...shape,
          tableNumber,
          maxPeopleAmount,
          minPeopleAmount,
          selectedTag,
          width,
          height,
        };
      }
      return shape;
    });
  
    setFloors((prevFloors) => {
      const newFloors = [...prevFloors];
      newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
      return newFloors;
    });
  
    setSelectedShapeIndex(null);
  };
  
  

  


  const handleCancelTable = () => {
    setSelectedShapeIndex(null);
  };

  const handleDeleteTable = () => {
    const newShapes = [...shapes];
    newShapes.splice(selectedShapeIndex, 1);

    setFloors((prevFloors) => {
      const newFloors = [...prevFloors];
      newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
      return newFloors;
    });

    setSelectedShapeIndex(null);
  };

  const addFloor = () => {
    const newFloor = { id: uuidv4(), shapes: [] };
    setFloors((prevFloors) => [...prevFloors, newFloor]);
    setCurrentFloorIndex(floors.length); // Switch to the newly added floor
  };
  const FloorSelector = ({ floors, currentFloorIndex, onChange }) => (
    <select value={currentFloorIndex} onChange={(e) => onChange(parseInt(e.target.value))}>
      {floors.map((floor, index) => (
        <option key={floor.id} value={index}>
          Floor {index + 1}
        </option>
      ))}
    </select>
  );

  const deleteFloor = () => {
    if (floors.length > 1) {
      const newFloors = floors.filter((floor, index) => index !== currentFloorIndex);
      setFloors(newFloors);
      setCurrentFloorIndex(Math.min(currentFloorIndex, newFloors.length - 1)); // Adjust current index
    } else {
      alert('Cannot delete the last floor.');
    }
  };
  const renderGrid = () => {
    const gridLines = [];
    const gridSize = 50;

    for (let i = 0; i < 800 / gridSize; i++) {
      gridLines.push(
        <Line
          key={`gridLineX${i}`}
          points={[i * gridSize, 0, i * gridSize, 600]}
          stroke="#ddd"
          strokeWidth={1}
        />
      );
    }

    for (let j = 0; j < 600 / gridSize; j++) {
      gridLines.push(
        <Line
          key={`gridLineY${j}`}
          points={[0, j * gridSize, 800, j * gridSize]}
          stroke="#ddd"
          strokeWidth={1}
        />
      );
    }

    return gridLines;
  };

  const renderTableNumbers = () => {
    return shapes.map((shape, index) => {
      const isSelected = index === selectedShapeIndex;
      const { x, y, type, tableNumber } = shape;
      let width =shape?.width
      let height = shape?.height
      if (tableNumber) {
        return (
          <Text
            key={`tableNumber${index}`}
            x={x + (type === 'circle' ? width/2.5 : width/2.5)}  // Adjust position based on shape type
            y={y - (type === 'circle' ? -height/2.5 : -height/2.5)}
            text={tableNumber}
            fontSize={14}
            fill={isSelected ? 'white' : 'white'}
            draggable={false}  // Disable dragging for the text
            onClick={() => handleTableNumberClick(index)} // Add click handler for table numbers
          />
        );
      }

      return null;
    });
  };

  const handleTableNumberClick = (index) => {
    console.log('Table number clicked:', index);
    console.log('Selected shape details:', shapes[index]);
    // Continue with your existing logic
    setSelectedShapeIndex(index);
    const shape = shapes[index];
    setSelectedShapeDetails({
      tableNumber: shape.tableNumber || '',
      maxPeopleAmount: shape.maxPeopleAmount || '',
      minPeopleAmount: shape.minPeopleAmount || '',
      selectedTag: shape.selectedTag || null,
      width: shape.width || 0, // Set default width
      height: shape.height || 0, // Set default height
    });
    
  };
  const saveToLocalStorage = () => {
    localStorage.setItem('restaurantFloors', JSON.stringify(floors));
  };

  // Function to load floors' data from local storage
  const loadFromLocalStorage = () => {
    const savedFloors = localStorage.getItem('restaurantFloors');
    if (savedFloors) {
      setFloors(JSON.parse(savedFloors));
    }
  };

  const handleFinalSave = () => {
    // Check if any table is left with no details
    const tableWithoutDetails = shapes.find((shape) => !shape.tableNumber || !shape.tableCapacity || !shape.selectedTag);
  
    if (tableWithoutDetails) {
      alert('Please fill in all details for each table.');
      return;
    }
  
    // Check if any floor doesn't have any tables
    const floorWithoutTables = floors.find((floor) => floor.shapes.length === 0);
  
    if (floorWithoutTables) {
      alert('Please add tables to all floors.');
      return;
    }
  
    // Check uniqueness of table numbers across all floors and shapes
    // const isTableNumberUnique = floors.every((floor, floorIndex) =>
    //   floor.shapes.every(
    //     (shape) =>
    //       shape.tableNumber !==  shape.selectedShapeDetails.tableNumber || // Here is the fix
    //       (floorIndex === currentFloorIndex && shapes.indexOf(shape) === selectedShapeIndex)
    //   )
    // );
  
    // if (!isTableNumberUnique) {
    //   alert('Table number is already used. Please enter a unique table number.');
    //   return;
    // }
  
    // Save to local storage
    saveToLocalStorage();
  
    // Perform your final save logic here
    nextStep();
  };
  
  

  useEffect(() => {
    // Load data from local storage on component mount
    loadFromLocalStorage();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    // Update selectedShapeDetails when selectedShapeIndex changes
    if (selectedShapeIndex !== null) {
      const shape = shapes[selectedShapeIndex];
      setSelectedShapeDetails({
        tableNumber: shape?.tableNumber || '',
        maxPeopleAmount: shape?.maxPeopleAmount || '',
        minPeopleAmount: shape?.minPeopleAmount || '',
        selectedTag: shape?.selectedTag || null,
        width: shape?.width || 0, // Set default width
        height: shape?.height || 0, // Set default height
      });
      
    }
  }, [selectedShapeIndex, shapes]);

  
  const backgroundImage = new Image();
  const backgroundImage1 = new Image();
  const backgroundImage2 = new Image();

  backgroundImage.src = '../../../public/img/sdasdasd.jpg';
  backgroundImage1.src = '../../../public/img/asdgwef.jpg';
  backgroundImage2.src = '../../../public/img/circle.jpg';


  return (
    <div id="restaurant-floor">
       <div style={{ display: 'flex', marginTop: '20px',marginLeft:'20px' }}>
        <button className='rectangle1' onClick={() => addShape('rectangle')}></button>
        <button className='circle1' onClick={() => addShape('circle')}></button>
        <button className='square1' onClick={() => addShape('square')}></button>

      </div>

      <div style={{position:'absolute',right:'10%',top:'10px',display:'flex'}}>
        <button style={{ width: '20%', height: '40px', margin: '10px' }} className="last-step-button1" onClick={(e) => prevStep()}>
          Back
        </button>
        <button onClick={addFloor} className='addFloor'>Add Floor</button>
        <button onClick={deleteFloor} className='deleteFloor'>Delete Floor</button>
        <div style={{ display: 'flex', margin: '5px', height: '50px', width: '100px' }}>
          <FloorSelector floors={floors} currentFloorIndex={currentFloorIndex} onChange={setCurrentFloorIndex} />
        </div>
        <button className='final-save' onClick={handleFinalSave}>Final Save</button>

      </div>

      <Stage style={{  marginLeft: '5%', marginTop: '5%',marginBottom:'5%' }} width={700} height={400} onClick={handleStageClick}>
        <Layer>
          {renderGrid()}

          {shapes.map((shape, index) => {
            const isSelected = index === selectedShapeIndex;
            return (
              <React.Fragment key={index}>
                {shape.type === 'rectangle' && (
                  <Rect
                  {...shape}
                  draggable
                  onClick={() => handleShapeClick(index)}
                  onTouchStart={() => handleShapeClick(index)}
                  onTouchEnd={(e) => handleShapeDragEnd(index, e.target.position())}
                  onDragEnd={(e) => handleShapeDragEnd(index, e.target.position())}
                  stroke={isSelected ? 'blue' : 'black'}
                  cornerRadius={10} // Set the border radius to 10px
                  fillPatternImage={backgroundImage}
                  fillPatternScaleX={shape.width/2500} // djust as needed
                  fillPatternScaleY={shape.height / 2500}
                  fillPatternRepeat="no-repeat" // Prevent the image from repeating 
                  />
                )}

                {shape.type === 'circle' && (
                  <Rect
                    {...shape}
                    draggable
                    onClick={() => handleShapeClick(index)}
                    onTouchStart={() => handleShapeClick(index)}
                    onTouchEnd={(e) => handleShapeDragEnd(index, e.target.position())}
                    onDragEnd={(e) => handleShapeDragEnd(index, e.target.position())}
                    stroke={isSelected ? 'blue' : 'black'}
                    cornerRadius={10} // Set the border radius to 10px
                    fillPatternImage={backgroundImage2}
                    fillPatternScaleX={shape.width/1400} // djust as needed
                    fillPatternScaleY={shape.height/1400}
                    fillPatternRepeat="no-repeat" // Prevent the image from repeating 
                  />
                )}

                {shape.type === 'square' && (
                  <Rect
                    {...shape}
                    draggable
                    onClick={() => handleShapeClick(index)}
                    onTouchStart={() => handleShapeClick(index)}
                    onTouchEnd={(e) => handleShapeDragEnd(index, e.target.position())}
                    onDragEnd={(e) => handleShapeDragEnd(index, e.target.position())}
                    stroke={isSelected ? 'blue' : 'black'}
                    cornerRadius={10} // Set the border radius to 10px
                    fillPatternImage={backgroundImage1}
                    fillPatternScaleX={shape.width/1200} // Adjust as needed
                    fillPatternScaleY={shape.height/1200}
                    fillPatternRepeat="no-repeat" // Prevent the image from repeating 
                  />
                )}

                {isSelected && (
                  <Transformer
                    anchorSize={6}
                    borderEnabled={false}
                    keepRatio={false}
                    rotateEnabled={false}
                    ignoreStroke
                    ref={(node) => {
                      if (node && isSelected) {
                        node.getLayer().batchDraw();
                      }
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
          {renderTableNumbers()}
        </Layer>
      </Stage>
      {selectedShapeIndex !== null && (
  <div className="details-form-details">
    <label>
      Table Number:
      <input
        type="number"
        value={selectedShapeDetails.tableNumber}
        onChange={(e) => handleTableDetailsChange('tableNumber', e.target.value)}
      />
    </label>
    <label>
      Max People Amount:
      <input
        type="number"
        value={selectedShapeDetails.maxPeopleAmount}
        onChange={(e) => handleTableDetailsChange('maxPeopleAmount', e.target.value)}
      />
    </label>
    <label>
      Min People Amount:
      <input
        type="number"
        value={selectedShapeDetails.minPeopleAmount}
        onChange={(e) => handleTableDetailsChange('minPeopleAmount', e.target.value)}
      />
    </label>
    <label style={{ maxWidth: '300px' }}>
      Table Tag:
      <Select
        value={selectedShapeDetails.selectedTag}
        onChange={(selectedOption) =>
          handleTableDetailsChange('selectedTag', selectedOption)
        } options={tagOptions}
        isMulti
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            color: 'red'
          }),
        }}
      />
    </label>
    <label>
      Width:
      <input
        type="number"
        value={selectedShapeDetails.width}
        onChange={(e) => handleTableDetailsChange('width', e.target.value)}
      />
    </label>
    <label>
      Height:
      <input
        type="number"
        value={selectedShapeDetails.height}
        onChange={(e) => handleTableDetailsChange('height', e.target.value)}
      />
    </label>
    <button onClick={handleSaveTable}>Save Table</button>
    <button onClick={handleCancelTable}>Cancel</button>
    <button onClick={handleDeleteTable}>Delete Table</button>
  </div>
)}
    </div>
  );
};

export default RestaurantFloorForDetails;






