import React, { useEffect, useState } from "react";
import "./lastStep.css";

const ParentMenu = ({ menuData, handleMoveSelectedItems,parentMenu, setParentMenu,setMenuData }) => {
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
  
    setParentMenu(updatedParentMenu);
  }, [selectedItems]);
  
  // Use another useEffect to log the updated parentMenu


  // useEffect(() => {
  //  console.log(filterMenuData(menuData, parentMenu));
  // }, [parentMenu]);
  

  
  

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
    handleMoveSelectedItems(selectedItems, selectedSections);
    // console.log(menuData)
  };

  return (
    <div className="last-step">
      <div style={{left:'10%'}}  className="menu-flex">
        <span onClick={() => submit()}>Move Selected</span>

        <div className="menu-grid">
          {menuData.map((section, sectionIndex) => (
            <div className="menu-section" key={sectionIndex}>
              <h3>
                <input
                  type="checkbox"
                  onChange={() => toggleSectionSelection(section)}
                  checked={isSectionInSelectedSections(section)}
                />
                {section.title}
              </h3>
              <ul className="ul-last">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <div className="menu-item">
                      <input
                        type="checkbox"
                        onChange={() => toggleItemSelection(section, item)}
                        checked={selectedItems.some(
                          (selectedItem) =>
                            selectedItem.name === item.name && selectedItem.title === section.title
                        )}
                      />
                      <h4>{item.name}</h4>
                      <p>Price: {item.price}</p>
                      <p>Description: {item.description}</p>
                      <p>Ingredients: {item.ingredients}</p>
                      <img src={item.image} alt={item.name} />
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
