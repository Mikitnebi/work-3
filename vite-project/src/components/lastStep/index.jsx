import React, { useEffect, useState } from "react";
import "./lastStep.css";
import * as yup from "yup";
import RegistrationModal from "../modals/registrationModal";
import { FinalChecker } from "../finalChecker";
import ParentChecker from "../finalChecker/parentChecker";
import ParentMenuModal from "../modals/parentMenuModal";
import ParentMenu from "./parentMenu";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import "../firstStep/firstStep.css";

import "../../../public/fonts/bpg_nino_mtavruli_bold.ttf"
export const LastStep = function ({setStep, chooseStep, prevStep, nextStep,isParent,setIsParent,isParent1,setIsParent1,menuData,setMenuData }) {
  const [parentMenu, setParentMenu] = useState([]);

  const [parentMenu1, setParentMenu1] = useState([]);

  const [menuData1, setMenuData1] = useState(JSON.parse(localStorage.getItem("menuData1")) || []);  

  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const [draggedItemId, setDraggedItemId] = useState(null);

  const tagOptions = [
    { value: '#lemon', label: '#lemon' },
    { value: '#meat', label: '#meat' },
    { value: '#cheese', label: '#cheese' },
    { value: '#salt', label: '#salt' },
  ];

  const GeorgiantagOptions = [
    { value: '#ლიმონი', label: '#ლიმონი' },
    { value: '#ხორცი', label: '#ხორცი' },
    { value: '#ყველი', label: '#ყველი' },
    { value: '#მარილი', label: '#მარილი' },
  ];
  const onDragEnd = (result) => {
    if (!result.destination) {
      return; // Dropped outside the list
    }
  
    const { source, destination, draggableId } = result;
  
    // Find the source and destination sections
    const sourceSection = menuSections[source.droppableId];
    const destSection = menuSections[destination.droppableId];
  
    // Find the item being dragged
    const item = sourceSection.items.find((item) => item.id === draggableId);
  
    // Check if the item's parent property is true or if it's moving within the same section
    if (!item.parent || sourceSection === destSection) {
      const updatedMenuSections = [...menuSections];
  
      // Remove the item from the source section
      sourceSection.items.splice(source.index, 1);
  
      // Insert the item into the destination section
      destSection.items.splice(destination.index, 0, item);
  
      // Update the state with the reordered sections
      setMenuSections(updatedMenuSections);
    }
  };
  const isThereAnySelectedLeft = (section) => {
    const itemsWithParent = section.items.filter((item) => item.parent);
    if(itemsWithParent.length==0){
      return false
    }else{
      return true
    }
  }
  const toggleSectionSelection = (section) => {
    // Filter out items that have the 'parent' property set to false
    const itemsWithParent = section.items.filter((item) => item.parent);
    if (true) {
      const isAlreadySelected = isSectionInSelectedSections(section);
  
      if (isAlreadySelected) {
        console.log(5)

        // Section is already selected, uncheck it and remove its items from selectedItems
        setSelectedSections(selectedSections.filter((selected) => selected.title !== section.title));
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter(
            (selectedItem) => selectedItem.title !== section.title
          )
        );
        handleMoveSelectedItems(selectedItems, selectedSections);
      } else {
        setSelectedSections([...selectedSections, section]);
  
        // Filter out items that are already in selectedItems
        const newItems = itemsWithParent.filter(
          (item) =>
            !selectedItems.some(
              (selectedItem) =>
                selectedItem.name === item.name &&
                selectedItem.title === section.title
            )
        );
  
        setSelectedItems((prevSelectedItems) => [
          ...prevSelectedItems,
          ...newItems.map((item) => ({
            ...item,
            title: section.title,
          })),
        ]);
      }
    }
  };
  
  
  
  
  

  const toggleItemSelection = (section, item) => {
    // Check if the item's parent property is true and the section's parent property is true
    if (item.parent ) {
      const isAlreadySelected = selectedItems.some(
        (selectedItem) =>
          selectedItem.name === item.name && selectedItem.title === section.title
      );
  
      setSelectedItems((prevSelectedItems) => {
        if (isAlreadySelected) {
          return prevSelectedItems.filter(
            (selectedItem) =>
              selectedItem.name !== item.name || selectedItem.title !== section.title
          );
        } else {
          return [...prevSelectedItems, { ...item, title: section.title }];
        }
      });
  
      const areAllItemsSelected = section.items.every((sectionItem) =>
        selectedItems.some(
          (selectedItem) =>
            selectedItem.name === sectionItem.name && selectedItem.title === section.title
        )
      );
  
      setSelectedSections((prevSelectedSections) => {
        if (areAllItemsSelected) {
          return Array.from(new Set([...prevSelectedSections, section]));
        } else {
          return prevSelectedSections.filter((selected) => selected.title !== section.title);
        }
      });
    }
  };
  


 

  const isSectionInSelectedSections = (section) => {
    return section.items.some((sectionItem) =>
      selectedItems.some(
        (selectedItem) =>
          selectedItem.name === sectionItem.name && selectedItem.title === section.title
      )
    );
  };


  const [menuSections, setMenuSections] = useState(
    JSON.parse(localStorage.getItem("menuSections")) || [
      {
        title: "Appetizers",
        georgianTitle: "აპეტაიზერი",
        items: [
          {
            id: uuidv4(),
            name: "Item 11",
            georgianName: "ქართული სახელი 1", // Add Georgian Dish Name
            price: 10,
            image: "",
            description: "sdfs",
            georgianDescription: "ქართული აღწერა 1", // Add Georgian Dish Description
            ingredients: [],
            georgianIngredients: [], // Add ინგედიენტები ქართულად
          },
          {
            id: uuidv4(),
            name: "Item 2",
            georgianName: "ქართული სახელი 2", // Add Georgian Dish Name
            price: 12,
            image: "",
            description: "fsdfsd",
            georgianDescription: "ქართული აღწერა 2", // Add Georgian Dish Description
            ingredients: [],
            georgianIngredients: [], // Add ინგედიენტები ქართულად
          },
        ],
      },
      {
        title: "Main Courses",
        georgianTitle: "მთავარი კურსი",
        items: [
          {
            id: uuidv4(),
            name: "Item 11",
            georgianName: "ქართული სახელი 1", // Add Georgian Dish Name
            price: 20,
            image: "",
            description: "qweqw",
            georgianDescription: "ქართული აღწერა 1", // Add Georgian Dish Description
            ingredients: [],
            georgianIngredients: [], // Add ინგედიენტები ქართულად
          },
          {
            id: uuidv4(),
            name: "Item 2",
            georgianName: "ქართული სახელი 2", // Add Georgian Dish Name
            price: 28,
            image: "",
            description: "imompp",
            georgianDescription: "ქართული აღწერა 2", // Add Georgian Dish Description
            ingredients: [],
            georgianIngredients: [], // Add ინგედიენტები ქართულად
          },
        ],
      },
    ]
  );
  const handleMoveSelectedItems = (selectedItems, selectedSections) => {
    const updatedMenuData1 = [...menuData1];
  
    // Loop through each section in parentMenu and add their items to menuData1
    parentMenu.forEach((section) => {
      // Find the corresponding section in menuData1 or create a new one
      const existingSectionIndex = updatedMenuData1.findIndex(
        (menuSection) => menuSection.title === section.title
      );
  
      if (existingSectionIndex !== -1) {
        // If the section already exists, add the items to it, avoiding duplicates
        section.items.forEach((item) => {
          const existingItemIndex = updatedMenuData1[existingSectionIndex].items.findIndex(
            (existingItem) => existingItem.name === item.name
          );
  
          if (existingItemIndex === -1) {
            // Item doesn't exist, so add it
            updatedMenuData1[existingSectionIndex].items.push(item);
          }
        });
      } else {
        // If the section doesn't exist, create a new one and add the items
        updatedMenuData1.push({ title: section.title, items: [...section.items] });
      }
    });
  
    setMenuData1(updatedMenuData1);
  };

  const filterMenuData = (data, parentMenu) => {
    return data.map((section) => {
      const items = section.items.filter((item) => {
        // Check if the item exists in parentMenu
        const itemInParentMenu = parentMenu.some((parentSection) =>
          parentSection.items.some((parentItem) => parentItem.name === item.name)
        );
  
        // Keep the item only if it's not in parentMenu or if the section still has other items
        return !itemInParentMenu;
      });
  
      // Update the items in the section
      return { ...section, items };
    }).filter((section) => section.items.length > 0);
  };


  const handleMoveSelectedItems1 = (selectedItems, selectedSections) => {
    const updatedMenuSections = [...menuData];

    // Loop through each section in parentMenu and add their items to menuSections
    parentMenu1.forEach((section) => {
      // Find the corresponding section in menuSections or create a new one
      const existingSectionIndex = updatedMenuSections.findIndex(
        (menuSection) => menuSection.title === section.title
      );
  
      if (existingSectionIndex !== -1) {
        // If the section already exists, add the items to it
        updatedMenuSections[existingSectionIndex].items.push(...section.items);

      } else {
        // If the section doesn't exist, create a new one and add the items
        updatedMenuSections.push({ title: section.title, items: section.items });

      }
    });
    setMenuData(updatedMenuSections);
  };

  const handleMoveSelectedItems2 = (selectedItems, selectedSections) => {
    const updatedMenuSections = [...menuSections];

    // Loop through each section in parentMenu and add their items to menuSections
    parentMenu.forEach((section) => {
      // Find the corresponding section in menuSections or create a new one
      const existingSectionIndex = updatedMenuSections.findIndex(
        (menuSection) => menuSection.title === section.title
      );
  
      if (existingSectionIndex !== -1) {
        // If the section already exists, add the items to it
        updatedMenuSections[existingSectionIndex].items.push(...section.items);

      } else {
        // If the section doesn't exist, create a new one and add the items
        updatedMenuSections.push({parent:section.parent, title: section.title, items: section.items, georgianTitle:section.georgianTitle});

      }

    });
    setMenuSections(updatedMenuSections);
  };

    



  useEffect(() => {
    const updatedParentMenu = [];
  
    // Group selected items by title
    selectedItems.forEach((selectedItem) => {
      const { title, ...itemInfo } = selectedItem;
      // console.log(selectedItem)
      // Check if there is an entry with the same title
      const sectionEntry = updatedParentMenu.find((entry) => entry.title === title);
  
      if (sectionEntry) {
        // Add itemInfo to the existing section entry
        if(itemInfo.parent){
          sectionEntry.items.push(itemInfo);

        }
        // console.log(itemInfo)
      } else {
        // Create a new section entry
        updatedParentMenu.push({ title, items: [itemInfo] });
      }
    });
  
    setParentMenu1(updatedParentMenu);
  }, [selectedItems]);





  const [combinedErrors, setCombinedErrors] = useState({}); // Detailed errors for combined-errors section
  const [simpleErrors, setSimpleErrors] = useState({}); // Simple errors for menu-grid



  const addMenuSection = () => {
    const newMenuSections = [...menuSections, { title: "",georgianTitle: "",items: [] }];
    setMenuSections(newMenuSections);
  };

  const deleteMenuSection = (index) => {
    const newMenuSections = [...menuSections];
    newMenuSections.splice(index, 1);
    setMenuSections(newMenuSections);
  };

  const updateMenuSectionTitle = (index, title) => {
    const newMenuSections = [...menuSections];
    newMenuSections[index].title = title;
    setMenuSections(newMenuSections);
  };
  const updateMenuSectionGeorgianTitle = (index, title) => {
    const newMenuSections = [...menuSections];
    newMenuSections[index].georgianTitle = title;
    setMenuSections(newMenuSections);
  };

  const addMenuItem = (sectionIndex) => {
    const newMenuSections = [...menuSections];
    newMenuSections[sectionIndex].items.push({
      id: uuidv4(),
      name: "",
      georgianName: "",
      price: "",
      image: "",
      description: "",
      georgianDescription: "",
      ingredients: [],
      georgianIngredients: [],
    });
    setMenuSections(newMenuSections);
  };

  const deleteMenuItem = (sectionIndex, itemIndex) => {
    const newMenuSections = [...menuSections];
    newMenuSections[sectionIndex].items.splice(itemIndex, 1);
    setMenuSections(newMenuSections);
  };

  const updateMenuItem = (sectionIndex, itemIndex, property, value) => {
    const newMenuSections = [...menuSections];
    newMenuSections[sectionIndex].items[itemIndex][property] = value;
    setMenuSections(newMenuSections);
  };

  const handleFinalSave = () => {
    // Validate fields before saving
    const isValid = validateFields();

    if (isValid) {
      // Perform the final save logic here
      // This function will handle all of your sections and items
      localStorage.setItem("menuSections", JSON.stringify(menuSections));
      localStorage.setItem("menuData1", JSON.stringify(menuData1));
      // For demonstration purposes, let's just log the menuSections
      console.log("Final Save Data:", menuSections);
      nextStep();
    }
  };

  const validateFields = () => {
    const newCombinedErrors = {}; // Store detailed validation errors for combined-errors section
    const newSimpleErrors = {}; // Store simple validation errors for menu-grid
  
    const englishLettersWithSpacesAndTabsRegex = /^[A-Za-z0-9 \t]+$/;
    const georgianLettersWithSpacesAndTabsRegex = /^[\u10A0-\u10FF0-9 \t]+$/;
  
    // Validate sections
    menuSections.forEach((section, sectionIndex) => {
      if (!section.title || !englishLettersWithSpacesAndTabsRegex.test(section.title)) {
        newCombinedErrors[`sectionTitle${sectionIndex}`] = `სექციის სახელი სავალდებულოა და ის უნდა შეიცავდეს მხოლოდ ინგლისურ ასოებს`;
      }
      if (!section.georgianTitle || !georgianLettersWithSpacesAndTabsRegex.test(section.georgianTitle)) {
        newCombinedErrors[`sectionGeorgianTitle${sectionIndex}`] = `სექციის სახელი სავალდებულოა და ის უნდა შეიცავდეს მხოლოდ ინგლისურ ასოებს`;
      }
  
      section.items.forEach((item, itemIndex) => {
        if (!item.name || !englishLettersWithSpacesAndTabsRegex.test(item.name)) {
          newSimpleErrors[`itemName${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Name is required and must contain only English letters`;
        }
  
        if (!item.price || isNaN(item.price)) {
          newSimpleErrors[`itemPrice${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Price is required and must be a valid number`;
        }
  
        if (!item.image) {
          newSimpleErrors[`itemImage${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Image is required`;
        }
  
        if (!item.description || !englishLettersWithSpacesAndTabsRegex.test(item.description)) {
          newSimpleErrors[`itemDescription${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Description is required and must contain only English letters`;
        }
  
        if (item.ingredients.length === 0 ) {
          newSimpleErrors[`itemIngredients${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Ingredients are required and must contain only English letters`;
        }
  
        if (!item.georgianName || !georgianLettersWithSpacesAndTabsRegex.test(item.georgianName)) {
          newSimpleErrors[`itemGeorgianName${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Georgian Dish Name is required and must contain only Georgian letters`;
        }
  
        if (item.georgianIngredients.length === 0 ) {
          newSimpleErrors[`itemGeorgianIngredients${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Georgian Ingredients are required and must contain only Georgian letters`;
        }
  
        if (!item.georgianDescription || !georgianLettersWithSpacesAndTabsRegex.test(item.georgianDescription)) {
          newSimpleErrors[`itemGeorgianDescription${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Georgian Dish Description is required and must contain only Georgian letters`;
        }
      });
  
      // Check if there are no items in a section
      if (section.items.length === 0) {
        newCombinedErrors[`sectionItems${sectionIndex}`] = `სექცია ${ section?.title} აუცილებლად უნდა შეიცავდეს მინიმუმ ერთ კერძს`;
      }
    });
  
    // Set validation errors
    setCombinedErrors(newCombinedErrors);
    setSimpleErrors(newSimpleErrors);
  
    // Check if there are any errors
    const hasErrors = Object.keys(newCombinedErrors).length > 0 || Object.keys(newSimpleErrors).length > 0;
  
    // Show simple errors as alert
    if (hasErrors) {
      let errorMessage = 'Validation errors:\n';
      Object.values(newSimpleErrors).forEach((error) => {
        errorMessage += `${error}\n`;
      });
      alert(errorMessage);
    }
  
    return !hasErrors;
};

  

  const [isOpenRegistration, setIsOpenRegistration] = useState(false)
  const [isOpenParentMenu,setIsOpenParentMenu] = useState(false)
  const deleteParentMenuItems = () => {
    // Create a copy of the selectedSections and selectedItems arrays
    let updatedSelectedSections = [...selectedSections];
    let updatedSelectedItems = [...selectedItems];
  
    // Iterate through the parentMenu1 and remove corresponding sections and items
    parentMenu1.forEach((section) => {
      // Remove the section from selectedSections
      updatedSelectedSections = updatedSelectedSections.filter(
        (selectedSection) => selectedSection.title !== section.title
      );
  
      // Remove items from selectedItems that belong to the removed section
      updatedSelectedItems = updatedSelectedItems.filter(
        (selectedItem) => selectedItem.title !== section.title
      );
    });
  
    // Update the state with the modified selectedSections and selectedItems
    setSelectedSections(updatedSelectedSections);
    setSelectedItems(updatedSelectedItems);
  };
  
  
  const deleteParentMenuSections = () => {
    // Create a copy of the selectedSections array
    let updatedSelectedSections = [...selectedSections];
  
    // Iterate through the parentMenu1 and remove corresponding sections
    parentMenu1.forEach((section) => {
      // Remove the section from updatedSelectedSections
      updatedSelectedSections = updatedSelectedSections.filter(
        (selectedSection) => selectedSection.title !== section.title
      );
    });
  
    // Update the state with the modified selectedSections
    setSelectedSections(updatedSelectedSections);
  };
  

  const submit = () => {
    setMenuSections(filterMenuData(menuSections, parentMenu1))
    deleteParentMenuItems()
    deleteParentMenuSections()
    handleMoveSelectedItems1(selectedItems,selectedSections)
    // handleMoveSelectedItems(selectedItems, selectedSections);
    // console.log(menuData)
  };

  const [sectionParent, setSectionParent] = useState('')




  return (

    !isParent ? 
       
       !isOpenRegistration ?
      <div  className="doYouHave">
        <div>
        გყავთ მთავარი ფილიალი ? 
        
        <span onClick={()=>{setIsOpenRegistration(true);setIsParent1(true)}} >კი</span> 
        <span onClick={() => {setIsParent(true); setIsParent1(false)}} >არა</span>  
        </div>
       
      </div>
      : 
      <div style={{position: 'absolute',
      top: '0%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width:'100%'
      }}>
      <ParentChecker   setIsParent={setIsParent}/>
        
    </div> 
      
    :

    <div className="last-step">
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
      <div style={{borderColor:'#8C1D2F',borderWidth:'1.5px'}} className="details-line">
        
        </div>
        <div  onClick={()=>setStep(4)}>
          <ion-icon name="fast-food-outline"></ion-icon>
          <h3 style={{color:'#8C1D2F'}}>4. მენიუ</h3>

        </div>
        <div className="details-line">
          
        </div>
        <div  onClick={()=>setStep(5)}>
          <ion-icon name="flag-outline"></ion-icon>
          <h3>5. დასასრული</h3>

        </div >
 
    </div>
        </div>
        <ParentMenuModal open={isOpenParentMenu} onClose={() => setIsOpenParentMenu(false)}>
        <ParentMenu 
        handleMoveSelectedItems={handleMoveSelectedItems}
        parentMenu={parentMenu}
        setMenuData={setMenuData}
        setParentMenu={setParentMenu} 
        handleMoveSelectedItems2={handleMoveSelectedItems2}
        // selectedSections={selectedSections}
        //   setSelectedSections={setSelectedSections}
        //   selectedItems={selectedItems}
        //   setSelectedItems={setSelectedItems}
        //   onSelectionChange={onSelectionChange}
menuData={menuData} close={ setIsOpenParentMenu }/>

      </ParentMenuModal>
      {
          isParent1 ? 
          <div className="menu-flex">
 
 <button className="last-step-button1" onClick={(e) => prevStep()}>
    უკან
  </button>

  <button onClick={() => setIsOpenParentMenu(true)}  className="last-step-button1">მშობელი ფილიალის მენიუ</button>

  <button className="add-section-button" onClick={addMenuSection}>
    სექციის დამატება
  </button>
        
  <button  className="final-save-button"  onClick={()=>submit()}>
  კერძის / სექციის დაბრუნება 
  </button>
  <button className="final-save-button" onClick={(e) => {
    handleFinalSave();
    
  }}>
    შემდეგი
  </button>



      </div> :

<div className="menu-flex">
<button className="last-step-button1" onClick={(e) => prevStep()}>
    უკან
  </button>
  <button className="add-section-button" onClick={addMenuSection}>
    სექციის დამატება
  </button>
  <button  className="final-save-button" onClick={(e) => {
    handleFinalSave();
    
  }}>
    შემდეგი
  </button>
        
</div>

      }
      

      {/* Display combined-errors */}
      {/* {Object.keys(combinedErrors).length > 0 && (
        <div className="combined-errors">
          {Object.values(combinedErrors).map((error, index) => (
            <div key={index} className="error-message1">
              {error}
            </div>
          ))}
        </div>
      )} */}

      <div className="wraperMenu" >
      <div className="menu-grid">
      <DragDropContext onDragEnd={onDragEnd}>

        {menuSections.map((section, sectionIndex) => (
        <Droppable droppableId={sectionIndex.toString()} key={sectionIndex}>
          {(provided,snapshot) => (
                <div
                
                ref={provided.innerRef}
                  {...provided.droppableProps}

                  // style={{
                  //   ...provided.draggableProps.style,
                  //   // Add other styles here
                  // }}
                >

          <div className="menu-section" key={sectionIndex}>

           {!section.parent   ?
            isThereAnySelectedLeft(section) ?
            <>
            <div className="sectionHead" >
            <label style={{fontSize:'13px'}} htmlFor={`sectionTitle-${sectionIndex}`}>სექცია ინგლისურად:</label>
            <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              disabled={true}
            />


<div style={{ display: 'inline-block', position: 'relative',       marginLeft:'5px', marginBottom:'5px'}}>
  <input
    style={{
      width: '20px',
      height: '20px',
      margin: 0,
      padding: 0,
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
    }}
    type="checkbox"
    onChange={() => toggleSectionSelection(section)}

    defaultChecked={!isSectionInSelectedSections(section)}
    />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: !isSectionInSelectedSections(section) ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {!isSectionInSelectedSections(section) && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>
            {/* <input
                  type="checkbox"
                  onChange={() => toggleSectionSelection(section)}
                  checked={!isSectionInSelectedSections(section)}
                /> */}
            </div>

            <div className="sectionHead" >
            <label style={{fontSize:'13px'}} htmlFor={`GeorgianSectionTitle-${sectionIndex}`}>სექცია ქართულად:</label>
            <input
              type="text"
              placeholder="სექცია ქართულად"
              value={section.georgianTitle}
              disabled={true}
            />
            </div>
            
            
              </> 
              :
              <>
              <div className="sectionHead" >
                <label style={{fontSize:'13px'}} htmlFor={`sectionTitle-${sectionIndex}`}>სექცია ინგლისურად:</label>

              <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) =>
                updateMenuSectionTitle(sectionIndex, e.target.value)
              }
              id={`sectionTitle-${sectionIndex}`}
            />
            </div>
            <div className="sectionHead" >
            <label  style={{fontSize:'13px'}} htmlFor={`GeorgianSectionTitle-${sectionIndex}`}>სექცია ქართულად:</label>
            <input
              type="text"
              placeholder="სექცია ქართულად"
              value={section.georgianTitle}
              onChange={(e) =>
                updateMenuSectionGeorgianTitle(sectionIndex, e.target.value)
              }
              id={`GeorgianSectionTitle-${sectionIndex}`}

            />
            </div>

            </>
            :
            isThereAnySelectedLeft(section) ?
            <>
            <div className="sectionHead" >
            <label style={{fontSize:'13px'}} htmlFor={`sectionTitle-${sectionIndex}`}>სექცია ინგლისურად:</label>

            <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              disabled={true}
            />
            <div style={{ display: 'inline-block', position: 'relative',       marginLeft:'5px', marginBottom:'5px'}}>
  <input
    style={{
      width: '20px',
      height: '20px',
      margin: 0,
      padding: 0,
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
    }}
    type="checkbox"
    onChange={() => toggleSectionSelection(section)}

    defaultChecked={!isSectionInSelectedSections(section)}
    />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: !isSectionInSelectedSections(section) ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {!isSectionInSelectedSections(section) && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>
            {/* <input
                  type="checkbox"
                  onChange={() => toggleSectionSelection(section)}
                  checked={!isSectionInSelectedSections(section)}
                /> */}
            </div>

            <div className="sectionHead" >
            <label style={{fontSize:'13px'}} htmlFor={`GeorgianSectionTitle-${sectionIndex}`}>სექცია ქართულად:</label>
            <input
              type="text"
              placeholder="სექცია ქართულად"
              value={section.georgianTitle}
              disabled={true}
            />
            </div>
            
              </> 
              :
              <>
              <div className="sectionHead" >
              <label style={{fontSize:'13px'}} htmlFor={`sectionTitle-${sectionIndex}`}>სექცია ინგლისურად:</label>

              <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) =>
                updateMenuSectionTitle(sectionIndex, e.target.value)
              }
            />
            </div>

            <div className="sectionHead" >
            <label style={{fontSize:'13px'}} htmlFor={`GeorgianSectionTitle-${sectionIndex}`}>სექცია ქართულად:</label>
            <input
              type="text"
              placeholder="სექცია ქართულად"
              value={section.georgianTitle}
              onChange={(e) =>
                updateMenuSectionGeorgianTitle(sectionIndex, e.target.value)
              }
              id={`GeorgianSectionTitle-${sectionIndex}`}

            />
            </div>
            </>
            }
            <ul className="ul-last">
              {section.items.map((item, itemIndex) => (
                
                !item.parent ?
                <Draggable
                draggableId={item.id}
                index={itemIndex}
                key={item.id}
              >
                {(provided) => (
                          <li
                          className={`menu-section1 ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={itemIndex}
                          >

                  <div className="menu-item">
                  <label  htmlFor={`dishName-${sectionIndex}-${itemIndex}`}>კერძის ინგლისური სახელი:</label>

                    <input
                      type="text"
                      placeholder="კერძის ინგლისური სახელი"
                      value={item.name}
                      onChange={(e) =>
                        updateMenuItem(
                          sectionIndex,
                          itemIndex,
                          "name",
                          e.target.value
                        )
                      }
                      id={`dishName-${sectionIndex}-${itemIndex}`}

                    />
                    {simpleErrors[`itemName${sectionIndex}-${itemIndex}`] && 
                      <div className="error-message">
                        შეიყვანეთ კერძის სახელი ინგლისურად
                      </div>
                    }
                    <label  htmlFor={`georgianDishName-${sectionIndex}-${itemIndex}`}>კერძის ქართული სახელი:</label>

                    <input
  type="text"
  placeholder="კერძის ქართული სახელი"
  value={item.georgianName}
  onChange={(e) =>
    updateMenuItem(
      sectionIndex,
      itemIndex,
      "georgianName",
      e.target.value
    )
  }
  id={`georgianDishName-${sectionIndex}-${itemIndex}`}
/>
{simpleErrors[`itemGeorgianName${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    შეიყვანეთ კერძი ქართულად
  </div>
}
            <label  htmlFor={`DishPrice-${sectionIndex}-${itemIndex}`}>კერძის ფასი:</label>

                    <input
                      type="number"
                      placeholder="კერძის ფასი"
                      value={item.price}
                      onChange={(e) =>
                        updateMenuItem(
                          sectionIndex,
                          itemIndex,
                          "price",
                          e.target.value
                        )
                      }
                      id={`DishPrice-${sectionIndex}-${itemIndex}`}
                    />
                    {simpleErrors[`itemPrice${sectionIndex}-${itemIndex}`] && 
                      <div className="error-message">
                        შეიყვანეთ კერძის ფასი
                      </div>
                    }
                    <label  htmlFor={`DishDescription-${sectionIndex}-${itemIndex}`}>კერძის აღწერა ინგლისურად:</label>

                  <textarea className="menuTextArea"
  placeholder="კერძის აღწერა ინგლისურად"
  value={item.description}
  onChange={(e) =>
    updateMenuItem(
      sectionIndex,
      itemIndex,
      "description",
      e.target.value
    )
  }
  id={`DishDescription-${sectionIndex}-${itemIndex}`}
/>
{simpleErrors[`itemDescription${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    შეიყვანეთ კერძის აღწერა ინგლისურად
  </div>
}
<label  htmlFor={`GeorgianDishDescription-${sectionIndex}-${itemIndex}`}>კერძის აღწერა ქართულად:</label>

<textarea className="menuTextArea"
  placeholder="კერძის აღწერა ქართულად"
  value={item.georgianDescription}
  onChange={(e) =>
    updateMenuItem(
      sectionIndex,
      itemIndex,
      "georgianDescription",
      e.target.value
    )
  }
  id={`GeorgianDishDescription-${sectionIndex}-${itemIndex}`}
/>
{simpleErrors[`itemGeorgianDescription${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    შეიყვანეთ კერძის აღწერა ქართულად
  </div>
}
<label  htmlFor={`ingredients-${sectionIndex}-${itemIndex}`}>ინგრედიენტები:</label>

<Select
        value={item.ingredients}
        onChange={(selectedOption) =>
          updateMenuItem(
            sectionIndex,
            itemIndex,
            "ingredients",
            selectedOption
          )        } options={tagOptions}
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
        id={`ingredients-${sectionIndex}-${itemIndex}`}

      />

{/* <textarea className="menuTextArea"
  placeholder="Ingredients"
  value={item.ingredients}
  onChange={(e) =>
    updateMenuItem(
      sectionIndex,
      itemIndex,
      "ingredients",
      e.target.value
    )
  }
  id={`ingredients-${sectionIndex}-${itemIndex}`}
  style={{ width: '100%', height: "60px" }} // You can adjust the width and height as needed
/> */}
{simpleErrors[`itemIngredients${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    შეიყვანეთ ინგრედიენტები
  </div>
}
<label  htmlFor={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}>ინგრედიენტები ქართულად:</label>


<Select
        value={item.georgianIngredients}
        onChange={(selectedOption) =>
          updateMenuItem(
            sectionIndex,
            itemIndex,
            "georgianIngredients",
            selectedOption
          )       } options={GeorgiantagOptions}
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
        id={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}

      />


{/* <textarea className="menuTextArea"
  placeholder="ინგრედიენტები ქართულად"
  value={item.georgianIngredients}
  onChange={(e) =>
    updateMenuItem(
      sectionIndex,
      itemIndex,
      "georgianIngredients",
      e.target.value
    )
    
  }
  id={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}
  style={{ width: "100%", height: "60px" }}
/> */}
{simpleErrors[`itemGeorgianIngredients${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    შეიყვანეთ ინგრედიენტები ქართულად
  </div>
}
<label  htmlFor={`image-${sectionIndex}-${itemIndex}`}>კერძის ფოტო:</label>

                    <input
                    id={`image-${sectionIndex}-${itemIndex}`}
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        updateMenuItem(
                          sectionIndex,
                          itemIndex,
                          "image",
                          URL.createObjectURL(file)
                        );
                      }}
                    />
                    {/* {section.items[itemIndex] && (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        overflow: 'hidden',
        marginRight: '10px',
      }}
    >
      <img
        src={section.items[itemIndex]}
        alt="Preview"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>

  </div>
)} */}
                    {simpleErrors[`itemImage${sectionIndex}-${itemIndex}`] && 
                      <div className="error-message">შეიყვანეთ კერძის ფოტო</div>
                    }
                    <button
                      className="delete-item-button"
                      onClick={() => deleteMenuItem(sectionIndex, itemIndex)}
                    >
                      კერძის წაშლა
                    </button>
                  </div>
                </li>
                )}
                </Draggable>
                :
                <Draggable
                draggableId={item.id}
                index={itemIndex}
                key={item.id}
              >
                {(provided) => (
                          <li
                          className={`menu-section1 ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={itemIndex}
                          >
                            <div style={{ display: 'inline-block', position: 'relative',       marginLeft:'5px', marginBottom:'5px'}}>
  <input
    style={{
      width: '20px',
      height: '20px',
      margin: 0,
      padding: 0,
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
    }}
    type="checkbox"
    onChange={() => toggleItemSelection(section, item)}

    defaultChecked={!selectedItems.some(
                          (selectedItem) =>
                            selectedItem.name === item.name && selectedItem.title === section.title
                        )}
    />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: !selectedItems.some(
                          (selectedItem) =>
                            selectedItem.name === item.name && selectedItem.title === section.title
                        ) ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {!selectedItems.some(
                          (selectedItem) =>
                            selectedItem.name === item.name && selectedItem.title === section.title
                        ) && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>

                  {/* <input
                        type="checkbox"
                        onChange={() => toggleItemSelection(section, item)}
                        checked={!selectedItems.some(
                          (selectedItem) =>
                            selectedItem.name === item.name && selectedItem.title === section.title
                        )}
                      /> */}
                  <div className="menu-item">
                  <label  htmlFor={`dishName-${sectionIndex}-${itemIndex}`}>კერძის სახელი:</label>

                    <input
                      type="text"
                      placeholder="Dish Name"
                      value={item.name}
                      disabled={true}
                    />
                    {simpleErrors[`itemName${sectionIndex}-${itemIndex}`] && 
                      <div className="error-message">
                        Dish Name is required
                      </div>
                    }
                      <input
                        type="text"
                        placeholder="კერძის ქართული სახელი"
                        value={item.georgianName}
                        disabled={true}
                        id={`georgianDishName-${sectionIndex}-${itemIndex}`}
                      />
                    {simpleErrors[`itemGeorgianName${sectionIndex}-${itemIndex}`] && 
                      <div className="error-message">
                          Georgian Dish Name is required
                      </div>
                    }
                    
                     <label  htmlFor={`DishPrice-${sectionIndex}-${itemIndex}`}>კერძის ფასი:</label>

                    <input
                      type="number"
                      placeholder="Dish Price"
                      value={item.price}
                      disabled={true}
                    />
                    {simpleErrors[`itemPrice${sectionIndex}-${itemIndex}`] && 
                      <div className="error-message">
                        Dish Price is required
                      </div>
                    }
                    <label  htmlFor={`DishDescription-${sectionIndex}-${itemIndex}`}>კერძის ინგლისური აღწერა:</label>

                  <textarea className="menuTextArea"
  placeholder="Dish Description"
  value={item.description}
  disabled={true}
/>
{simpleErrors[`itemDescription${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Dish Description is required
  </div>
}
<label  htmlFor={`GeorgianDishDescription-${sectionIndex}-${itemIndex}`}>კერძის აღწერა ქართულად:</label>

<textarea className="menuTextArea"
  placeholder="კერძის აღწერა ქართულად"
  value={item.georgianDescription}
  id={`GeorgianDishDescription-${sectionIndex}-${itemIndex}`}
  disabled={true}
/>
{simpleErrors[`itemGeorgianDescription${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Georgian Dish Description is required
  </div>
}
<label  htmlFor={`ingredients-${sectionIndex}-${itemIndex}`}>ინგრედიენტები ინგლისურად:</label>

                    <Select
                        isMulti
                        value={item.ingredients}
                        options={item.ingredients}
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
                        id={`ingredients-${sectionIndex}-${itemIndex}`}

                        isDisabled
                      />


{/* <textarea className="menuTextArea"
  placeholder="Ingredients"
  value={item.ingredients}
  disabled={true}
  style={{ width: '100%', height: "60px" }} // You can adjust the width and height as needed
/> */}
{simpleErrors[`itemIngredients${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Ingredients are required
  </div>
}
<label  htmlFor={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}>ინგრედიენტები ქართულად:</label>

<Select
                        isMulti
                        value={item.georgianIngredients}
                        options={item.georgianIngredients}
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
                        id={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}

                        isDisabled
                      />
{/* <textarea className="menuTextArea"
  placeholder="ინგრედიენტები ქართულად"
  value={item.georgianIngredients}
  id={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}
  style={{ width: "100%", height: "60px" }}
  disabled={true}
/> */}
{simpleErrors[`itemGeorgianIngredients${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Georgian Ingredients are required
  </div>
}
      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
      <label  htmlFor={`image-${sectionIndex}-${itemIndex}`}>კერძის ფოტო:</label>

      <img style={{width:'30px',height:'30px', borderRadius:'20px'}} src={item.image} alt={item.name} />

      </div>
        
                    
                  </div>
                </li>
                )}
                </Draggable>
              ))}
            </ul>
            <button
              className="add-item-button"
              onClick={() => addMenuItem(sectionIndex)}
            >
              Add Dish
            </button>

            {isThereAnySelectedLeft(section) ? null : (
          <button
            className="delete-section-button"
            onClick={() => deleteMenuSection(sectionIndex)}
          >
            Delete Section
          </button>
        )}
            {combinedErrors[`sectionTitle${sectionIndex}`] && (
              <div className="error-message2">
                {combinedErrors[`sectionTitle${sectionIndex}`]}
              </div>
            )}
            {combinedErrors[`sectionGeorgianTitle${sectionIndex}`] && (
              <div className="error-message2">
                {combinedErrors[`sectionGeorgianTitle${sectionIndex}`]}
              </div>
            )}
            {combinedErrors[`sectionItems${sectionIndex}`] && (
              <div className="error-message2">
                {combinedErrors[`sectionItems${sectionIndex}`]}
              </div>
            )}
            
          </div>
          </div>

          )}
          </Droppable>
        ))}
        </DragDropContext>
       
      </div>
      </div>

      
      <div className='footerMenu'>
  <h3 >powered by MIKITANI</h3>
  <h3>2024</h3>
  
      </div>
    </div>
  );
};
