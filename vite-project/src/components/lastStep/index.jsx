import React, { useEffect, useState } from "react";
import "./lastStep.css";
import * as yup from "yup";
import RegistrationModal from "../modals/registrationModal";
import { FinalChecker } from "../finalChecker";
import ParentChecker from "../finalChecker/parentChecker";
import ParentMenuModal from "../modals/parentMenuModal";
import ParentMenu from "./parentMenu";

export const LastStep = function ({ chooseStep, prevStep, nextStep,isParent,setIsParent,isParent1,setIsParent1,menuData,setMenuData }) {
  const [parentMenu, setParentMenu] = useState([]);

  const [parentMenu1, setParentMenu1] = useState([]);

  const [menuData1, setMenuData1] = useState(JSON.parse(localStorage.getItem("menuData1")) || []);  

  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  
  
  const toggleSectionSelection = (section) => {
    const isAlreadySelected = isSectionInSelectedSections(section);
  
    if (isAlreadySelected) {
      // Section is already selected, uncheck it and remove its items from selectedItems
      setSelectedSections(selectedSections.filter((selected) => selected.title !== section.title));
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter(
        (selectedItem) => selectedItem.title !== section.title
      ));
    } else {
      setSelectedSections([...selectedSections, section]);

      // Filter out items that are already in selectedItems
      const newItems = section.items.filter((item) => !selectedItems.some(
        (selectedItem) =>
          selectedItem.name === item.name && selectedItem.title === section.title
      ));
  
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        ...newItems.map((item) => ({
          ...item,
          title: section.title,
        })),
      ]);
    }

  };
  
  

  const toggleItemSelection = (section, item) => {
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

  };

  const isSectionInSelectedSections = (section) => {
    return section.items.every((sectionItem) =>
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
        items: [
          { name: "Item 1", price: "$10", image: "", description: "sdfs", ingredients: "sdfsdf" },
          { name: "Item 2", price: "$12", image: "", description: "fsdfsd", ingredients: "dsfs" },
        ],
      },
      {
        title: "Main Courses",
        items: [
          { name: "Item 1", price: "$20", image: "", description: "qweqw", ingredients: "sdfsd" },
          { name: "Item 2", price: "$18", image: "", description: "imompp", ingredients: "shjfgh" },
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

    // // Add the selectedItems to the menuSections state
    // const updatedMenuSections = [...menuSections];
  
    // // Remove selected items from updatedMenuSections
    // selectedSections.forEach((selectedSection) => {
    //   const sectionIndex = updatedMenuSections.findIndex(
    //     (section) => section.title === selectedSection.title
    //   );
    //   if (sectionIndex !== -1) {
    //     const section = updatedMenuSections[sectionIndex];
    //     const updatedItems = section.items.filter(
    //       (item) =>
    //         !selectedItems.some(
    //           (selectedItem) =>
    //             selectedItem.name === item.name && selectedItem.sectionTitle === section.title
    //         )
    //     );
    //     section.items = updatedItems;
    //     if (updatedItems.length === 0) {
    //       updatedMenuSections.splice(sectionIndex, 1); // Remove the section if no items are left
    //     }
    //   }
    // });
  
    // setMenuSections(updatedMenuSections);
  
    // // Update the menuData to reflect the removed items and sections
    // const updatedMenuData = menuData.map((section) => {
    //   const updatedSection = { ...section };
    //   const updatedItems = section.items.filter(
    //     (item) =>
    //       !selectedItems.some(
    //         (selectedItem) =>
    //           selectedItem.name === item.name && selectedItem.sectionTitle === section.title
    //       )
    //   );
    //   if (updatedItems.length > 0) {
    //     updatedSection.items = updatedItems;
    //   }
    //   return updatedSection;
    // });
  
    // // Update the menuData state
    // setMenuData(updatedMenuData);
    // // console.log(menuSections)
    // console.log(selectedItems)



  useEffect(() => {
    const updatedParentMenu = [];
  
    // Group selected items by title
    selectedItems.forEach((selectedItem) => {
      const { title, ...itemInfo } = selectedItem;
  
      // Check if there is an entry with the same title
      const sectionEntry = updatedParentMenu.find((entry) => entry.title === title);
  
      if (sectionEntry) {
        // Add itemInfo to the existing section entry
        sectionEntry.items.push(itemInfo);
      } else {
        // Create a new section entry
        updatedParentMenu.push({ title, items: [itemInfo] });
      }
    });
  
    setParentMenu1(updatedParentMenu);
  }, [selectedItems]);


  const handleSelectionChange = (selectedSections, selectedItems) => {
    // Remove selected sections and items from the menuSections
    const updatedSections = menuSections.map((section) => {
      return {
        ...section,
        items: section.items.filter((item) => !selectedItems.includes(item)),
      };
    });

    // Only keep sections that were not selected
    const filteredSections = updatedSections.filter((section) => !selectedSections.includes(section));

    setMenuSections(filteredSections);
  };


  const [combinedErrors, setCombinedErrors] = useState({}); // Detailed errors for combined-errors section
  const [simpleErrors, setSimpleErrors] = useState({}); // Simple errors for menu-grid



  const addMenuSection = () => {
    const newMenuSections = [...menuSections, { title: "", items: [] }];
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

  const addMenuItem = (index) => {
    const newMenuSections = [...menuSections];
    newMenuSections[index].items.push({ name: "", price: "", image: "", description: "", ingredients: "" });
    setMenuSections(newMenuSections);
  };

  const addMenuItem1 = (index) => {
    const newMenuSections = [...menuData1];
    newMenuSections[index].items.push({ name: "", price: "", image: "", description: "", ingredients: "" });
    setMenuData1(newMenuSections);
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
      nextStep();
    }
  };

  const validateFields = () => {
    const newCombinedErrors = {}; // Store detailed validation errors for combined-errors section
    const newSimpleErrors = {}; // Store simple validation errors for menu-grid

    // Validate sections
    menuSections.forEach((section, sectionIndex) => {
      if (!section.title) {
        newCombinedErrors[`sectionTitle${sectionIndex}`] = `Section ${sectionIndex + 1} Title is required`;
      }

      section.items.forEach((item, itemIndex) => {
        if (!item.name) {
          newSimpleErrors[`itemName${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemName${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Name is required`;
        }
        if (!item.price) {
          newSimpleErrors[`itemPrice${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemPrice${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Price is required`;
        }
        if (!item.image) {
          newSimpleErrors[`itemImage${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemImage${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Image is required`;
        }
        if (!item.description) {
          newSimpleErrors[`itemDescription${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemDescription${sectionIndex}-${itemIndex}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Dish Description is required`;
        }
        if (!item.ingredients) {
          newSimpleErrors[`itemIngredients${sectionIndex}-${itemIndex}`] = true;
          newCombinedErrors[`itemIngredients${sectionIndex}-${itemIndex}}`] = `Section ${sectionIndex + 1}, Item ${itemIndex + 1}: Ingredients are required`;
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


  useEffect(()=>{
    console.log(menuData1)
    // console.log(parentMenu1)s
  },[menuData1])

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
    setMenuData1(filterMenuData(menuData1, parentMenu1))
    deleteParentMenuItems()
    deleteParentMenuSections()
    handleMoveSelectedItems1(selectedItems,selectedSections)
    // handleMoveSelectedItems(selectedItems, selectedSections);
    // console.log(menuData)
  };

  return (

    !isParent ? 
      
    <div style={{position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)'}}>
        
       { 
       !isOpenRegistration ?
      <div >
        Do your restaurant have parent restaurant? 
        
        <span onClick={()=>{setIsOpenRegistration(true);setIsParent1(true)}}  style={{cursor:'pointer',fontSize:'18px',color:"#0ad60a", marginLeft:'10px'}}>Yes</span> 
        <span onClick={() => {setIsParent(true); setIsParent1(false)}} style={{cursor:'pointer',fontSize:'18px',color:'red', marginLeft:'10px'}}>No</span>  
      </div>
      : 
      <ParentChecker   setIsParent={setIsParent}/>
        }
    </div> 
      
    :

    <div className="last-step">
      <div className="menu-flex">

        {
          isParent1 ?
            <button onClick={() => setIsOpenParentMenu(true)}  style={{marginRight:'10px',position:'absolute',left:'-30%',backgroundColor:'purple'}} className="last-step-button1">Parent Menu</button>
            :
            <></>
        }

        <ParentMenuModal open={isOpenParentMenu} onClose={() => setIsOpenParentMenu(false)}>
              <ParentMenu 
              handleMoveSelectedItems={handleMoveSelectedItems}
              parentMenu={parentMenu}
              setMenuData={setMenuData}
              setParentMenu={setParentMenu} 
              // selectedSections={selectedSections}
              //   setSelectedSections={setSelectedSections}
              //   selectedItems={selectedItems}
              //   setSelectedItems={setSelectedItems}
              //   onSelectionChange={onSelectionChange}
   menuData={menuData} close={ setIsOpenParentMenu }/>
            </ParentMenuModal>

        <button className="last-step-button1" onClick={(e) => prevStep()}>
          Back
        </button>
        <button className="add-section-button" onClick={addMenuSection}>
          Add Menu Section
        </button>
        <button
          className="save-button"
          onClick={() => {
            // Save to localStorage when the user clicks "Save"
            localStorage.setItem("menuSections", JSON.stringify(menuSections));
            alert("Menu sections and items saved!");
          }}
        >
          Save
        </button>
        <button className="final-save-button1" onClick={(e) => nextStep()}>
          Next
        </button>
        <button className="final-save-button" onClick={(e) => {
          handleFinalSave();
          localStorage.setItem("menuSections", JSON.stringify(menuSections));
          localStorage.setItem("menuData1", JSON.stringify(menuData1));

        }}>
          Final Save
        </button>
        <button style={{position:'absolute',right:'-20%'}}  className="final-save-button"  onClick={()=>submit()}>
        Return 
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

      <div className="menu-grid">
        {menuSections.map((section, sectionIndex) => (
          <div className="menu-section" key={sectionIndex}>
            <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) =>
                updateMenuSectionTitle(sectionIndex, e.target.value)
              }
            />
            <ul className="ul-last">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <div className="menu-item">
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
                    />
                    {simpleErrors[`itemName${sectionIndex}-${itemIndex}`] && 
                      <div className="error-message">
                        Dish Name is required
                      </div>
                    }
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
                    />
                    {simpleErrors[`itemPrice${sectionIndex}-${itemIndex}`] && 
                      <div className="error-message">
                        Dish Price is required
                      </div>
                    }
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
  style={{ width: "100%", height: "60px" }} // You can adjust the width and height as needed
/>
{simpleErrors[`itemDescription${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Dish Description is required
  </div>
}

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
  style={{ width: '100%', height: "60px" }} // You can adjust the width and height as needed
/>
{simpleErrors[`itemIngredients${sectionIndex}-${itemIndex}`] && 
  <div className="error-message">
    Ingredients are required
  </div>
}
                    <input
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
              ))}
            </ul>
            <button
              className="add-item-button"
              onClick={() => addMenuItem(sectionIndex)}
            >
              Add Dish
            </button>
            <button
              className="delete-section-button"
              onClick={() => deleteMenuSection(sectionIndex)}
            >
              Delete Section
            </button>
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
        ))}
        {menuData1.map((section, sectionIndex) => (
          <div className="menu-section" key={sectionIndex}>
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
            <ul className="ul-last">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <input
                        type="checkbox"
                        onChange={() => toggleItemSelection(section, item)}
                        checked={!selectedItems.some(
                          (selectedItem) =>
                            selectedItem.name === item.name && selectedItem.title === section.title
                        )}
                      />
                  <div className="menu-item">
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
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif"
                      disabled={true}
                    />
                    {simpleErrors[`itemImage${sectionIndex}-${itemIndex}`] && 
                      <div className="error-message">Dish Image is required</div>
                    }
                    
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="add-item-button"
              onClick={() => addMenuItem1(sectionIndex)}
            >
              Add Dish
            </button>
            
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
        ))}
      </div>
    </div>
  );
};
