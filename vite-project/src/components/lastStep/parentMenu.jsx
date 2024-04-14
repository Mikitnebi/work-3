import React, { useEffect, useState } from "react";
import "./lastStep.css";
import Select from 'react-select';

const ParentMenu = ({ menuData, handleMoveSelectedItems,parentMenu, setParentMenu,setMenuData,handleMoveSelectedItems2 }) => {
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);


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
  let updatedMenuData = menuData ;

  const onSelectionChange = (selectedSections) => {
    setSelectedSections(selectedSections);
  };
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
          georgianTitle: section.georgianTitle,
          parent: true
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
        return [...prevSelectedItems, { ...item,georgianTitle:section.georgianTitle, title: section.title, parent: true }];
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

  
  useEffect(() => {
    const updatedParentMenu = [];
  
    // Group selected items by title
    selectedItems.forEach((selectedItem) => {
      const {georgianTitle, title, ...itemInfo } = selectedItem;


      // Check if there is an entry with the same title
      const sectionEntry = updatedParentMenu.find((entry) => entry.title === title);
  
      if (sectionEntry) {
        // Add itemInfo to the existing section entry
        sectionEntry.items.push(itemInfo);
      } else {
        // Create a new section entry
        updatedParentMenu.push({ parent: true,georgianTitle,title, items: [itemInfo] });
      }
    });
  
    setParentMenu(updatedParentMenu);
  }, [selectedItems]);
  
  // Use another useEffect to log the updated parentMenu


  useEffect(() => {
  //  console.log(filterMenuData(menuData, parentMenu));
  //  console.log(parentMenu)
   
  }, [parentMenu]);
  

  
  

  const isAllItemsInSelected = (section) => {
    return section.items.every((item) =>
      selectedItems.some(
        (selectedItem) =>
          selectedItem.name === item.name && selectedItem.title === section.title
      )
    );
  };

  const submit = () => {
    setMenuData(filterMenuData(menuData, parentMenu))
    // handleMoveSelectedItems(selectedItems, selectedSections);
    handleMoveSelectedItems2(selectedItems,selectedSections)
    // console.log(menuData)
  };

  return (
    <div className="last-step-parent">
      <div  className="menu-flex-parent">

        <button style={{fontFamily: 'YourCustomFont, sans-serif'}} className="move_parent" onClick={() => submit()}>მონიშნულის გადატანა</button>

        <div className="menu-grid-parent" style={{ marginLeft: '-12%', marginTop: '7%' }}>
          {menuData.map((section, sectionIndex) => (
            <div className="menu-section" key={sectionIndex}>
              <h3 style={{fontFamily: 'YourCustomFont, sans-serif'}}>
              <div style={{ display: 'inline-block', position: 'relative',       marginRight:'5px'}}>
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

    defaultChecked={isSectionInSelectedSections(section)}
  />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: isSectionInSelectedSections(section) ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {isSectionInSelectedSections(section) && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>

                {section.title}
              </h3>
              <h3 style={{fontFamily: 'YourCustomFont, sans-serif'}}>{section.georgianTitle}</h3>
              <ul className="ul-last">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <div className="menu-item-parent">
                    <div style={{ display: 'inline-block', position: 'relative',       marginLeft:'5px'}}>
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

    defaultChecked={selectedItems.some(
                          (selectedItem) =>
                            selectedItem.name === item.name && selectedItem.title === section.title
                        )}
  />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: selectedItems.some(
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
    {selectedItems.some(
                          (selectedItem) =>
                            selectedItem.name === item.name && selectedItem.title === section.title
                        ) && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>



                  
                      <h4 style={{fontFamily: 'YourCustomFont, sans-serif',marginBottom:'2%',marginTop:'2%'}}>{item.name}</h4>
                      <h4 style={{fontFamily: 'YourCustomFont, sans-serif',marginBottom:'2%',marginTop:'2%'}}>{item.georgianName}</h4>

                      <p style={{fontFamily: 'YourCustomFont, sans-serif',marginBottom:'2%',marginTop:'2%'}}>Price: {item.price}</p>
                      <p style={{fontFamily: 'YourCustomFont, sans-serif',marginBottom:'2%',marginTop:'2%'}}>Description: {item.description}</p>
                      <p style={{fontFamily: 'YourCustomFont, sans-serif',marginBottom:'2%',marginTop:'2%'}}>Georgian Description: {item.georgianDescription}</p>

                      {/* Rendering Ingredients and Georgian Ingredients as Select components */}
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
                            marginBottom:'2%',
                            marginTop:'2%',
                            fontFamily: 'YourCustomFont, sans-serif',
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
                        isDisabled
                      />
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
                            marginBottom:'2%',marginTop:'2%',
                            fontFamily: 'YourCustomFont, sans-serif',
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
                        isDisabled
                      />

                      <img style={{ width: '30px', height: '30px', borderRadius: '20px' }} src={"../public/jay-wennington-N_Y88TWmGwA-unsplash.jpg"} alt={item.name} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentMenu;