import { NavLink, useLocation, useParams } from 'react-router-dom'
import './homePage.css'
import { limitRecipeTitle } from '../../utils';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Transformer, Line, Text } from 'react-konva';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import SelectInput from '../selecter';
import TransformableRectangle from '../addTables/TransformerRect';
import TransformableCircle from '../addTables/TransformerCircle';
import TransformableThird from '../addTables/TransformerThird';
import TransformableLedder from '../addTables/TransformerLedder';
import TransformableDoor from '../addTables/TransformerDoor';
import TableMenegmentModal from '../modals/tableMenegmentModal';
import { StoreContextRecipe } from '../../App';
import BookCard from '../reservations/reservationCard';


const tagOptions = [
    { value: '#ფანჯარასთან ახლოს', label: '#ფანჯარასთან ახლოს' },
    { value: '#მყუდრო', label: '#მყუდრო' },
    { value: '#რომანტიული', label: '#რომანტიული' },
    { value: '#ღიაცისქვეშ', label: '#ღიაცისქვეშ' },
  ];

export default function TableManagment () {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const [activeOption, setActiveOption] = useState(0);
  const { stateRecipe,dispatchRecipe } = useContext(StoreContextRecipe);
  const [isChangable,setIsChangable] = useState(false)
  const [originalData, setOriginalData] = useState(null);
  const [changedData, setChangedData] = useState(null);
  const handleOptionClick = (index) => {
    setActiveOption(index);
  };
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const params = useParams();
    const location = useLocation();

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };
    const date = new Date();

    const formattedDate = date.toLocaleString('en-GB', {
      hour12: false,
      timeZone: 'Asia/Tbilisi',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
console.log(location.pathname)
const [selectedTableNumber,setSelectedTableNumber] = useState(null)
const [floors, setFloors] = useState([{ id: uuidv4(), name: 'Floor 1', shapes: [] }]);
const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
const [selectedShapeDetails, setSelectedShapeDetails] = useState({
  tableNumber: '',
  maxPeopleAmount: '',
  minPeopleAmount: '',
  selectedTag: null,
  width: 0,
  height: 0,
  type: "",
  colorIndex:0,
  isForReservation:true,
  rotation: 0,
  isFree:true
});

const [floorNames, setFloorNames] = useState(floors.map(floor => floor.name));
const handleFloorNameChange = (index, newName) => {
  const updatedNames = [...floorNames];
  updatedNames[index] = newName;
  setFloorNames(updatedNames);

  const updatedFloors = [...floors];
  updatedFloors[index].name = newName;
  setFloors(updatedFloors);
};



const [selectWidth, setSelectWidth] = useState('100%'); // Initial width set to 100%
const [selectHeight, setSelectHeight] = useState('100%'); // Initial width set to 100%
const [selectWidthPortal, setSelectWidthPortal] = useState('100%'); // Initial width set to 100%

useEffect(() => {
  const handleResize = () => {
    const screenWidth = window.innerWidth; // Get the screen width
    const screenHeight = window.innerHeight; // Get the screen width

    setSelectWidth(`${screenWidth*20.7/100}px`); // Set the width of the Select component
    setSelectWidthPortal(`${screenWidth*39/100}px`)
    setSelectHeight(`${screenHeight*20/100}px`); // Set the width of the Select component
  };

  // Listen for resize events
  window.addEventListener('resize', handleResize);

  // Initialize width on mount
  handleResize();

  // Cleanup
  return () => window.removeEventListener('resize', handleResize);
}, []); 


function extractWidth(selectWidth) {
  // Regular expression to match the numerical part of the string
  const regex = /\d+(\.\d+)?/;

  // Extract the numerical part using match
  const matches = selectWidth.match(regex);

  if (matches) {
      // Convert the matched string to a number
      const widthNumber = parseFloat(matches[0]);
      return widthNumber;
  } else {
      // If no match found, return null or handle the error accordingly
      return null;
  }
}



const currentFloor = floors[currentFloorIndex];
const shapes = currentFloor.shapes;
const [draggingStates, setDraggingStates] = useState(Array.from({ length: shapes.length }, () => false));

const handleStageClick = (e) => {
  if (e && e.target) {
    const clickedShape = e.target;
    // Check if a shape is clicked
    // console.log(clickedShape)

    if(clickedShape.attrs.x == 30 || clickedShape.attrs.x == 30){
      setSelectedShapeIndex(null);
      console.log('null-stage') 
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
          type: shapes[shapeIndex].type || '',
          colorIndex: shapes[shapeIndex].colorIndex || 0,
          isForReservation: shapes[shapeIndex].isForReservation || true,
          rotation: shapes[shapeIndex].rotation || 0,
          isFree: shapes[shapeIndex].isFree ,


        });
        setSelectedShapeIndex(shapeIndex);
      }
    } else {
      console.log('null-stage') 

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
        x: extractWidth(selectWidth)/2,
        y: extractWidth(selectHeight),
        width: extractWidth(selectWidth)/3,
        height: extractWidth(selectHeight)/1.5,
        colorIndex:0,
        isForReservation:true,
        rotation: 0,
        isFree:true
      };
      break;

    case 'circle':
      newShape = {
        id: uuidv4(),
        type: 'circle',
        x: extractWidth(selectWidth)/2,
        y: extractWidth(selectHeight),
        width: extractWidth(selectWidth)/3,
        height: extractWidth(selectHeight)/1.5,
        colorIndex:0,
        isForReservation:true,
        rotation: 0,
        isFree:true

      };
      break;

    case 'square':
      newShape = {
        id: uuidv4(),
        type: 'square',
        x: extractWidth(selectWidth)/2,
        y: extractWidth(selectHeight),
        width: extractWidth(selectWidth)/3,
        height: extractWidth(selectHeight)/1.5,
        colorIndex:0,
        isForReservation:true,
        rotation: 0,
        isFree:true

      };
      break;

      case 'ladder':
      newShape = {
        id: uuidv4(),
        type: 'ladder',
        x: extractWidth(selectWidth)/2,
        y: extractWidth(selectHeight),
        width: extractWidth(selectWidth)/3,
        height: extractWidth(selectHeight)/1.5,
        rotation: 0,
      };
      break;

      case 'door':
        newShape = {
          id: uuidv4(),
          type: 'door',
          x: extractWidth(selectWidth)/2,
          y: extractWidth(selectHeight),
          width: extractWidth(selectWidth)/3,
          height: extractWidth(selectHeight)/1.5,
          rotation: 0,
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
    type: '',
    colorIndex:0,
    isForReservation:true,
    rotation: 0,
    isFree:true 

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
  newShapes[index] = { ...newShapes[index],...newProps };
  setFloors((prevFloors) => {
    const newFloors = [...prevFloors];
    newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
    return newFloors;
  });
};

const [selectedTableFree,setSelectedTableFree] = useState(true)

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
    type: shape.type || '',
    colorIndex: shape.colorIndex || 0,
    isForReservation: shape.isForReservation ,
    rotation: shape.rotation || 0,
    isFree: shape.isFree ,



  });
  if(isChangable){
    setIsOpenRegistration(true)

  } else {
    setSelectedTableNumber(shape.tableNumber)
    setIsOpenSideBar(false)
    setSelectedTableFree(shape.isFree)
  }
  
};

const handleTableDetailsChange = (field, value) => {

  let newShapes;


  setSelectedShapeDetails((prevDetails) => ({
    ...prevDetails,
    [field]: value,
  }));

  // console.log(selectedShapeDetails)

  // If the changed field is width or height, update the selected shape
  if (field === 'width' || field === 'height') {
     newShapes = shapes.map((shape, index) => {
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
const addFloor = () => {
  const newFloorName = `სართული ${floorNames.length + 1}`;
  const newFloor = { id: uuidv4(), name: newFloorName, shapes: [] };
  setFloors(prevFloors => [...prevFloors, newFloor]);
  setFloorNames(prevNames => [...prevNames, newFloorName]);
  setCurrentFloorIndex(floors.length); // Switch to the newly added floor
};

// Function to delete a floor
const deleteFloor = () => {
  if (floors.length > 1) {
    const newFloors = floors.filter((floor, index) => index !== currentFloorIndex);
    setFloors(newFloors);
    setFloorNames(prevNames => prevNames.filter((name, index) => index !== currentFloorIndex));
    setCurrentFloorIndex(Math.min(currentFloorIndex, newFloors.length - 1)); // Adjust current index
  } else {
    alert('ბოლო განყოფილებას ვერწაშლით');
  }
};
const handleSaveTable = (mode) => {
  const { tableNumber, maxPeopleAmount, minPeopleAmount, selectedTag, width, height, type, colorIndex, isForReservation, rotation, isFree } = selectedShapeDetails;
  const currentShape = shapes[selectedShapeIndex];
console.log(isFree)
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
        type,
        colorIndex,
        isForReservation,
        rotation,
        isFree
      };
    }
    return shape;
  });

  setFloors((prevFloors) => {
    const newFloors = [...prevFloors];
    newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
    // Save updated version of floors to local storage
    if(mode == 3){
      localStorage.setItem('restaurantFloors', JSON.stringify(newFloors));

    }
    return newFloors;
  });

  // Save updated version of floors to local storage
  // localStorage.setItem('restaurantFloors', JSON.stringify(floors));

  if (mode == 1) {
    // Mode 1 logic (if any)
  } else {
    setSelectedShapeIndex(null);
    setIsOpenRegistration(false);
  }

  console.log(floors);
};






const handleCancelTable = () => {
  setSelectedShapeIndex(null);
  setIsOpenRegistration(false)
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
  setIsOpenRegistration(false)
};


const FloorSelector = ({ floors, currentFloorIndex, onChange }) => (
  <select style={{borderWidth:'2px', borderRadius:'5px',width:'30%',height:'100%',backgroundColor:'#C6B0B4',color:'#8C1D2F'}} value={currentFloorIndex} onChange={(e) => onChange(parseInt(e.target.value))}>
    {floors.map((floor, index) => (
      <option  key={floor.id} value={index}>
        {floors[index].name}
      </option>
    ))}
  </select>
);


const renderTableNumbers = () => {
  return shapes.map((shape, index) => {
    const isSelected = index === selectedShapeIndex;
    const { x, y, type, tableNumber, width, height, rotation } = shape;
    let centerX ;
    let centerY ;
    const angle = (rotation * Math.PI) / 180;
// console.log(Math.cos(angle))
    if (tableNumber && shape.type != 'ladder' && shape/type != "door") {
      // Calculate the center position of the shape
        centerX = x ;
        centerY = y  ;
  

      // Calculate the angle of rotation in radians

      // Calculate the position of the table number relative to the center of the shape
      // Apply rotation transformation to the position
      const textX = centerX 
      const textY = centerY 

      return (
        <Text
          key={`tableNumber${index}`}
          x={textX}
          y={textY}
          text={tableNumber}
          fontSize={14}
          fill={isSelected ? 'white' : 'white'}
          draggable={false}
          onClick={() => handleTableNumberClick(index)}
        />
      );
    }

    return null;
  });
};



const handleTableNumberClick = (index) => {
  // console.log('Table number clicked:', index);
  // console.log('Selected shape details:', shapes[index]);
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
    type: shape.type || '',
    colorIndex: shape.colorIndex || 0,
    isForReservation: shape.isForReservation ,
    rotation: shape.rotation || 0,
    isFree: shape.isFree ,


  });
  
};
const saveToLocalStorage = () => {
  localStorage.setItem('restaurantFloors', JSON.stringify(floors));
};

// Call saveToLocalStorage with shapes as an argument



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
  (shape.type !== "ladder" && shape.type != "door") && // Exclude shapes with type "ladder"
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
  // console.log(floors)
  saveToLocalStorage();
setIsChangable(false)
setSelectedTableNumber(null)
  // Perform your final save logic here
};



useEffect(() => {
  // Load data from local storage on component mount
  loadFromLocalStorage();
}, []); // Empty dependency array ensures this effect runs only once on mount
useEffect(() => {

  if(selectedShapeIndex == null && !isOpenSideBar && !isChangable){
    setIsOpenSideBar(true)
    console.log(11)
  }
}, [selectedShapeIndex]);
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
      type: shape?.type || '',
      colorIndex: shape?.colorIndex || 0,
      isForReservation: shape?.isForReservation ,
      rotation: shape?.rotation || 0,
      isFree: shape?.isFree ,


    });
    
  }
}, [selectedShapeIndex, shapes]);




const [imageArrayFirstFree, setImageArrayFirstFree] = useState([]);
const [imageArrayFirstTaken, setImageArrayFirstTaken] = useState([]);
const [imageArrayFirstGreyFree, setImageArrayFirstGreyFree] = useState([]);
const [imageArrayFirstGreyTaken, setImageArrayFirstGreyTaken] = useState([]);


const [imageArraySecondFree, setImageArraySecondFree] = useState([]);
const [imageArraySecondTaken, setImageArraySecondTaken] = useState([]);
const [imageArraySecondGreyFree, setImageArraySecondGreyFree] = useState([]);
const [imageArraySecondGreyTaken, setImageArraySecondGreyTaken] = useState([]);


const [imageArrayThirdFree, setImageArrayThirdFree] = useState([]);
const [imageArrayThirdTaken, setImageArrayThirdTaken] = useState([]);
const [imageArrayThirdGreyFree, setImageArrayThirdGreyFree] = useState([]);
const [imageArrayThirdGreyTaken, setImageArrayThirdGreyTaken] = useState([]);





 
const imagePathsFree = [
    "../../../public/first/მაგიდა2,1.0.png",
    "../../../public/first/მაგიდა2.4გრინ.png",
    "../../../public/first/მაგიდა2.1გრინ.png",
    "../../../public/first/მაგიდა2.3გრინ.png",
    "../../../public/first/მაგიდა2.2გრინ.png",
    "../../../public/first/მაგიდა2.5გრინ.png",
    "../../../public/first/მაგიდა2.6გრინ.png",
  ];
  const imagePathsTaken = [
    "../../../public/first/zxxczxc.png",
    "../../../public/first/მაგიდა2.4რედ.png",
    "../../../public/first/მაგიდა2.1რედ.png",
    "../../../public/first/მაგიდა2.3რედ.png",
    "../../../public/first/მაგიდა2.2რედ.png",
    "../../../public/first/მაგიდა2.5რედ.png",
    "../../../public/first/მაგიდა2.6რედ.png",
  ];
const imagePaths1Free = [
  "../../../public/second/σψδσψδψ.png",
  "../../../public/second/მაგიდა4.6გრინ.png",
  "../../../public/second/მაგიდა4.1გრინ.png",
  "../../../public/second/მაგიდა4.2გრინ.png",
  "../../../public/second/მაგიდა4.5გრინ.png",
  "../../../public/second/მაგიდა4.3გრინ.png",
  "../../../public/second/მაგიდა4.4გრინ.png",
  ];


  const imagePaths1Taken = [
    "../../../public/second/δδψσδψδσψ.png",
    "../../../public/second/მაგიდა4,6რედ.png",
    "../../../public/second/მაგიდა4.1რედ.png",
    "../../../public/second/მაგიდა4.2რედ.png",
    "../../../public/second/მაგიდა4.5რედ.png",
    "../../../public/second/მაგიდა4.3რედ.png",
    "../../../public/second/მაგიდა4.4რედ.png",
    ];
const imagePaths2Free = [
  "../../../public/third/xfggx.png",
  "../../../public/third/მაგიდა6.2გრინ.png",
  "../../../public/third/მაგიდა6.5გრინ.png",
  "../../../public/third/მაგიდა6.4გრინ.png",
  "../../../public/third/მაგიდა6.6რინ.png",
  "../../../public/third/მაგიდა6.1გრინ.png",
  "../../../public/third/მაგიდა6.3გრინ.png",
  ];

  
  const imagePaths2Taken = [
    "../../../public/third/მაგიდა6.1grey.png",
    "../../../public/third/მაგიდა6.2რედ.png",
    "../../../public/third/მაგიდა6.5რედ.png",
    "../../../public/third/მაგიდა6.4რედ.png",
    "../../../public/third/მაგიდა6.6რედ.png",
    "../../../public/third/მაგიდა6.1რედ.png",
    "../../../public/third/მაგიდა6.3რედ.png",
    ];
    
const imagePathsGreyFree = [
    "../../../public/first/მაგიდა2,1gj.png",
    "../../../public/first/მაგიდა2.4.2.png",
    "../../../public/first/მაგიდა2.1.2.png",
    "../../../public/first/მაგიდა2.3.2.png",
    "../../../public/first/მაგიდა2.2.2.png",
    "../../../public/first/მაგიდა2.5.2.png",
    "../../../public/first/მაგიდა2.6.2.png",
    ];


    const imagePathsGreyTaken = [
        "../../../public/first/ασδσαδσδασδ.png",
        "../../../public/first/მაგიდა2.4.1.png",
        "../../../public/first/მაგიდა2.1.1.png",
        "../../../public/first/მაგიდა2.3.1.png",
        "../../../public/first/მაგიდა2.2.1.png",
        "../../../public/first/მაგიდა2.5.1.png",
        "../../../public/first/მაგიდა2.6.1.png",
        ];




const imagePaths1GreyFree = [
  "../../../public/second/ψδδψ.png",
  "../../../public/second/მაგიდა4.6.2.png",
  "../../../public/second/მაგიდა4.1.1.png",
  "../../../public/second/მაგიდა4.2.2.png",
  "../../../public/second/მაგიდა4.5.2.png",
  "../../../public/second/მაგიდა4.3.1.png",
  "../../../public/second/მაგიდა4.4.1.png",
  ];

  const imagePaths1GreyTaken= [
    "../../../public/second/სვსდვ.png",
    "../../../public/second/მაგიდა4.6.1.png",
    "../../../public/second/მაგიდა4.1.2.png",
    "../../../public/second/მაგიდა4.2.1.png",
    "../../../public/second/მაგიდა4.5.1.png",
    "../../../public/second/მაგიდა4.3.2.png",
    "../../../public/second/მაგიდა4.4.2.png",
    ];

const imagePaths2GrayFree = [
  "../../../public/third/nhbvmh.png",
  "../../../public/third/მაგიდა6.2.2.png",
  "../../../public/third/მაგიდა6.5.1.png",
  "../../../public/third/მაგიდა6.6.1.png",
  "../../../public/third/მაგიდა6.4.1.png",
  "../../../public/third/მაგიდა6.1.1.png",
  "../../../public/third/მაგიდა6.3.2.png",
  ];


  const imagePaths2GrayTaken = [
    "../../../public/third/მაგიდა6.1.sadasdpng.png",
    "../../../public/third/მაგიდა6.2.1.png",
    "../../../public/third/მაგიდა6.5.2.png",
    "../../../public/third/მაგიდა6.6.2.png",
    "../../../public/third/მაგიდა6.4.2.png",
    "../../../public/third/მაგიდა6.1.2.png",
    "../../../public/third/მაგიდა6.3.1.png",
    ];











useEffect(()=>{


const loadImageArrayFree = () => {
    const tempImageArray = [];
    imagePathsFree.forEach(path => {
        const image = new Image();
        image.src = path;
        tempImageArray.push(image);
    });
    setImageArrayFirstFree(tempImageArray);
  };

  const loadImageArrayTaken = () => {
    const tempImageArray = [];
    imagePathsTaken.forEach(path => {
        const image = new Image();
        image.src = path;
        tempImageArray.push(image);
    });
    setImageArrayFirstTaken(tempImageArray);
  };
  


const loadImageArray1Free = () => {
  const tempImageArray = [];
  imagePaths1Free.forEach(path => {
      const image = new Image();
      image.src = path;
      tempImageArray.push(image);
  });
  setImageArraySecondFree(tempImageArray);
  };

  const loadImageArray1Taken = () => {
    const tempImageArray = [];
    imagePaths1Taken.forEach(path => {
        const image = new Image();
        image.src = path;
        tempImageArray.push(image);
    });
    setImageArraySecondTaken(tempImageArray);
    };



const loadImageArray2Free = () => {
  const tempImageArray = [];
  imagePaths2Free.forEach(path => {
      const image = new Image();
      image.src = path;
      tempImageArray.push(image);
  });
  setImageArrayThirdFree(tempImageArray);
  };


  const loadImageArray2Taken = () => {
    const tempImageArray = [];
    imagePaths2Taken.forEach(path => {
        const image = new Image();
        image.src = path;
        tempImageArray.push(image);
    });
    setImageArrayThirdTaken(tempImageArray);
    };




const loadImageArrayGreyFree = () => {
    const tempImageArray = [];
    imagePathsGreyFree.forEach(path => {
        const image = new Image();
        image.src = path;
        tempImageArray.push(image);
    });
    setImageArrayFirstGreyFree(tempImageArray);
    };

    const loadImageArrayGreyTaken = () => {
        const tempImageArray = [];
        imagePathsGreyTaken.forEach(path => {
            const image = new Image();
            image.src = path;
            tempImageArray.push(image);
        });
        setImageArrayFirstGreyTaken(tempImageArray);
        };



const loadImageArrayGrey1Free = () => {
  const tempImageArray = [];
  imagePaths1GreyFree.forEach(path => {
      const image = new Image();
      image.src = path;
      tempImageArray.push(image);
  });
  setImageArraySecondGreyFree(tempImageArray);
  };

  const loadImageArrayGrey1Taken = () => {
    const tempImageArray = [];
    imagePaths1GreyTaken.forEach(path => {
        const image = new Image();
        image.src = path;
        tempImageArray.push(image);
    });
    setImageArraySecondGreyTaken(tempImageArray);
    };



const loadImageArrayGrey2Free = () => {
  const tempImageArray = [];
  imagePaths2GrayFree.forEach(path => {
      const image = new Image();
      image.src = path;
      tempImageArray.push(image);
  });
  setImageArrayThirdGreyFree(tempImageArray);
  };

  
  const loadImageArrayGrey2Taken = () => {
    const tempImageArray = [];
    imagePaths2GrayTaken.forEach(path => {
        const image = new Image();
        image.src = path;
        tempImageArray.push(image);
    });
    setImageArrayThirdGreyTaken(tempImageArray);
    };
    



loadImageArrayFree()
loadImageArrayTaken()
loadImageArrayGreyFree()
loadImageArrayGreyTaken()
loadImageArray1Free()
loadImageArray1Taken()
loadImageArrayGrey1Free()
loadImageArrayGrey1Taken()
loadImageArray2Free()
loadImageArray2Taken()
loadImageArrayGrey2Free()
loadImageArrayGrey2Taken()
},[])





// const backgroundImage = new Image();
// const backgroundImage1 = new Image();
// const backgroundImage2 = new Image();
const backgroundImage3 = new Image();
const backgroundImage4 = new Image();

backgroundImage3.src = '../../../public/stairs1.png';
backgroundImage4.src = '../../../public/door.png';

const yourBackgroundImage = new Image();

yourBackgroundImage.src = '../../../public/flooraxali.png';

// backgroundImage.src = '../../../public/light33.png';
// backgroundImage1.src = '../../../public/light21.png';
// backgroundImage2.src = '../../../public/Rectangle70.png';


const options = ["ჩვეულებრივი მაგიდა","დარბაზის მაგიდა","მაგიდა კუპეში",'მაგიდა ღიაცისქვეშ','მაგიდა ტერასაზე','ფაცხა',"დამატებითი ოფცია"];


const [isOpenRegistration, setIsOpenRegistration] = useState(false);



const handleOptionChange1 = (selectedValue) => {
  const currentShape = shapes[selectedShapeIndex];
  let newColorIndex = -1;

  switch (selectedValue) {
    case 'ჩვეულებრივი მაგიდა':
      newColorIndex = 0;
      break;
    case 'დარბაზის მაგიდა':
      newColorIndex = 1;
      break;
    case 'მაგიდა კუპეში':
      newColorIndex = 2;
      break;
    case 'მაგიდა ღიაცისქვეშ':
      newColorIndex = 3;
      break;
    case 'მაგიდა ტერასაზე':
      newColorIndex = 4;
      break;
    case 'ფაცხა':
      newColorIndex = 5;
      break;
    case 'დამატებითი ოფცია':
      newColorIndex = 6;
      break;
    default:
      return;
  }
  setSelectedShapeDetails((prevDetails) => ({
    ...prevDetails,
    colorIndex: newColorIndex,
  }));

  // const newShapes = shapes.map((shape, index) => {
  //   if (index === selectedShapeIndex) {
  //     return {
  //       ...shape,
  //       colorIndex: newColorIndex
  //     };
  //   }
  //   return shape;
  // });

  // setFloors((prevFloors) => {
  //   const newFloors = [...prevFloors];
  //   newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
  //   return newFloors;
  // });
};


// console.log(floors[currentFloorIndex].name)
// console.log(selectHeight)
// console.log(stateRecipe.requests)
console.log(selectedShapeIndex)


// Function to duplicate data when user clicks on "შეცვლა" button
const handleEditButtonClick = () => {
  // Store the original data in the originalData state
  setOriginalData({ floors, currentFloorIndex });
  // Duplicate the original data to the changedData state
  setChangedData({ floors: [...floors], currentFloorIndex });
  console.log(changedData)

  // Enable editing mode
  setIsChangable(true);
  setIsOpenSideBar(false);
};

// Function to switch back to original data when user clicks on "გამოსვლა" button
const handleCancelButtonClick = () => {
  // Restore original data
  setFloors(originalData.floors);
  setCurrentFloorIndex(originalData.currentFloorIndex);
  // Disable editing mode
  setIsChangable(false);
  setIsOpenSideBar(true);
};

// Function to save changes when user clicks on "შენახვა" button
const handleSaveButtonClick = () => {
  // Save changes made to the changedData state
  // console.log(changedData)
  // setFloors(changedData.floors);
  // setCurrentFloorIndex(changedData.currentFloorIndex);
  handleFinalSave();
  // Disable editing mode
  setIsChangable(false);
  setIsOpenSideBar(true);
};

useEffect(()=>{
console.log(floors)

},floors)

const [isQuestion,setIsQuestion] = useState(false)
    return (
      <div className={`homePage-container ${isOpenSideBar ? 'sidebar-open' : 'sidebar-closed'}`}>
      <img style={{zIndex:'2000'}} className='home-paige-logo' src="../../../public/img/Group4.png" alt="" />
          <nav className='side-NavBar'>
          <ion-icon
  style={{
      color: 'white',
      fontSize: isOpenSideBar ? '150%' : '150%',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out',
      position: isOpenSideBar ? 'absolute' : 'fixed',
      top: isOpenSideBar ? '-5%' : '3%',
      right: isOpenSideBar ? '0' : 'auto',
      display: isOpenSideBar ? 'initial' : 'flex',
      justifyContent: 'center',
      alignItems: 'center'
  }}
  name={isOpenSideBar ? "close-outline" : "list-outline"}
  onClick={() => setIsOpenSideBar(!isOpenSideBar)}
></ion-icon>
<ul> 
            <div className='restaurant-image-name'>
                <div>
                <img className='restaurant-image' src="../../../public/custom-restaurant-tables-david-stine+4.jpg" alt="" />

                </div>
                <div>
                    {
                        isOpenSideBar &&  <span  className='restaurant-name'>მაჭახელა</span >

                    }
                </div>
            </div>
            <NavLink
            key={1}
            className='book3'
            to="/homePage/tables"
            style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#58121D",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#ffffff',
                    fontWeight: '700'
                } : null
            }}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => console.log(5)}
        >
            
            <img
                className='homePage-images'
                src={
                    hoveredIndex === 1 || location.pathname === "/homePage/tables"
                        ? "../../../public/homePage/მაგიდებით.png"
                        : "../../../public/homePage/მაგიდებით.png"
                }
                alt=""
            />
            {isOpenSideBar ? 'მაგიდების მენეჯმენტი' : null}
        </NavLink>

            <NavLink
                    key={2}
                    className='book3'
                    to="/homePage/menu"
                    style={({ isActive }) => {
                        return isActive ? {
                            backgroundColor: "#58121D",
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            color: '#ffffff',
                            fontWeight: '700'
                        } : null
                    }}
                      onMouseEnter={() => handleMouseEnter(2)}
                      onMouseLeave={handleMouseLeave}
                    onClick={() => console.log(5)}
                >
                          <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 2 || location.pathname === "/homePage/menu"
                        ? "../../../public/homePage/მენიუთ.png"
                        : "../../../public/homePage/მენიუთ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'მენიუ' : null}

                    
                </NavLink>
            <NavLink
                    key={3}
                    className='book3'
                    to="/homePage/stuff"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#58121D",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#ffffff',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(3)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                            <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 3 || location.pathname === "/homePage/stuff"
                        ? "../../../public/homePage/სტაფით.png"
                        : "../../../public/homePage/სტაფით.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'სტაფის მენეჯმენტი' : null}

                    
                </NavLink>


            <NavLink
                    key={4}
                    className='book3'
                    to="/homePage/statistics"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#58121D",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#ffffff',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(4)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 4 || location.pathname === "/homePage/statistics"
                        ? "../../../public/homePage/სტატისტიკათ.png"
                        : "../../../public/homePage/სტატისტიკათ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'სტატისტიკა' : null}

                    
                </NavLink>


            <NavLink
                    key={5}
                    className='book3'
                    to="/homePage/offers"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#58121D",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#ffffff',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(5)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 5 || location.pathname === "/homePage/offers"
                        ? "../../../public/homePage/აქციებით.png"
                        : "../../../public/homePage/აქციებით.png"
                }
                alt="" 
            />
                        {isOpenSideBar ? 'აქციები' : null}

                    
                </NavLink>


            <NavLink
                    key={6}
                    className='book3'
                    to="/homePage/discounts"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#58121D",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#ffffff',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(6)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 6 || location.pathname === "/homePage/discounts"
                        ? "../../../public/homePage/სეილთ.png"
                        : "../../../public/homePage/სეილთ.png"
                }
                alt="" 
            />
                        {isOpenSideBar ? 'ფასდაკლებები' : null}

                    
                </NavLink>


            <NavLink
                    key={7}
                    className='book3'
                    to="/homePage/distribution"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#58121D",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#ffffff',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(7)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 7 || location.pathname === "/homePage/distribution"
                        ? "../../../public/homePage/დისტრთ.png"
                        : "../../../public/homePage/დისტრთ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'დისტრიბუცია' : null}

                    
                </NavLink>


            <NavLink
                    key={8}
                    className='book3'
                    to="/homePage/myProfile"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#58121D",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#ffffff',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(8)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 8 || location.pathname === "/homePage/myProfile"
                        ? "../../../public/homePage/accountt.png"
                        : "../../../public/homePage/accountt.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'ჩემი ანგარიში' : null}

                    
                </NavLink>


            <NavLink
                    key={9}
                    className='book3'
                    to="/homePage/help"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#58121D",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#ffffff',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(9)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 9 || location.pathname === "/homePage/help"
                        ? "../../../public/homePage/დახმარებათ.png"
                        : "../../../public/homePage/დახმარებათ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'დახმარება' : null}

                    
                </NavLink>


            <NavLink
                    key={10}
                    className='book3'
                    to="/homePage/settings"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#58121D",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#ffffff',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(10)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 10 || location.pathname === "/homePage/settings"
                        ? "../../../public/homePage/სეთინგსთ.png"
                        : "../../../public/homePage/სეთინგსთ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'პარამეტრები' : null}

                    
                </NavLink>


            </ul>
            <div className='log-out-div'>
                <img className='logout-image' src="../../../public/homePage/გასვლათეთრი.png" alt="" />
                {isOpenSideBar && <span>გამოსვლა</span>}
            </div>
        </nav>
        <div style={{position:'relative'}} className='content-container'>

          <div style={(isOpenSideBar || isChangable)  ? {display:'none'} : null} className='reservations-bar'>
                  {
                    !selectedTableNumber && 
                    <>
                      <ion-icon onClick={()=>{setIsOpenSideBar(!isOpenSideBar);setSelectedTableNumber(null)}}  size='medium' name="close"></ion-icon>
                      
<div className='reservation-types'>
                    
                    <div 
                      style={activeOption == 0 ? {color:'white'} : {color:"#C6B0B4"}} 
                      onClick={() => handleOptionClick(0)}
                    >
                      აქტიური
                    </div>
                    <div
                      style={activeOption == 1 ? {color:'white'} : {color:"#C6B0B4"}}             
                      onClick={() => handleOptionClick(1)}
                    >
                      სამომავლო
                    </div>
                    <div 
                      style={activeOption == 2 ? {color:'white'} : {color:"#C6B0B4"}}            
                      onClick={() => handleOptionClick(2)}
                    >
                      მოთხოვნები
                    </div>
                  </div>
                  <div className='reservations-list'>
                  {stateRecipe.requests
      .filter(request => (activeOption == 0 ? request.status : !request.status)) // Filter out items with status false
      .map((request, index) => (
        <BookCard
          key={index}
          name={request.name}
          person={request.person}
          aditional={request.aditional}
          data={formattedDate}
          img={request.img}
          id={request.id}
          status={request.status}
          position={request.position}
          tableNumber={request.tableNumber}
          tableTags={request.tableTags}
        />
      ))}
                  </div>
                    </>
                  }
                  {
                    (selectedTableNumber && selectedShapeIndex!=null) && 
                    <>
                     <div className='table-number-bar'>
                    მაგიდის ნომერი - 
                    <span>{selectedTableNumber}</span>
                  </div>

                    <ion-icon onClick={()=>{setIsOpenSideBar(!isOpenSideBar);setSelectedTableNumber(null)}}  size='medium' name="close"></ion-icon>
                    <button onClick={()=>{
                      setIsQuestion(true)
                      setIsOpenRegistration(true)
                      const newIsFree = !shapes[selectedShapeIndex].isFree;
                      handleTableDetailsChange('isFree', newIsFree);
                      }}>
                        {
                          shapes[selectedShapeIndex].isFree ? 
                          "ანგარიშის გახსნა" :
                          "ანგარიშის დახურვა"
                        }
                      </button>
                    <div className='reservation-types'>
                    
                    <div 
                      style={activeOption == 0 ? {color:'white'} : {color:"#C6B0B4"}} 
                      onClick={() => handleOptionClick(0)}
                    >
                      მაგიდის ჯავშნები
                    </div>
                    
                  </div>
                  <div className='reservations-list'>
                  {stateRecipe.requests
      .filter(request => (
        // (activeOption === 0 ? request.status : !request.status) &&
        request.tableNumber == selectedTableNumber
    ))
    .map((request, index) => (
        <BookCard
            key={index}
            name={request.name}
            person={request.person}
            aditional={request.aditional}
            data={formattedDate}
            img={request.img}
            id={request.id}
            status={request.status}
            position={request.position}
            tableNumber={request.tableNumber}
            tableTags={request.tableTags}
        />
    ))}
    
                  </div>
                 
                    </>
                  }
                  
          </div>
          {
            isChangable ?
            <div className='table-managment-isedit'>
                  <div className='shapesVariartions-managment' >
        <img style={{width:'60%'}} className='rectangle1' onClick={() => addShape('rectangle')} src="../../../public/first/მაგიდა2,0.png" alt="" />
        <img style={{width:'60%'}} className='circle1' onClick={() => addShape('circle')} src="../../../public/second/მაგიდა4.0.png" alt="" />
        <img style={{width:'60%'}} className='square1' onClick={() => addShape('square')} src="../../../public/third/მაგიდა6.0.png" alt="" />

        <img style={{width:'60%'}} className='square1' onClick={() => addShape('ladder')} src="../../../public/stairs1.png" alt="" />
        <img style={{width:'60%'}} className='square1' onClick={() => addShape('door')} src="../../../public/door.png" alt="" />

      </div>

      <div style={{  display: 'flex',width:'60%',alignItems:'center',height:'40%' }}>

        <button onClick={addFloor} className='addFloor-managment'>სართულის დამატება</button>
        <button onClick={deleteFloor} className='deleteFloor-managment'>სართულის წაშლა</button>
        {floors.map((floor, index) => (
  <div key={floor.id}>
    {currentFloorIndex === index && (
      <input
      className='floor-name'
        type="text"
        value={floors[currentFloorIndex].name}
        onChange={e => handleFloorNameChange(index, e.target.value)}
        placeholder='სართულის სახელი'
      
      />
    )}
  </div>
))}

          <FloorSelector floors={floors} currentFloorIndex={currentFloorIndex} onChange={setCurrentFloorIndex} />
        {/* <button className='final-save' onClick={handleFinalSave}>Final Save</button> */}
        {/* <button onClick={()=>{ setIsChangable(!isChangable);setSelectedTableNumber(null)}} className='managment-save'>გამოსვლა</button> */}

        <button onClick={handleFinalSave} className='managment-save'>დასრულება</button>


      </div>
            </div> :



<div style={!isOpenSideBar? {width:'70%',justifyContent:'space-evenly' } : null}  className='table-managment-top-buttons'>
            {
              isOpenSideBar &&             <button onClick={()=>{ setIsOpenSideBar(!isOpenSideBar);setSelectedTableNumber(null)}}>ჯავშნები</button>

            }
            <FloorSelector floors={floors} currentFloorIndex={currentFloorIndex} onChange={setCurrentFloorIndex} />
            <button onClick={()=>{ setIsChangable(!isChangable);setIsOpenSideBar(false)}} >
             შეცვლა
              
              </button>
          </div>
          }
          
     
        <Stage style={{ position: "absolute", right: '5%', top:"8%", }}   width={extractWidth(selectWidth)*3.4} height={extractWidth(selectHeight)*4.4} onClick={handleStageClick} onTouchEnd={handleStageClick}>
        <Layer>
          {/* {renderGrid()} */}
      <Rect
      key={-344}
        x={30}
        y={30}
        width={extractWidth(selectWidth)*3.1} // Width of the stage
        height={extractWidth(selectHeight)*4} // Height of the stage
        fillPatternImage={yourBackgroundImage} // Your background image
        fillPatternScaleX={extractWidth(selectWidth)/900} // Scale the image to fit the stage width
        fillPatternScaleY={extractWidth(selectHeight)/500} // Scale the image to fit the stage height
        fillPatternRepeat="no-repeat" // Prevent the image from repeating
      />


          {shapes.map((shape, index) => {
            const isSelected = index === selectedShapeIndex;
            return (
              <React.Fragment key={index}>
                {shape.type === 'rectangle' && (
                 <TransformableRectangle
                 isEdit={isChangable}
                 shapeProps={shape}
                 isSelected={isSelected}
                 onSelect={() => handleShapeClick(index)}
                 onChange={(newProps) => handleShapeDragEnd(index, newProps)}
                 fillPatternImage={shape.isForReservation ? shape.isFree ? imageArrayFirstFree[shape.colorIndex] : imageArrayFirstTaken[shape.colorIndex]  : shape.isFree ? imageArrayFirstGreyFree[shape.colorIndex] : imageArrayFirstGreyTaken[shape.colorIndex]}
                 fillPatternScaleX={shape.width/2800} // Adjust as needed
                 fillPatternScaleY={shape.height/2200}
                 fillPatternRepeat="no-repeat" // Prevent the image from repeating 
               />
                )}

                {shape.type === 'circle' && (
                  
                  <TransformableCircle
                  isEdit={isChangable}
                 shapeProps={shape}
                 isSelected={isSelected}
                 onSelect={() => handleShapeClick(index)}
                 onChange={(newProps) => handleShapeDragEnd(index, newProps)}
                 fillPatternImage={shape.isForReservation ? shape.isFree ? imageArraySecondFree[shape.colorIndex] : imageArraySecondTaken[shape.colorIndex]  : shape.isFree ? imageArraySecondGreyFree[shape.colorIndex] : imageArraySecondGreyTaken[shape.colorIndex]}
                 fillPatternScaleX={shape.width/3200} // Adjust as needed
                 fillPatternScaleY={shape.height/2200}
                 fillPatternRepeat="no-repeat" // Prevent the image from repeating 
                 extractWidth={extractWidth}
                 selectWidth={selectWidth}
                 selectHeight={selectHeight}

               />
                )}

                {shape.type === 'square' && (
                   <TransformableThird
                   isEdit={isChangable}
                   shapeProps={shape}
                   isSelected={isSelected}
                   onSelect={() => handleShapeClick(index)}
                   onChange={(newProps) => handleShapeDragEnd(index, newProps)}
                   fillPatternImage={shape.isForReservation ? shape.isFree ? imageArrayThirdFree[shape.colorIndex] : imageArrayThirdTaken[shape.colorIndex]  : shape.isFree ? imageArrayThirdGreyFree[shape.colorIndex] : imageArrayThirdGreyTaken[shape.colorIndex]}
                   fillPatternScaleX={shape.width/3800} // Adjust as needed
                   fillPatternScaleY={shape.height/2400}
                   fillPatternRepeat="no-repeat" // Prevent the image from repeating 
                 />
                )}


              {shape.type === 'ladder' && (
                  <TransformableLedder
                  isEdit={isChangable}
                  shapeProps={shape}
                  isSelected={isSelected}
                  onSelect={() => handleShapeClick(index)}
                  onChange={(newProps) => handleShapeDragEnd(index, newProps)}
                  stroke={!draggingStates[index] ? null : 'black'} // Use individual dragging state
                  strokeWidth={0.5} // Set the stroke width to 2px, adjust as needed
                  fillPatternImage={backgroundImage3}
                  fillPatternScaleX={shape.width/200} // Adjust as needed
                  fillPatternScaleY={shape.height/180}
                  fillPatternRepeat="no-repeat" // Prevent the image from repeating 
                />
                )}

{shape.type === 'door' && (
                  <TransformableDoor
                  isEdit={isChangable}
                  shapeProps={shape}
                  isSelected={isSelected}
                  onSelect={() => handleShapeClick(index)}
                  onChange={(newProps) => handleShapeDragEnd(index, newProps)}
                  stroke={!draggingStates[index] ? null : 'black'} // Use individual dragging state
                  strokeWidth={0.5} // Set the stroke width to 2px, adjust as needed
                  fillPatternImage={backgroundImage4}
                  fillPatternScaleX={shape.width/150} // Adjust as needed
                  fillPatternScaleY={shape.height/140}
                  fillPatternRepeat="no-repeat" // Prevent the image from repeating 
                />
                )}

                {isSelected  && (
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


      <TableMenegmentModal 
        handleFinalSave={handleFinalSave}
        setSelectedTableNumber={setSelectedTableNumber} 
        setIsOpenRegistration={setIsOpenRegistration}  
        isQuestion={isQuestion}  
        setIsQuestion={setIsQuestion}    
        isEdit={!isChangable} 
        handleOptionChange1={handleOptionChange1} 
        options={options} 
        handleCancelTable={handleCancelTable} 
        handleDeleteTable={handleDeleteTable} 
        handleSaveTable={handleSaveTable} 
        shapes={shapes} 
        selectedShapeIndex={selectedShapeIndex} 
        selectWidth={selectWidthPortal} 
        handleTableDetailsChange={handleTableDetailsChange} 
        selectedShapeDetails={selectedShapeDetails}  
        open={isOpenRegistration} 
        onClose={() => {setIsOpenRegistration(false);setIsQuestion(false)}}/>


     

        </div>
    </div>
    )
}