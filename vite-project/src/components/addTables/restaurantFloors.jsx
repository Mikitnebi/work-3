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

const RestaurantFloor = ({ prevStep, nextStep }) => {
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
    type: ""
  });


  const currentFloor = floors[currentFloorIndex];
  const shapes = currentFloor.shapes;
  const [draggingStates, setDraggingStates] = useState(Array.from({ length: shapes.length }, () => false));

  const handleStageClick = (e) => {
    if (e && e.target) {
      const clickedShape = e.target;
      // Check if a shape is clicked
      console.log(clickedShape)

      if(clickedShape.attrs.x == 0 || clickedShape.attrs.x == 0){
        setSelectedShapeIndex(null);

      } else
      if (
        clickedShape &&
        (clickedShape.className === 'Rect' || clickedShape.className === 'Circle' || clickedShape.className === 'Text')
      ) {
        const shapeIndex = shapes.findIndex((shape) => shape.id === clickedShape.id());
        if (shapeIndex !== -1) {
          setSelectedShapeDetails({
            tableNumber: shapes[shapeIndex].tableNumber || '',
            maxPeopleAmount: shapes[shapeIndex].maxPeopleAmount || '',
            minPeopleAmount: shapes[shapeIndex].minPeopleAmount || '',
            selectedTag: shapes[shapeIndex].selectedTag || null,
            width: shapes[shapeIndex].width || '',
            height: shapes[shapeIndex].height || '',
            type: shapes[shapeIndex].type || ''
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
          width: 130,
          height: 120,

        };
        break;

      case 'circle':
        newShape = {
          id: uuidv4(),
          type: 'circle',
          x: 50,
          y: 50,
          width: 140,
          height: 120, 
        };
        break;

      case 'square':
        newShape = {
          id: uuidv4(),
          type: 'square',
          x: 50,
          y: 50,
          width: 140,
          height: 120, 

        };
        break;

        case 'ladder':
        newShape = {
          id: uuidv4(),
          type: 'ladder',
          x: 50,
          y: 50,
          width: 140,
          height: 120, 

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
      type: ''
    });
  };
  const handleShapeDragStart = (index) => {
    const updatedDraggingStates = [...draggingStates];
    updatedDraggingStates[index] = true;
    setDraggingStates(updatedDraggingStates);
  };
  const handleShapeDragEnd = (index, newProps) => {
    const updatedDraggingStates = [...draggingStates];
    updatedDraggingStates[index] = false;
    setDraggingStates(updatedDraggingStates);


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
      type: shape.type || ''
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
    const { tableNumber, maxPeopleAmount, minPeopleAmount, selectedTag, width, height,type } = selectedShapeDetails;
  
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
          type
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
    <select style={{borderWidth:'2px', borderRadius:'20px',width:'90%',backgroundColor:'#C6B0B4',color:'#8C1D2F'}} value={currentFloorIndex} onChange={(e) => onChange(parseInt(e.target.value))}>
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
          stroke="#41b6e6"
          strokeWidth={1}
        />
      );
    }

    for (let j = 0; j < 600 / gridSize; j++) {
      gridLines.push(
        <Line
          key={`gridLineY${j}`}
          points={[0, j * gridSize, 800, j * gridSize]}
          stroke="#41b6e6"
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
      if (tableNumber && shape.type != 'ladder') {
        return (
          <Text
            key={`tableNumber${index}`}
            x={x + (type === 'circle' ? width/2.1 : type === "square" ? width/2 : width/2.1 )}  // Adjust position based on shape type
            y={y - (type === 'circle' ? -height/2.2 :  type === "square" ? -height/2.2 : -height/2)}
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
      type: shape.type || ''
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
    const tableWithoutDetails = shapes.find((shape) => 
    (shape.type !== "ladder") && // Exclude shapes with type "ladder"
    (!shape.tableNumber || !shape.maxPeopleAmount || !shape.selectedTag || !shape.minPeopleAmount)
  );  
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
        type: shape?.type || ''
      });
      
    }
  }, [selectedShapeIndex, shapes]);

  
  const backgroundImage = new Image();
  const backgroundImage1 = new Image();
  const backgroundImage2 = new Image();
  const backgroundImage3 = new Image();
  backgroundImage3.src = '../../../public/stairs1.png';

  const yourBackgroundImage = new Image();
  const yourBackgroundImage1 = new Image();

  yourBackgroundImage.src = '../../../public/floor.png';
  yourBackgroundImage1.src = '../../../public/Untitled-1.png';

  backgroundImage.src = '../../../public/light33.png';
  backgroundImage1.src = '../../../public/light21.png';
  backgroundImage2.src = '../../../public/Rectangle70.png';
console.log(selectedShapeDetails)
  return (
    <div id="restaurant-floor">
      <div style={{ display: 'flex', margin: '5px',alignItems:'center' }}>
        <img className='rectangle1' onClick={() => addShape('rectangle')} src="../../../public/light33.png" alt="" />
        <img className='circle1' onClick={() => addShape('circle')} src="../../../public/Rectangle70.png" alt="" />
        <img className='square1' onClick={() => addShape('square')} src="../../../public/light21.png" alt="" />

        <img className='square1' onClick={() => addShape('ladder')} src="../../../public/stairs1.png" alt="" />

      </div>

      <div style={{ position: 'fixed', right: '0%', top: '3%', display: 'flex',width:'50%' }}>
        {/* <button style={{ width: '20%', height: '40px', margin: '10px' }} className="last-step-button1" onClick={(e) => prevStep()}>
          Back
        </button> */}
        <button onClick={addFloor} className='addFloor'>Add Floor</button>
        <button onClick={deleteFloor} className='deleteFloor'>Delete Floor</button>
        <div style={{ display: 'flex', margin: '5px', height: '20%', width: '20%' }}>
          <FloorSelector floors={floors} currentFloorIndex={currentFloorIndex} onChange={setCurrentFloorIndex} />
        </div>
        {/* <button className='final-save' onClick={handleFinalSave}>Final Save</button> */}

      </div>

      <Stage style={{ position: "absolute", left: '0%', marginTop: '0%', }}  backgroundImage={backgroundImage} width={700} height={500} onClick={handleStageClick} onTouchEnd={handleStageClick}>
        <Layer>
          {/* {renderGrid()} */}
          {currentFloorIndex === 0 && (  // Render this background image for the first floor
      <Rect
      key={-344}
        x={0}
        y={0}
        width={700} // Width of the stage
        height={500} // Height of the stage
        fillPatternImage={yourBackgroundImage} // Your background image
        fillPatternScaleX={0.72} // Scale the image to fit the stage width
        fillPatternScaleY={0.75} // Scale the image to fit the stage height
        fillPatternRepeat="no-repeat" // Prevent the image from repeating
      />
    )}

    {currentFloorIndex !== 0 && (  // Render this background image for other floors
      <Rect
      key={-345}

        x={0}
        y={0}
        width={700} // Width of the stage
        height={500} // Height of the stage
        fillPatternImage={yourBackgroundImage1} // Other background image
        fillPatternScaleX={0.24} // Scale the image to fit the stage width
        fillPatternScaleY={0.28} // Scale the image to fit the stage height
        fillPatternRepeat="no-repeat" // Prevent the image from repeating
      />
    )}
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
                  cornerRadius={10} // Set the border radius to 10px
                  stroke={!draggingStates[index] ? null : 'black'} // Use individual dragging state
                  onDragStart={() => handleShapeDragStart(index)} // Pass the index to identify the shape
                  strokeWidth={0.5} // Set the stroke width to 2px, adjust as needed

                  fillPatternImage={backgroundImage}
                  fillPatternScaleX={shape.width/180} // djust as needed
                  fillPatternScaleY={shape.height / 180}
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
                    cornerRadius={10} // Set the border radius to 10px
                    stroke={!draggingStates[index] ? null : 'black'} // Use individual dragging state
                    onDragStart={() => handleShapeDragStart(index)} // Pass the index to identify the shape
                    strokeWidth={0.5} // Set the stroke width to 2px, adjust as needed


                    fillPatternImage={backgroundImage2}
                    fillPatternScaleX={shape.width/180} // djust as needed
                    fillPatternScaleY={shape.height/120}
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
                    cornerRadius={10} // Set the border radius to 10px
                    fillPatternImage={backgroundImage1}
                    stroke={!draggingStates[index] ? null : 'black'} // Use individual dragging state
                    onDragStart={() => handleShapeDragStart(index)} // Pass the index to identify the shape
                    strokeWidth={0.5} // Set the stroke width to 2px, adjust as needed

                    fillPatternScaleX={shape.width/230} // Adjust as needed
                    fillPatternScaleY={shape.height/160}
                    fillPatternRepeat="no-repeat" // Prevent the image from repeating 
                  />
                )}


              {shape.type === 'ladder' && (
                  <Rect
                    {...shape}
                    draggable
                    onClick={() => handleShapeClick(index)}
                    onTouchStart={() => handleShapeClick(index)}
                    onTouchEnd={(e) => handleShapeDragEnd(index, e.target.position())}
                    onDragEnd={(e) => handleShapeDragEnd(index, e.target.position())}
                    cornerRadius={10} // Set the border radius to 10px
                    fillPatternImage={backgroundImage3}
                    stroke={!draggingStates[index] ? null : 'black'} // Use individual dragging state
                    onDragStart={() => handleShapeDragStart(index)} // Pass the index to identify the shape
                    strokeWidth={0.5} // Set the stroke width to 2px, adjust as needed

                    fillPatternScaleX={shape.width/200} // Adjust as needed
                    fillPatternScaleY={shape.height/180}
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
          { renderTableNumbers()}
        </Layer>
      </Stage>
      {selectedShapeIndex !== null && (
        
          
        
  <div className="details-form">
    {
                selectedShapeDetails.type != 'ladder' ?
        <>
         <label style={{color:"#8C1D2F",fontSize:'20px',fontWeight:'400'}}>
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
    <label style={{display:'flex',flexDirection:'column', width:'100%' ,alignItems:'flex-start' }}>
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
            color: 'red',
            borderColor: state.isFocused ? null : '#8C1D2F',
        
            width:'400px',
            backgroundColor:"#D9D9D9"
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
    
        </> : <></>
    }
   
    <div style={{ width:'100%', display:'flex' , justifyContent:'space-between'}}>
    <label style={{alignItems:'flex-start', width:'45%', display:'flex',flexDirection:'column'}}>
      Width:
      <input
        type="number"
        value={selectedShapeDetails.width}
        onChange={(e) => handleTableDetailsChange('width', e.target.value)}
      />
    </label>
    <label style={{alignItems:'flex-start', width:'45%', display:'flex',flexDirection:'column' }}>
      Height:
      <input
        type="number"
        value={selectedShapeDetails.height}
        onChange={(e) => handleTableDetailsChange('height', e.target.value)}
      />
    </label>
    </div>
    {
                      selectedShapeDetails.type != 'ladder' ?
<>
<button  className='button-details button1' onClick={handleSaveTable}>Save Table</button>
    <button  className='button-details button2' onClick={handleCancelTable}>Cancel</button>
    <button  className='button-details button3' onClick={handleDeleteTable}>Delete Table</button>
    </> 
    :
    <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
<button style={{ width:'30%'}} className='button-details button1' onClick={handleSaveTable}>Save ladder</button>
    <button style={{ width:'30%'}} className='button-details button2' onClick={handleCancelTable}>Cancel</button>
    <button style={{ width:'30%'}} className='button-details button3' onClick={handleDeleteTable}>Delete ladder</button>
    </div>
    }

    
  </div>
)}
<div className='tablesLastDiv'>
<button onClick={(e) => prevStep()} className='addFloor1'>უკან</button>
<img style={{width:'5%'}} src="../../../public/img/Group4.png" alt="Main Logo" />

<button onClick={handleFinalSave} className='addFloor1'>შემდეგი</button>

</div>
    </div>
  );
};

export default RestaurantFloor;













// import React, { useEffect, useState } from 'react';
// import { Stage, Layer, Rect, Circle, Transformer, Line, Text } from 'react-konva';
// import Select from 'react-select';
// import './jjj.css';
// import { v4 as uuidv4 } from 'uuid';

// const tagOptions = [
//   { value: '#ფანჯარასთან ახლოს', label: '#ფანჯარასთან ახლოს' },
//   { value: '#მყუდრო', label: '#მყუდრო' },
//   { value: '#რომანტიული', label: '#რომანტიული' },
//   { value: '#ღიაცისქვეშ', label: '#ღიაცისქვეშ' },
// ];

// const RestaurantFloor = ({ prevStep, nextStep }) => {
//   const [floors, setFloors] = useState([{ id: uuidv4(), shapes: [] }]);
//   const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
//   const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
//   const [selectedShapeDetails, setSelectedShapeDetails] = useState({
//     tableNumber: '',
//     tableCapacity: '',
//     selectedTag: null,
//     photo: null, // New property for storing the uploaded photo
//   });
//   const [selectedImageDataUrl, setSelectedImageDataUrl] = useState(null);

//   const currentFloor = floors[currentFloorIndex];
//   const shapes = currentFloor.shapes;

//   const handleStageClick = (e) => {
//     if (e && e.target) {
//       const clickedShape = e.target;
//       // Check if a shape is clicked
//       if (
//         clickedShape &&
//         (clickedShape.className === 'Rect' || clickedShape.className === 'Circle' || clickedShape.className === 'Text')
//       ) {
//         const shapeIndex = shapes.findIndex((shape) => shape.id === clickedShape.id());
//         if (shapeIndex !== -1) {
//           setSelectedShapeDetails({
//             tableNumber: `Table ${shapeIndex + 1}`,
//             capacity: shapes[shapeIndex].capacity || '',
//             selectedTag: shapes[shapeIndex].selectedTag || null,
//             photo: shapes[shapeIndex].photo || null, // Update selectedShapeDetails with photo
//           });
//           setSelectedShapeIndex(shapeIndex);
//         }
//       } else {
//         setSelectedShapeIndex(null);
//       }
//     }
//   };

//   const addShape = (shapeType) => {
//     let newShape;

//     switch (shapeType) {
//       case 'rectangle':
//         newShape = {
//           id: uuidv4(),
//           type: 'rectangle',
//           x: 50,
//           y: 50,
//           width: 100,
//           height: 50,
//         };
//         break;

//       case 'circle':
//         newShape = {
//           id: uuidv4(),
//           type: 'circle',
//           x: 50,
//           y: 50,
//           radius: 25,
//         };
//         break;

//       case 'square':
//         newShape = {
//           id: uuidv4(),
//           type: 'square',
//           x: 50,
//           y: 50,
//           width: 50,
//           height: 50,
//         };
//         break;

//       default:
//         break;
//     }

//     const updatedShapes = [...shapes, newShape];

//     // Check if the table number is unique across all floors and shapes
//     const isTableNumberUnique = floors.every((floor) =>
//       floor.shapes.every(
//         (shape) =>
//           shape.type !== shapeType ||
//           shapes.findIndex(
//             (s) => s.tableNumber === newShape.tableNumber && s.type === shapeType
//           ) === -1
//       )
//     );

//     if (!isTableNumberUnique) {
//       alert('Table number is already used. Please enter a unique table number.');
//       return;
//     }

//     setFloors((prevFloors) => {
//       const newFloors = [...prevFloors];
//       newFloors[currentFloorIndex] = { ...currentFloor, shapes: updatedShapes };
//       return newFloors;
//     });

//     const newShapeIndex = updatedShapes.length - 1;
//     setSelectedShapeIndex(newShapeIndex);
//     setSelectedShapeDetails({
//       tableNumber: `Table ${newShapeIndex + 1}`,
//       tableCapacity: '',
//       selectedTag: null,
//       photo: null, // Reset photo when adding a new shape
//     });
//   };

//   const handleShapeDragEnd = (index, newProps) => {
//     const { x, y } = newProps; // Extracting x and y coordinates from newProps
//     console.log(`Shape ${index} moved to x: ${x}, y: ${y}`);

//     const newShapes = shapes.slice();
//     newShapes[index] = { ...newShapes[index], ...newProps };
//     setFloors((prevFloors) => {
//       const newFloors = [...prevFloors];
//       newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
//       return newFloors;
//     });
//   };

//   const handleShapeClick = (index) => {
//     setSelectedShapeIndex(index);
//     const shape = shapes[index];
//     setSelectedShapeDetails({
//       tableNumber: shape.tableNumber || '',
//       tableCapacity: shape.tableCapacity || '',
//       selectedTag: shape.selectedTag || null,
//       photo: shape.photo || null, // Update selectedShapeDetails with photo
//     });
//   };

//   const handleTableDetailsChange = (field, value) => {
//     setSelectedShapeDetails((prevDetails) => ({
//       ...prevDetails,
//       [field]: value,
//     }));
//   };

//   const handleSaveTable = () => {
//     const { tableNumber, tableCapacity, selectedTag, photo } = selectedShapeDetails;

//     if (!/^\d+$/.test(tableNumber) || parseInt(tableNumber) < 0) {
//       alert('Please enter a non-negative table number.');
//       return;
//     }

//     if (!/^\d+$/.test(tableCapacity) || parseInt(tableCapacity) < 0) {
//       alert('Please enter a non-negative table capacity.');
//       return;
//     }

//     // Check if the table number is unique across all floors and shapes
//     const isTableNumberUnique = floors.every((floor) =>
//       floor.shapes.every(
//         (shape) =>
//           shape.tableNumber !== tableNumber ||
//           floor === currentFloor
//       )
//     );

//     if (!isTableNumberUnique) {
//       alert('Table number is already used. Please enter a unique table number.');
//       return;
//     }

//     if (!selectedTag || selectedTag.length === 0) {
//       alert('Please select at least one tag.');
//       return;
//     }

//     const newShapes = shapes.map((shape, index) => {
//       if (index === selectedShapeIndex) {
//         return {
//           ...shape,
//           tableNumber,
//           tableCapacity,
//           selectedTag,
//           photo, // Update photo
//         };
//       }
//       return shape;
//     });

//     setFloors((prevFloors) => {
//       const newFloors = [...prevFloors];
//       newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
//       return newFloors;
//     });

//     setSelectedShapeIndex(null);
//   };


//   const handleCancelTable = () => {
//     setSelectedShapeIndex(null);
//   };

//   const handleDeleteTable = () => {
//     const newShapes = [...shapes];
//     newShapes.splice(selectedShapeIndex, 1);

//     setFloors((prevFloors) => {
//       const newFloors = [...prevFloors];
//       newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
//       return newFloors;
//     });

//     setSelectedShapeIndex(null);
//   };

//   const addFloor = () => {
//     const newFloor = { id: uuidv4(), shapes: [] };
//     setFloors((prevFloors) => [...prevFloors, newFloor]);
//     setCurrentFloorIndex(floors.length); // Switch to the newly added floor
//   };
//   const FloorSelector = ({ floors, currentFloorIndex, onChange }) => (
//     <select value={currentFloorIndex} onChange={(e) => onChange(parseInt(e.target.value))}>
//       {floors.map((floor, index) => (
//         <option key={floor.id} value={index}>
//           Floor {index + 1}
//         </option>
//       ))}
//     </select>
//   );

//   const deleteFloor = () => {
//     if (floors.length > 1) {
//       const newFloors = floors.filter((floor, index) => index !== currentFloorIndex);
//       setFloors(newFloors);
//       setCurrentFloorIndex(Math.min(currentFloorIndex, newFloors.length - 1)); // Adjust current index
//     } else {
//       alert('Cannot delete the last floor.');
//     }
//   };
//   const renderGrid = () => {
//     const gridLines = [];
//     const gridSize = 50;

//     for (let i = 0; i < 800 / gridSize; i++) {
//       gridLines.push(
//         <Line
//           key={`gridLineX${i}`}
//           points={[i * gridSize, 0, i * gridSize, 600]}
//           stroke="#ddd"
//           strokeWidth={1}
//         />
//       );
//     }

//     for (let j = 0; j < 600 / gridSize; j++) {
//       gridLines.push(
//         <Line
//           key={`gridLineY${j}`}
//           points={[0, j * gridSize, 800, j * gridSize]}
//           stroke="#ddd"
//           strokeWidth={1}
//         />
//       );
//     }

//     return gridLines;
//   };

//   const renderTableNumbers = () => {
//     return shapes.map((shape, index) => {
//       const isSelected = index === selectedShapeIndex;
//       const { x, y, type, tableNumber } = shape;

//       if (tableNumber) {
//         return (
//           <Text
//             key={`tableNumber${index}`}
//             x={x + (type === 'circle' ? -10 : 20)}  // Adjust position based on shape type
//             y={y - (type === 'circle' ? 10 : -20)}
//             text={tableNumber}
//             fontSize={14}
//             fill={isSelected ? 'blue' : 'black'}
//             draggable={false}  // Disable dragging for the text
//             onClick={() => handleTableNumberClick(index)} // Add click handler for table numbers
//           />
//         );
//       }

//       return null;
//     });
//   };

//   const handleTableNumberClick = (index) => {
//     setSelectedShapeIndex(index);
//     const shape = shapes[index];
//     setSelectedShapeDetails({
//       tableNumber: shape.tableNumber || '',
//       tableCapacity: shape.tableCapacity || '',
//       selectedTag: shape.selectedTag || null,
//       photo: shape.photo || null, // Update selectedShapeDetails with photo
//     });
//   };

//   const saveToLocalStorage = () => {
//     localStorage.setItem('restaurantFloors', JSON.stringify(floors));
//   };

//   // Function to load floors' data from local storage
//   const loadFromLocalStorage = () => {
//     const savedFloors = localStorage.getItem('restaurantFloors');
//     if (savedFloors) {
//       setFloors(JSON.parse(savedFloors));
//     }
//   };

//   const handleFinalSave = () => {
//     // Check if any table is left with no details
//     const tableWithoutDetails = shapes.find((shape) => !shape.tableNumber || !shape.tableCapacity || !shape.selectedTag);

//     if (tableWithoutDetails) {
//       alert('Please fill in all details for each table.');
//       return;
//     }

//     // Check if any floor doesn't have any tables
//     const floorWithoutTables = floors.find((floor) => floor.shapes.length === 0);

//     if (floorWithoutTables) {
//       alert('Please add tables to all floors.');
//       return;
//     }

//     // Save to local storage
//     saveToLocalStorage();
//     console.log(floors)
//     // Perform your final save logic here
//     nextStep()
//   };

//   useEffect(() => {
//     // Load data from local storage on component mount
//     loadFromLocalStorage();
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   useEffect(() => {
//     // Update selectedShapeDetails when selectedShapeIndex changes
//     if (selectedShapeIndex !== null) {
//       const shape = shapes[selectedShapeIndex];
//       setSelectedShapeDetails({
//         tableNumber: shape.tableNumber || '',
//         tableCapacity: shape.tableCapacity || '',
//         selectedTag: shape.selectedTag || null,
//         photo: shape.photo || null, // Update selectedShapeDetails with photo
//       });
//     }
//   }, [selectedShapeIndex, shapes]);
//   const handlePhotoUpload = (file) => {
//     // Check if a file is selected
//     if (file) {
//       // Read the file content
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const photoDataURL = event.target.result;
//         // Create an Image object from the data URL
//         const img = new window.Image();
//         img.onload = () => {
//           // Update the selected shape with the uploaded photo
//           const updatedShapes = shapes.map((shape, index) => {
//             if (index === selectedShapeIndex) {
//               return { ...shape, photo: photoDataURL };
//             }
//             return shape;
//           });
//           setFloors((prevFloors) => {
//             const newFloors = [...prevFloors];
//             newFloors[currentFloorIndex] = { ...currentFloor, shapes: updatedShapes };
//             return newFloors;
//           });
//         };
//         img.src = photoDataURL;
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
  

//   return (
//     <div id="restaurant-floor">
//       <div style={{ display: 'flex', margin: '5px' }}>
//         <button className='rectangle1' onClick={() => addShape('rectangle')}>Add Table</button>
//         <button className='circle1' onClick={() => addShape('circle')}>Add Table</button>
//         <button className='square1' onClick={() => addShape('square')}>Add Table</button>

//       </div>

//       <div style={{ position: 'fixed', right: '10%', top: '10px', display: 'flex' }}>
//         <button style={{ width: '20%', height: '40px', margin: '10px' }} className="last-step-button1" onClick={(e) => prevStep()}>
//           Back
//         </button>
//         <button onClick={addFloor} className='addFloor'>Add Floor</button>
//         <button onClick={deleteFloor} className='deleteFloor'>Delete Floor</button>
//         <div style={{ display: 'flex', margin: '5px', height: '50px', width: '100px' }}>
//           <FloorSelector floors={floors} currentFloorIndex={currentFloorIndex} onChange={setCurrentFloorIndex} />
//         </div>
//         <button className='final-save' onClick={handleFinalSave}>Final Save</button>

//       </div>

//       <Stage style={{ position: "absolute", left: '10%', marginTop: '10%' }} width={700} height={400} onClick={handleStageClick} onTouchEnd={handleStageClick}>
//         <Layer>
//           {renderGrid()}

//           {shapes.map((shape, index) => {
//   const isSelected = index === selectedShapeIndex;
//   const shapePhoto = shape.photo; // Get the photo from shape

//   return (
//     <React.Fragment key={index}>
//       {shape.type === 'rectangle' && (
//   <Rect
//   {...shape}
//   draggable
//   onClick={() => handleShapeClick(index)}
//   onTouchStart={() => handleShapeClick(index)}
//   onTouchEnd={(e) => handleShapeDragEnd(index, e.target.position())}
//   onDragEnd={(e) => handleShapeDragEnd(index, e.target.position())}
//   stroke={isSelected ? 'blue' : 'black'}
//   cornerRadius={10}
//   fillPatternImage={shape.photo ? new window.Image(shape.photo) : null} // Use shape's photo for fill pattern
//   fillPatternScaleX={shape.width / 200} // Adjust scale if needed
//   fillPatternScaleY={shape.height !== 0 ? shape.height / 200 : 1} // Check if height is valid before setting scale
// />
// )}

//       {shape.type === 'circle' && (
//         <Circle
//         {...shape}
//   draggable
//   onClick={() => handleShapeClick(index)}
//   onTouchStart={() => handleShapeClick(index)}
//   onTouchEnd={(e) => handleShapeDragEnd(index, e.target.position())}
//   onDragEnd={(e) => handleShapeDragEnd(index, e.target.position())}
//   stroke={isSelected ? 'blue' : 'black'}
//   cornerRadius={10}
//   fillPatternImage={shape.photo ? new window.Image(shape.photo) : null} // Use shape's photo for fill pattern
//   fillPatternScaleX={shape.width / 200} // Adjust scale if needed
//   fillPatternScaleY={shape.height !== 0 ? shape.height / 200 : 1} // Check if height is valid before setting scale
//         />
//       )}

//       {shape.type === 'square' && (
//         <Rect
//         {...shape}
//         draggable
//         onClick={() => handleShapeClick(index)}
//         onTouchStart={() => handleShapeClick(index)}
//         onTouchEnd={(e) => handleShapeDragEnd(index, e.target.position())}
//         onDragEnd={(e) => handleShapeDragEnd(index, e.target.position())}
//         stroke={isSelected ? 'blue' : 'black'}
//         cornerRadius={10}
//         fillPatternImage={shape.photo ? new window.Image(shape.photo) : null} // Use shape's photo for fill pattern
//         fillPatternScaleX={shape.width / 200} // Adjust scale if needed
//         fillPatternScaleY={shape.height !== 0 ? shape.height / 200 : 1} // Check if height is valid before setting scale
//         />
//       )}

//       {isSelected && (
//         <Transformer
//           anchorSize={6}
//           borderEnabled={false}
//           keepRatio={false}
//           rotateEnabled={false}
//           ignoreStroke
//           ref={(node) => {
//             if (node && isSelected) {
//               node.getLayer().batchDraw();
//             }
//           }}
//         />
//       )}
//     </React.Fragment>
//   );
// })}
//           {renderTableNumbers()}
//         </Layer>
//       </Stage>
//       {selectedShapeIndex !== null && (
//         <div className="details-form">
//           <label>
//             Table Number:
//             <input
//               type="number"
//               value={selectedShapeDetails.tableNumber}
//               onChange={(e) => handleTableDetailsChange('tableNumber', e.target.value)}
//             />
//           </label>
//           <label>
//             Table Capacity:
//             <input
//               type="number"
//               value={selectedShapeDetails.tableCapacity}
//               onChange={(e) => handleTableDetailsChange('tableCapacity', e.target.value)}
//             />
//           </label>
//           <label style={{ maxWidth: '300px' }}>
//             Table Tag:
//             <Select
//               value={selectedShapeDetails.selectedTag}
//               onChange={(selectedOption) =>
//                 handleTableDetailsChange('selectedTag', selectedOption)
//               } options={tagOptions}
//               isMulti
//               styles={{
//                 control: (baseStyles, state) => ({
//                   ...baseStyles,
//                   color: 'red'
//                 }),
//               }}
//             />
//           </label>
//           {/* Add input field for uploading photo */}
//           <label>
//             Upload Photo:
//             <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e.target.files[0])} />
//           </label>
//           {/* Display uploaded photo */}
//         {selectedShapeDetails.photo && (
//       <div>
//         <img src={selectedShapeDetails.photo} alt="Table Photo" style={{ width: '100px', height: 'auto' }} />
//       </div>
//     )}
//           <button onClick={handleSaveTable}>Save Table</button>
//           <button onClick={handleCancelTable}>Cancel</button>
//           <button onClick={handleDeleteTable}>Delete Table</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RestaurantFloor;

