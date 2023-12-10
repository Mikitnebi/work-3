import React, { useContext, useEffect, useState } from "react";
import "./lastStep1.css";
import * as yup from "yup";
import RegistrationModal from "../modals/registrationModal";
import { FinalChecker } from "../finalChecker";
import ParentChecker from "../finalChecker/parentChecker";
import ParentMenuModal from "../modals/parentMenuModal";
import ParentMenu from "./parentMenu";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import { StoreContextRecipe } from "../../App";

export const LastStep1 = function ({ chooseStep, prevStep, nextStep,isParent,setIsParent,isParent1,setIsParent1 }) {
  const [parentMenu, setParentMenu] = useState([]);
  const [menuData,setMenuData] = useState ([
    {
      title: "Appetizers",
      georgianTitle:'აპეტაიზერი',
      items: [
        {id: uuidv4(), name: "Item 1",georgianName: "კერძი 1", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "sdfs",georgianDescription: "ქართული აღწერა", ingredients: "sdfsdf", georgianIngredients: "ქართული ინგრედიენტები"},
        {id: uuidv4(), name: "Item 2",georgianName: "კერძი 2", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "fsdfsd",georgianDescription: "ქართული აღწერა", ingredients: "dsfs", georgianIngredients: "ქართული ინგრედიენტები"},
        {id: uuidv4(), name: "Item 3",georgianName: "კერძი 3", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "fsdfsd",georgianDescription: "ქართული აღწერა", ingredients: "dsfs", georgianIngredients: "ქართული ინგრედიენტები"},
        {id: uuidv4(), name: "Item 4",georgianName: "კერძი 4", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "fsdfsd",georgianDescription: "ქართული აღწერა", ingredients: "dsfs", georgianIngredients: "ქართული ინგრედიენტები"},

      ],
    },
    {
      title: "Main Courses",
      georgianTitle:'მთავარი კურსი',
      items: [
        {id: uuidv4(), name: "dish 1",georgianName: "საჭმელი 1", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "qweqw",georgianDescription: "ქართული აღწერა", ingredients: "sdfsd", georgianIngredients: "ქართული ინგრედიენტები"},
        {id: uuidv4(), name: "dish 2",georgianName: "საჭმელი 2", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: "shjfgh", georgianIngredients: "ქართული ინგრედიენტები"},
        {id: uuidv4(), name: "dish 3",georgianName: "საჭმელი 3", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: "shjfgh", georgianIngredients: "ქართული ინგრედიენტები"},
        {id: uuidv4(), name: "dish 4",georgianName: "საჭმელი 4", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: "shjfgh", georgianIngredients: "ქართული ინგრედიენტები"},

      ],
    },
    {
      title: "civebi",
      georgianTitle:'ცივები',
      items: [
        {id: uuidv4(), name: "option 1",georgianName: "ოფცია 1", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "qweqw",georgianDescription: "ქართული აღწერა", ingredients: "sdfsd", georgianIngredients: "ქართული ინგრედიენტები"},
        {id: uuidv4(), name: "option 2",georgianName: "ოფცია 2", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: "shjfgh", georgianIngredients: "ქართული ინგრედიენტები"},
      ],
    },
    {
      title: "cxelebi",
      georgianTitle:"ცხელები",
      items: [
        {id: uuidv4(), name: "supe 1",georgianName: "სუპი 1", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "qweqw",georgianDescription: "ქართული აღწერა", ingredients: "sdfsd", georgianIngredients: "ქართული ინგრედიენტები"},
        {id: uuidv4(), name: "supe 2",georgianName: "სუპი 2", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: "shjfgh", georgianIngredients: "ქართული ინგრედიენტები"},
      ],
    },
  

  ]);
  const [parentMenu1, setParentMenu1] = useState([]);
  const { isSearchVisible, setIsSearchVisible,stateRestaurant, dispatchRestaurant,stateUser, dispatchUser, stateRecipe, dispatchRecipe } = useContext(StoreContextRecipe);

  const [menuData1, setMenuData1] = useState(JSON.parse(localStorage.getItem("menuData1")) || []);  

  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const [draggedItemId, setDraggedItemId] = useState(null);

 
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
  
  
  

  // const onDragEnd = (result) => {
  //   if (!result.destination) {
  //     return; // Dropped outside the list
  //   }

  //   const { source, destination, draggableId } = result;
  //   const updatedMenuSections = [...menuSections];

  //   // Find the source and destination sections
  //   const sourceSection = updatedMenuSections[source.droppableId];
  //   const destSection = updatedMenuSections[destination.droppableId];

  //   // Find the item being dragged
  //   const item = sourceSection.items.find((item) => item.id === draggableId);

  //   // Remove the item from the source section
     
  //   sourceSection.items.splice(source.index, 1);

  //   // Insert the item into the destination section
  //   destSection.items.splice(destination.index, 0, item);

  //   // Update the state with the reordered sections
  //   setMenuSections(updatedMenuSections);
  // };

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
        georgianTitle: "Appetizers",
        items: [
          {
            id: uuidv4(),
            name: "Item 1",
            georgianName: "Georgian Item 1", // Add Georgian Dish Name
            price: "$10",
            image: "",
            description: "sdfs",
            georgianDescription: "Georgian Description 1", // Add Georgian Dish Description
            ingredients: "sdfsdf",
            georgianIngredients: "Georgian Ingredients 1", // Add Georgian Ingredients
          },
          {
            id: uuidv4(),
            name: "Item 2",
            georgianName: "Georgian Item 2", // Add Georgian Dish Name
            price: "$12",
            image: "",
            description: "fsdfsd",
            georgianDescription: "Georgian Description 2", // Add Georgian Dish Description
            ingredients: "dsfs",
            georgianIngredients: "Georgian Ingredients 2", // Add Georgian Ingredients
          },
        ],
      },
      {
        title: "Main Courses",
        georgianTitle: "Appetizers",
        items: [
          {
            id: uuidv4(),
            name: "Item 1",
            georgianName: "Georgian Item 1", // Add Georgian Dish Name
            price: "$20",
            image: "",
            description: "qweqw",
            georgianDescription: "Georgian Description 1", // Add Georgian Dish Description
            ingredients: "sdfsd",
            georgianIngredients: "Georgian Ingredients 1", // Add Georgian Ingredients
          },
          {
            id: uuidv4(),
            name: "Item 2",
            georgianName: "Georgian Item 2", // Add Georgian Dish Name
            price: "$18",
            image: "",
            description: "imompp",
            georgianDescription: "Georgian Description 2", // Add Georgian Dish Description
            ingredients: "shjfgh",
            georgianIngredients: "Georgian Ingredients 2", // Add Georgian Ingredients
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
        updatedMenuSections.push({parent:section.parent, title: section.title, items: section.items });

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
      ingredients: "",
      georgianIngredients: "",
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

      // For demonstration purposes, let's just log the menuSections
      console.log("Final Save Data:", menuSections);
    }
  };

  const validateFields = () => {
    const newCombinedErrors = {}; // Store detailed validation errors for combined-errors section
    const newSimpleErrors = {}; // Store simple validation errors for menu-grid
  
    const georgianLettersRegex = /^[\u10A0-\u10FF]+$/; // Regular expression for Georgian letters
    const englishLettersRegex = /^[A-Za-z]+$/; // Regular expression for English letters
  
    // Validate sections
    menuSections.forEach((section, sectionIndex) => {
      if (!section.title || !englishLettersRegex.test(section.title)) {
        newCombinedErrors[`sectionTitle${sectionIndex}`] = `Section ${sectionIndex + 1} Title is required and must contain only English letters`;
      }
      if (!section.georgianTitle || !georgianLettersRegex.test(section.georgianTitle)) {
        newCombinedErrors[`sectionGeorgianTitle${sectionIndex}`] = `Section ${sectionIndex + 1} Georgian Title is required and must contain only Georgian letters`;
      }
  
      section.items.forEach((item, itemIndex) => {
        if (!item.name || !englishLettersRegex.test(item.name)) {
          newSimpleErrors[`itemName${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemName${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Name is required and must contain only English letters`;
        }
  
        if (!item.price || isNaN(item.price)) {
          newSimpleErrors[`itemPrice${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemPrice${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Price is required and must be a valid number`;
        }
  
        if (!item.image) {
          newSimpleErrors[`itemImage${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemImage${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Image is required`;
        }
  
        if (!item.description || !englishLettersRegex.test(item.description)) {
          newSimpleErrors[`itemDescription${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemDescription${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Description is required and must contain only English letters`;
        }
  
        if (!item.ingredients || !englishLettersRegex.test(item.ingredients)) {
          newSimpleErrors[`itemIngredients${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemIngredients${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Ingredients are required and must contain only English letters`;
        }
  
        if (!item.georgianName || !georgianLettersRegex.test(item.georgianName)) {
          newSimpleErrors[`itemGeorgianName${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemGeorgianName${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Georgian Dish Name is required and must contain only Georgian letters`;
        }
  
        if (!item.georgianIngredients || !georgianLettersRegex.test(item.georgianIngredients)) {
          newSimpleErrors[`itemGeorgianIngredients${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemGeorgianIngredients${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Georgian Ingredients are required and must contain only Georgian letters`;
        }
  
        if (!item.georgianDescription || !georgianLettersRegex.test(item.georgianDescription)) {
          newSimpleErrors[`itemGeorgianDescription${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemGeorgianDescription${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Georgian Dish Description is required and must contain only Georgian letters`;
        }
      });
  
      // Check if there are no items in a section
      if (section.items.length === 0) {
        newCombinedErrors[`sectionItems${sectionIndex}`] = `Section ${sectionIndex + 1} must have at least one item`;
      }
    });
  
    // Set validation errors
    setCombinedErrors(newCombinedErrors);
    setSimpleErrors(newSimpleErrors);
  
    // Check if there are any errors
    return Object.keys(newCombinedErrors).length === 0;
  };
  

  const [isOpenRegistration, setIsOpenRegistration] = useState(false)
  const [isOpenParentMenu,setIsOpenParentMenu] = useState(false)


  // useEffect(()=>{
  //   console.log(selectedItems)
  //   console.log(selectedSections)
  //   console.log(parentMenu1)

  // },[selectedItems,selectedSections,parentMenu1])

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


    <div className="last-step1">
      <div style={{  display: 'flex' , justifyContent: 'space-evenly',width: '60%',marginLeft:"10%" }}>

        {
          stateRestaurant.parent ?
          <>
            <button onClick={() => setIsOpenParentMenu(true)}  style={{marginRight:'10px',backgroundColor:'purple'}} className="last-step-button1">Parent Menu</button>
            <button  className="final-save-button"  onClick={()=>submit()}>
        Return 
        </button>
          </>
            :
            <></>
        }

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

       
        <button className="add-section-button" onClick={addMenuSection}>
          Add Menu Section
        </button>
        {/* <button
          className="save-button"
          onClick={() => {
            // Save to localStorage when the user clicks "Save"
            localStorage.setItem("menuSections", JSON.stringify(menuSections));
            alert("Menu sections and items saved!");
          }}
        >
          Save
        </button> */}
        {/* <button className="final-save-button1" onClick={(e) => nextStep()}>
          Next
        </button> */}
        <button className="final-save-button" onClick={(e) => {
          handleFinalSave();
          localStorage.setItem("menuSections", JSON.stringify(menuSections));
          localStorage.setItem("menuData1", JSON.stringify(menuData1));
        }}>
          Save Changes
        </button>
        
     
      </div>

      {/* Display combined-errors */}
      {Object.keys(combinedErrors).length > 0 && (
        <div className="combined-errors">
          {Object.values(combinedErrors).map((error, index) => (
            <div key={index} className="error-message1">
              {error}
            </div>
          ))}
        </div>
      )}

      <div className="menu-grid" style={{marginTop:'10px'}}>
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
            <div style={{marginBottom:'8px'}}>
            <label style={{fontSize:'16px'}} htmlFor={`sectionTitle-${sectionIndex}`}>Section Title:</label>
            <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              disabled={true}
            />
            <input
                  type="checkbox"
                  onChange={() => toggleSectionSelection(section)}
                  checked={!isSectionInSelectedSections(section)}
                />
            </div>

            <div style={{marginBottom:'8px'}}>
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
              <div style={{marginBottom:'8px'}}>
                <label style={{fontSize:'16px'}} htmlFor={`sectionTitle-${sectionIndex}`}>Section Title:</label>

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
            <div style={{marginBottom:'8px'}}>
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
            <div style={{marginBottom:'8px'}}>
            <label style={{fontSize:'16px'}} htmlFor={`sectionTitle-${sectionIndex}`}>Section Title:</label>

            <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              disabled={true}
            />
            <input
                  type="checkbox"
                  onChange={() => toggleSectionSelection(section)}
                  checked={!isSectionInSelectedSections(section)}
                />
            </div>

            <div style={{marginBottom:'8px'}}>
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
              <div style={{marginBottom:'8px'}}>
              <label style={{fontSize:'16px'}} htmlFor={`sectionTitle-${sectionIndex}`}>Section Title:</label>

              <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) =>
                updateMenuSectionTitle(sectionIndex, e.target.value)
              }
            />
            </div>

            <div style={{marginBottom:'8px'}}>
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
                          className={`menu-section ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={itemIndex}
                          >

                  <div className="menu-item">
                  <label htmlFor={`dishName-${sectionIndex}-${itemIndex}`}>Dish Name:</label>

                    <input
                      type="text"
                      placeholder="Dish Name"
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
                        Dish Name is required
                      </div>
                    }
                    <label htmlFor={`georgianDishName-${sectionIndex}-${itemIndex}`}>კერძის ქართული სახელი:</label>

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
    Georgian Dish Name is required
  </div>
}
            <label htmlFor={`DishPrice-${sectionIndex}-${itemIndex}`}>dish price:</label>

                    <input
                      type="number"
                      placeholder="Dish Price"
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
                        Dish Price is required
                      </div>
                    }
                    <label htmlFor={`DishDescription-${sectionIndex}-${itemIndex}`}>dish description:</label>

                  <textarea
  placeholder="Dish Description"
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
  style={{ width: "100%", height: "60px" }} // You can adjust the width and height as needed
/>
{simpleErrors[`itemDescription${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Dish Description is required
  </div>
}
<label htmlFor={`GeorgianDishDescription-${sectionIndex}-${itemIndex}`}>კერძის აღწერა ქართულად:</label>

<textarea
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
  style={{ width: "100%", height: "60px" }}
/>
{simpleErrors[`itemGeorgianDescription${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Georgian Dish Description is required
  </div>
}
<label htmlFor={`ingredients-${sectionIndex}-${itemIndex}`}>ingredients:</label>

<textarea
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
/>
{simpleErrors[`itemIngredients${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Ingredients are required
  </div>
}
<label htmlFor={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}>ინგრედიენტები ქართულად:</label>

<textarea
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
/>
{simpleErrors[`itemGeorgianIngredients${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Georgian Ingredients are required
  </div>
}
<label htmlFor={`image-${sectionIndex}-${itemIndex}`}>dish image:</label>

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
                    {simpleErrors[`itemImage${sectionIndex}-${itemIndex}`] && 
                      <div className="error-message">Dish Image is required</div>
                    }
                    <button
                      className="delete-item-button"
                      onClick={() => deleteMenuItem(sectionIndex, itemIndex)}
                    >
                      Delete Item
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
                          className={`menu-section ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={itemIndex}
                          >

                  <input
                        type="checkbox"
                        onChange={() => toggleItemSelection(section, item)}
                        checked={!selectedItems.some(
                          (selectedItem) =>
                            selectedItem.name === item.name && selectedItem.title === section.title
                        )}
                      />
                  <div className="menu-item">
                  <label htmlFor={`dishName-${sectionIndex}-${itemIndex}`}>Dish Name:</label>

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
                    
                     <label htmlFor={`DishPrice-${sectionIndex}-${itemIndex}`}>dish price:</label>

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
                    <label htmlFor={`DishDescription-${sectionIndex}-${itemIndex}`}>dish description:</label>

                  <textarea
  placeholder="Dish Description"
  value={item.description}
  disabled={true}
  style={{ width: "100%", height: "60px" }} // You can adjust the width and height as needed
/>
{simpleErrors[`itemDescription${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Dish Description is required
  </div>
}
<label htmlFor={`GeorgianDishDescription-${sectionIndex}-${itemIndex}`}>კერძის აღწერა ქართულად:</label>

<textarea
  placeholder="კერძის აღწერა ქართულად"
  value={item.georgianDescription}
  id={`GeorgianDishDescription-${sectionIndex}-${itemIndex}`}
  style={{ width: "100%", height: "60px" }}
  disabled={true}
/>
{simpleErrors[`itemGeorgianDescription${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Georgian Dish Description is required
  </div>
}
<label htmlFor={`ingredients-${sectionIndex}-${itemIndex}`}>ingredients:</label>

<textarea
  placeholder="Ingredients"
  value={item.ingredients}
  disabled={true}
  style={{ width: '100%', height: "60px" }} // You can adjust the width and height as needed
/>
{simpleErrors[`itemIngredients${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Ingredients are required
  </div>
}
<label htmlFor={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}>ინგრედიენტები ქართულად:</label>

<textarea
  placeholder="ინგრედიენტები ქართულად"
  value={item.georgianIngredients}
  id={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}
  style={{ width: "100%", height: "60px" }}
  disabled={true}
/>
{simpleErrors[`itemGeorgianIngredients${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Georgian Ingredients are required
  </div>
}
      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
      <label htmlFor={`image-${sectionIndex}-${itemIndex}`}>dish image:</label>

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
  );
};
