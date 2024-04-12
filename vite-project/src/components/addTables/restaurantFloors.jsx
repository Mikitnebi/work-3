import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Transformer, Line, Text } from 'react-konva';
import Select from 'react-select';
import './jjj.css';
import { v4 as uuidv4 } from 'uuid';
import SelectInput from '../selecter';
import TransformableRectangle from './TransformerRect';
import TransformableCircle from './TransformerCircle';
import TransformableThird from './TransformerThird';
import TransformableLedder from './TransformerLedder';
import TransformableDoor from './TransformerDoor';

const tagOptions = [
  { value: '#ფანჯარასთან ახლოს', label: '#ფანჯარასთან ახლოს' },
  { value: '#მყუდრო', label: '#მყუდრო' },
  { value: '#რომანტიული', label: '#რომანტიული' },
  { value: '#ღიაცისქვეშ', label: '#ღიაცისქვეშ' },
];

const RestaurantFloor = ({ prevStep, nextStep,setStep }) => {
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

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth; // Get the screen width
      const screenHeight = window.innerHeight; // Get the screen width

      setSelectWidth(`${screenWidth*20.7/100}px`); // Set the width of the Select component
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
            isFree: shapes[shapeIndex].isFree || true,

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
          x: extractWidth(selectWidth)/2,
          y: extractWidth(selectHeight),
          width: extractWidth(selectWidth)/3,
          height: extractWidth(selectHeight)/1.5,
          colorIndex:0,
          isForReservation:true,
          rotation: 0,
          isFree:true,

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
          isFree:true,

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
          isFree:true,

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
      isFree:true,

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
    
  };

  const handleTableDetailsChange = (field, value) => {

    let newShapes;


    setSelectedShapeDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  
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
  const handleSaveTable = () => {
    const { tableNumber, maxPeopleAmount, minPeopleAmount, selectedTag, width, height,type,colorIndex,isForReservation,rotation,isFree } = selectedShapeDetails;
  console.log(isForReservation)
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


  const FloorSelector = ({ floors, currentFloorIndex, onChange }) => (
    <select style={{borderWidth:'2px', borderRadius:'20px',width:'100%',backgroundColor:'#C6B0B4',color:'#8C1D2F'}} value={currentFloorIndex} onChange={(e) => onChange(parseInt(e.target.value))}>
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
        type: shape?.type || '',
        colorIndex: shape.colorIndex || 0,
        isForReservation: shape.isForReservation ,
        rotation: shape.rotation || 0,
        isFree: shape.isFree ,


      });
      
    }
  }, [selectedShapeIndex, shapes]);


  const [imageArrayFirst, setImageArrayFirst] = useState([]);
  const [imageArraySecond, setImageArraySecond] = useState([]);
  const [imageArrayThird, setImageArrayThird] = useState([]);

  const [imageArrayFirstGrey, setImageArrayFirstGrey] = useState([]);
  const [imageArraySecondGrey, setImageArraySecondGrey] = useState([]);
  const [imageArrayThirdGrey, setImageArrayThirdGrey] = useState([]);

  const imagePaths = [
    "../../../public/first/მაგიდა2,0.png",
    "../../../public/first/2.4.png",
    "../../../public/first/მაგიდა2,1.png",
    "../../../public/first/მაგიდა2.3.png",
    "../../../public/first/მაგიდა2,2.png",
    "../../../public/first/მაგიდა2.5.png",
    "../../../public/first/მაგიდა2.6.png",
];

const imagePaths1 = [
  "../../../public/second/მაგიდა4.0.png",
  "../../../public/second/მაგიდა4.6.png",
  "../../../public/second/მაგიდა4.1.png",
  "../../../public/second/მაგიდა4.2.png",
  "../../../public/second/მაგიდა4.5.png",
  "../../../public/second/მაგიდა4.3.png",
  "../../../public/second/მაგიდა4.4.png",
];

const imagePaths2 = [
  "../../../public/third/მაგიდა6.0.png",
  "../../../public/third/მაგიდა6.2.png",
  "../../../public/third/მაგიდა6.5.png",
  "../../../public/third/მაგიდა6.4.png",
  "../../../public/third/მაგიდა6.6.png",
  "../../../public/third/მაგიდა6.1.png",
  "../../../public/third/მაგიდა6.3.png",
];



const imagePathsGrey = [
  "../../../public/first/მაგიდა2.0.0.png",
  "../../../public/first/მაგიდა2.4.0.png",
  "../../../public/first/მაგიდა2.1.0.png",
  "../../../public/first/მაგიდა2.3.0.png",
  "../../../public/first/მაგიდა2.2.0.png",
  "../../../public/first/მაგიდა2,5.0png.png",
  "../../../public/first/მაგიდა2.6.0.png",
];


const imagePaths1Grey = [
  "../../../public/second/მაგიდა4.0.0.png",
  "../../../public/second/მაგიდა4.6.0.png",
  "../../../public/second/მაგიდა4.1.0.png",
  "../../../public/second/მაგიდა4.2.0.png",
  "../../../public/second/მაგიდა4.5.0.png",
  "../../../public/second/მაგიდა4.3.0.png",
  "../../../public/second/მაგიდ4.4.0.png",
];

const imagePaths2Gray = [
  "../../../public/third/მაგიდა6.0.0.png",
  "../../../public/third/მაგიდა6.2.0.png",
  "../../../public/third/მაგი.5.0.png",
  "../../../public/third/მაგიდა6.6.0.png",
  "../../../public/third/მაგიდა6.4.0.png",
  "../../../public/third/მაგიდა6.1.0.png",
  "../../../public/third/მაგიდა6.3.0.png",
];




useEffect(()=>{
  const loadImageArray = () => {
    const tempImageArray = [];
    imagePaths.forEach(path => {
        const image = new Image();
        image.src = path;
        tempImageArray.push(image);
    });
    setImageArrayFirst(tempImageArray);
};


const loadImageArray1 = () => {
  const tempImageArray = [];
  imagePaths1.forEach(path => {
      const image = new Image();
      image.src = path;
      tempImageArray.push(image);
  });
  setImageArraySecond(tempImageArray);
};
const loadImageArray2 = () => {
  const tempImageArray = [];
  imagePaths2.forEach(path => {
      const image = new Image();
      image.src = path;
      tempImageArray.push(image);
  });
  setImageArrayThird(tempImageArray);
};


const loadImageArrayGrey = () => {
  const tempImageArray = [];
  imagePathsGrey.forEach(path => {
      const image = new Image();
      image.src = path;
      tempImageArray.push(image);
  });
  setImageArrayFirstGrey(tempImageArray);
};

const loadImageArrayGrey1 = () => {
  const tempImageArray = [];
  imagePaths1Grey.forEach(path => {
      const image = new Image();
      image.src = path;
      tempImageArray.push(image);
  });
  setImageArraySecondGrey(tempImageArray);
};

const loadImageArrayGrey2 = () => {
  const tempImageArray = [];
  imagePaths2Gray.forEach(path => {
      const image = new Image();
      image.src = path;
      tempImageArray.push(image);
  });
  setImageArrayThirdGrey(tempImageArray);
};



loadImageArray();
loadImageArray1()
loadImageArray2()
loadImageArrayGrey()
loadImageArrayGrey1()
loadImageArrayGrey2()

},[])




  
  const backgroundImage = new Image();
  const backgroundImage1 = new Image();
  const backgroundImage2 = new Image();
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
  
    const newShapes = shapes.map((shape, index) => {
      if (index === selectedShapeIndex) {
        return {
          ...shape,
          colorIndex: newColorIndex
        };
      }
      return shape;
    });
  
    setFloors((prevFloors) => {
      const newFloors = [...prevFloors];
      newFloors[currentFloorIndex] = { ...currentFloor, shapes: newShapes };
      return newFloors;
    });
  };
 

// console.log(floors[currentFloorIndex].name)
// console.log(selectHeight)
console.log(shapes)
  return (
    <div id="restaurant-floor">
      
      <div className='firstStep-Name'>
    <img style={{width:'4%',marginRight:'5px'}} src="../../../public/img/Group4.png" alt="Main Logo" />
    <h3 >მოგესალმებით მიკიტანში</h3>

    <div className="details-steps">
      <div onClick={()=>setStep(1)}>
      <ion-icon name="newspaper-outline"></ion-icon>
      <h3 style={{color:'#8C1D2F'}}>1. დეტალები</h3>

      </div>
      <div style={{borderColor:'#8C1D2F',borderWidth:'1.5px'}} className="details-line">

      </div>
      <div  onClick={()=>setStep(2)}>
      <ion-icon name="images-outline"></ion-icon>
      <h3  style={{color:'#8C1D2F'}}>2. სურათები</h3>

      </div>
      <div style={{borderColor:'#8C1D2F',borderWidth:'1.5px'}} className="details-line">

      </div>
      <div  onClick={()=>setStep(3)}>
      <ion-icon name="grid-outline"></ion-icon>
      <h3 style={{color:'#8C1D2F'}}>3. მაგიდები</h3>

      </div>
      <div className="details-line">
        
        </div>
        <div  onClick={()=>setStep(4)}>
          <ion-icon name="fast-food-outline"></ion-icon>
          <h3>4. მენიუ</h3>

        </div>
        <div className="details-line">
          
        </div>
        <div  onClick={()=>setStep(5)}>
          <ion-icon name="flag-outline"></ion-icon>
          <h3>5. დასასრული</h3>

        </div >
 
    </div>
        </div>
    
      <div className='shapesVariartions' >
        <img className='rectangle1' onClick={() => addShape('rectangle')} src="../../../public/first/მაგიდა2,0.png" alt="" />
        <img className='circle1' onClick={() => addShape('circle')} src="../../../public/second/მაგიდა4.0.png" alt="" />
        <img className='square1' onClick={() => addShape('square')} src="../../../public/third/მაგიდა6.0.png" alt="" />

        <img className='square1' onClick={() => addShape('ladder')} src="../../../public/stairs1.png" alt="" />
        <img className='square1' onClick={() => addShape('door')} src="../../../public/door.png" alt="" />

      </div>

      <div style={{ position: 'absolute', right: '0%', top: '13%', display: 'flex',width:'50%',alignItems:'center' }}>

        <button onClick={addFloor} className='addFloor'>სართულის დამატება</button>
        <button onClick={deleteFloor} className='deleteFloor'>სართულის წაშლა</button>
        {floors.map((floor, index) => (
  <div key={floor.id}>
    {currentFloorIndex === index && (
      <input
      className='floor-name'
        type="text"
        value={floorNames[index]}
        onChange={e => handleFloorNameChange(index, e.target.value)}
        placeholder='სართულის სახელი'
      
      />
    )}
  </div>
))}

        <div style={{ display: 'flex', height: '20%', width: '20%' }}>
          <FloorSelector floors={floors} currentFloorIndex={currentFloorIndex} onChange={setCurrentFloorIndex} />
        </div>
        {/* <button className='final-save' onClick={handleFinalSave}>Final Save</button> */}

      </div>

      <Stage style={{ position: "absolute", left: '1%', marginTop: '10%', }}  width={extractWidth(selectWidth)*3.4} height={extractWidth(selectHeight)*4.6} onClick={handleStageClick} onTouchEnd={handleStageClick}>
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
                 isEdit={true}
                 shapeProps={shape}
                 isSelected={isSelected}
                 onSelect={() => handleShapeClick(index)}
                 onChange={(newProps) => handleShapeDragEnd(index, newProps)}
                 
                 fillPatternImage={shape.isForReservation ? imageArrayFirst[shape.colorIndex] : imageArrayFirstGrey[shape.colorIndex]}
                 fillPatternScaleX={shape.width/2800} // Adjust as needed
                 fillPatternScaleY={shape.height/2200}
                 fillPatternRepeat="no-repeat" // Prevent the image from repeating 
               />
                )}

                {shape.type === 'circle' && (
                  
                  <TransformableCircle
                  isEdit={true}

                 shapeProps={shape}
                 isSelected={isSelected}
                 onSelect={() => handleShapeClick(index)}
                 onChange={(newProps) => handleShapeDragEnd(index, newProps)}
                 fillPatternImage={shape.isForReservation ? imageArraySecond[shape.colorIndex] : imageArraySecondGrey[shape.colorIndex]}
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
                   isEdit={true}

                   shapeProps={shape}
                   isSelected={isSelected}
                   onSelect={() => handleShapeClick(index)}
                   onChange={(newProps) => handleShapeDragEnd(index, newProps)}
                   fillPatternImage={shape.isForReservation ? imageArrayThird[shape.colorIndex] : imageArrayThirdGrey[shape.colorIndex]}
                   fillPatternScaleX={shape.width/3800} // Adjust as needed
                   fillPatternScaleY={shape.height/2400}
                   fillPatternRepeat="no-repeat" // Prevent the image from repeating 
                 />
                )}


              {shape.type === 'ladder' && (
                  <TransformableLedder
                  isEdit={true}

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
                  isEdit={true}

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
                selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
        <>
         <label style={{color:"#8C1D2F",fontSize:'18px',fontWeight:'400'}}>
      მაგიდის ნომერი:
      <input
        type="number"
        value={selectedShapeDetails.tableNumber}
        onChange={(e) => handleTableDetailsChange('tableNumber', e.target.value)}
      />
    </label>
    <label>
      მაქსიმალური ტევადობა:
      <input
        type="number"
        value={selectedShapeDetails.maxPeopleAmount}
        onChange={(e) => handleTableDetailsChange('maxPeopleAmount', e.target.value)}
      />
    </label>
    <label>
      მინიმალური ტევადობა:
      <input
        type="number"
        value={selectedShapeDetails.minPeopleAmount}
        onChange={(e) => handleTableDetailsChange('minPeopleAmount', e.target.value)}
      />
    </label>
    <label style={{display:'flex',flexDirection:'column', width:'100%' ,alignItems:'flex-start' }}>
      მაგიდის ტეგი:
<Select
  value={selectedShapeDetails.selectedTag}
  onChange={(selectedOption) =>
    handleTableDetailsChange('selectedTag', selectedOption)
  }
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
      width: selectWidth,
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
    
        </> : <></>
    }

    {
                      selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
<label style={{display:'flex',flexDirection:'column', width:'100%' ,alignItems:'flex-start' }}>
  მაგიდის ტიპი
<SelectInput isEdit={true} defaultValue={options[selectedShapeDetails.colorIndex]} options={options} onChange={handleOptionChange1} />

</label> : <></>
    }
    {
                selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
                <label style={{display:'flex', width:'100%' ,alignItems:'center',justifyContent:'flex-start' }}>
                მაგიდა დაჯავშნისთვისაა ?
                
          
                
          
            <input
              type="checkbox"
              onChange={(e) => {
                if(shapes[selectedShapeIndex].isForReservation){
                  handleTableDetailsChange('isForReservation',false)
                } else {
                  handleTableDetailsChange('isForReservation',true)
          
                }
              }}
              style={{marginLeft:"3%"}}
              defaultChecked={shapes[selectedShapeIndex].isForReservation}
              />
          
              </label> : <></>
    }

   
    {
          selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
<>
<button  className='button-details button1' onClick={handleSaveTable}>Save Table</button>
    <button  className='button-details button2' onClick={handleCancelTable}>Cancel</button>
    <button  className='button-details button3' onClick={handleDeleteTable}>Delete Table</button>
    </> 
    :
    <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
    <button style={{ width:'30%'}} className='button-details button2' onClick={handleCancelTable}>Cancel</button>
    <button style={{ width:'30%'}} className='button-details button3' onClick={handleDeleteTable}>Delete ladder</button>
    </div>
    }

    
  </div>
)}
<div className='tablesLastDiv'>
<button onClick={(e) => prevStep()} className='addFloor1'>უკან</button>
<button onClick={handleFinalSave} className='addFloor1'>შემდეგი</button>

</div>
          <div  className='footerTables'>
  <h3 >powered by MIKITANI</h3>
  <h3>2024</h3>
  
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

