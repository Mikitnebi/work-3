import { NavLink, useLocation, useParams } from 'react-router-dom';
import './homePage.css';
import { limitRecipeTitle } from '../../utils';
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import RegistrationModal from "../modals/registrationModal";
import { FinalChecker } from "../finalChecker";
import ParentChecker from "../finalChecker/parentChecker";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import "../firstStep/firstStep.css";

import "../../../public/fonts/bpg_nino_mtavruli_bold.ttf"
import ParentMenu from '../lastStep/parentMenu';
import ParentMenuModal from '../modals/parentMenuModal';
import MenuManagmentDishModal from '../modals/menu-dish-managment-modal';
export default function MenuHomePage() {
    const [menuData,setMenuData] = useState ([
        {
          title: "Appetizers",
          georgianTitle:'აპეტაიზერი',
          items: [
            {id: uuidv4(), name: "Item 1",georgianName: "კერძი 1", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "sdfs",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
            {id: uuidv4(), name: "Item 2",georgianName: "კერძი 2", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "fsdfsd",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#cheese',label:"#meat"}], georgianIngredients: [{value:'#ყველი',label:"#ყველი"}]},
            {id: uuidv4(), name: "Item 3",georgianName: "კერძი 3", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "fsdfsd",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
            {id: uuidv4(), name: "Item 4",georgianName: "კერძი 4", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "fsdfsd",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
    
          ],
        },
        {
          title: "Main Courses",
          georgianTitle:'მთავარი კურსი',
          items: [
            {id: uuidv4(), name: "dish 1",georgianName: "საჭმელი 1", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "qweqw",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
            {id: uuidv4(), name: "dish 2",georgianName: "საჭმელი 2", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
            {id: uuidv4(), name: "dish 3",georgianName: "საჭმელი 3", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
            {id: uuidv4(), name: "dish 4",georgianName: "საჭმელი 4", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
            {id: uuidv4(), name: "dish 5",georgianName: "საჭმელი 5", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
            {id: uuidv4(), name: "dish 6",georgianName: "საჭმელი 6", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},

          ],
        },
        {
          title: "civebi",
          georgianTitle:'ცივები',
          items: [
            {id: uuidv4(), name: "option",georgianName: "ოფცია", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "qweqw",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
            {id: uuidv4(), name: "option 2",georgianName: "ოფცია 2", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
          ],
        },
        {
          title: "cxelebi",
          georgianTitle:"ცხელები",
          items: [
            {id: uuidv4(), name: "supe 1",georgianName: "სუპი 1", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "qweqw",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
            {id: uuidv4(), name: "supe 2",georgianName: "სუპი 2", price: 10, image: "../public/jason-leung-poI7DelFiVA-unsplash.jpg", description: "imompp",georgianDescription: "ქართული აღწერა", ingredients: [{value:'#meat',label:"#meat"}], georgianIngredients: [{value:'#ხორცი',label:"#ხორცი"}]},
          ],
        },
      
    
      ]);
      const sectionRefs = useRef({});

      const scrollToSection = (georgianTitle) => {
        const sectionRef = sectionRefs[georgianTitle];
        if (sectionRef) {
          sectionRef.scrollIntoView({ behavior: "smooth" });
        }
      };
      const [activeTitle, setActiveTitle] = useState('');

      const handleTitleClick = (georgianTitle) => {
        setActiveTitle(georgianTitle);
        const sectionIndex = menuSections.findIndex(section => section.georgianTitle === georgianTitle);
        if (sectionIndex !== -1) {
          const sectionElement = document.getElementById(`menu-section-${sectionIndex}`);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
    const isParent1 = true;
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);
    const params = useParams();
    const location = useLocation();

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

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
          // console.log(5)
  
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
    const [menuSections, setMenuSections] = useState([]);
    const [menuSections1, setMenuSections1] = useState([]);

    useEffect(() => {
        const storedMenuSections = JSON.parse(localStorage.getItem('menuSections')) || [];
        setMenuSections(storedMenuSections);
        setMenuSections1(JSON.parse(JSON.stringify(storedMenuSections))); // Clone the menuSections
    }, []);
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
    const updateMenuItemForModal = (sectionIndex, itemIndex, newItem) => {
      const newMenuSections = [...menuSections];
      newMenuSections[sectionIndex].items[itemIndex] = newItem;
      setMenuSections(newMenuSections);
  };
  
  
    const handleFinalSave = (type) => {
      // Validate fields before saving
      const isValid = validateFields();
  
      if (isValid) {
        // Perform the final save logic here
        // This function will handle all of your sections and items
        localStorage.setItem("menuSections", JSON.stringify(menuSections));
        localStorage.setItem("menuData1", JSON.stringify(menuData1));
        // For demonstration purposes, let's just log the menuSections
        console.log("Final Save Data:", menuSections);
        if(!type){
          setIsEdit(!isEdit)

        }
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
  
    // const [sectionParent1, setSectionParent1] = useState('')
  
  const[isEdit,setIsEdit] = useState(false)
  useEffect(()=>{
    console.log("menuSections", menuSections)
    console.log("menuSections1", menuSections1)

  },[menuSections])
  const [selectedItem1, setSelectedItem1] = useState({})
  const [selectedSectionIndex, setSelectedSectionIndex] = useState({})
  const [selectedItemIndex, setSelectedItemIndex] = useState({})

const handleCancel = () => {
  setIsEdit(!isEdit)
  setMenuSections(menuSections1); // Revert to the original state
};

const handleChange = () => {
  setIsEdit(!isEdit)
  // Copy the current state of menuSections to menuSections1
  setMenuSections1(JSON.parse(JSON.stringify(menuSections)));
};
console.log(menuSections)
    return (
        <div className={`homePage-container ${isOpenSideBar ? 'sidebar-open' : 'sidebar-closed'}`}>
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

            <div className='content-container'>
            <MenuManagmentDishModal menuSections={menuSections} setMenuSections={setMenuSections} handleFinalSave={handleFinalSave} simpleErrors={simpleErrors} updateMenuItemForModal={updateMenuItemForModal} selectedItemIndex={selectedItemIndex} selectedSectionIndex={selectedSectionIndex} setSelectedItem1={setSelectedItem1}  selectedItem1={selectedItem1} open={isOpenRegistration} onClose={() => setIsOpenRegistration(false)}/>


                {
                    isEdit ?
                    <div className='menu-managment-buttons1' >
                    {
                        isParent1 ? 
                        < >
                         <button className='mshobeli' style={{fontFamily: 'YourCustomFont, sans-serif'}}  onClick={() => setIsOpenParentMenu(true)}>
                          მშობელი ფილიალის მენიუ
                          <ion-icon name="home-outline"></ion-icon>
                          </button>
                       
                         <button style={{fontFamily: 'YourCustomFont, sans-serif'}}    onClick={addMenuSection}>
                           სექციის დამატება
                           <ion-icon name="add-outline"></ion-icon>
                         </button>
                               
                         <button className='mshobeli' style={{fontFamily: 'YourCustomFont, sans-serif'}}     onClick={()=>submit()}>
                         კერძის / სექციის დაბრუნება 
                         <ion-icon name="arrow-undo-outline"></ion-icon>
                         </button>
                            </>  
                             :
  <button  onClick={addMenuSection} style={{fontFamily: 'YourCustomFont, sans-serif'}}  >
    სექციის დამატება
    <ion-icon name="add-outline"></ion-icon>

  </button>    

                    }
                    <button onClick={handleCancel} style={{fontFamily: 'YourCustomFont, sans-serif'}}  >
                        გამოსვლა
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                    <button onClick={()=>handleFinalSave(false)} style={{fontFamily: 'YourCustomFont, sans-serif'}}  >
                        შენახვა
                        <ion-icon name="checkmark-outline"></ion-icon>
                    </button>
                    
                    </div>
                    :
                    <div className='menu-managment-buttons1-change'>
                    <button  onClick={handleChange} style={{fontFamily: 'YourCustomFont, sans-serif'}}  >
                        შეცვლა
                        <ion-icon name="create-outline"></ion-icon>
                    </button>
                    </div>
                }

                <div className='manu-managment-titles'>
                {menuSections.map((section, sectionIndex) => (
                  <div onClick={() => {handleTitleClick(section.georgianTitle);scrollToSection(section.georgianTitle)}} 
                  style={{ borderBottom: activeTitle === section.georgianTitle ? '1.5px solid #58121D' : '',fontFamily: 'YourCustomFont, sans-serif' }}>
                    {
                      section?.georgianTitle
                    }
                  </div>
                  ))}
                </div>
                    
            <div className="last-step-managment">
    
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
      {/* {
          isParent1 ? 
          <div className="menu-flex">

  <button onClick={() => setIsOpenParentMenu(true)}  className="last-step-button1">მშობელი ფილიალის მენიუ</button>

  <button className="add-section-button" onClick={addMenuSection}>
    სექციის დამატება
  </button>
        
  <button  className="add-section-button"  onClick={()=>submit()}>
  კერძის / სექციის დაბრუნება 
  </button>

      </div> :

<div className="menu-flex">

  <button className="add-section-button" onClick={addMenuSection}>
    სექციის დამატება
  </button>        
</div>

      } */}
      

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

      

      <div className="wraperMenu-managment" >
      <div className="menu-grid-managment">
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

          <div  className="menu-section-modal" ref={(ref) => (sectionRefs[section.georgianTitle] = ref)} key={sectionIndex}>

               
         
            
  
             
            

          
          {!section.parent   ?
            isThereAnySelectedLeft(section) ?
            <>
            {
              isEdit &&
<div className="sectionHead" >
              {
                isEdit && 
                <label style={{fontSize:'13px',fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`sectionTitle-${sectionIndex}`}>სექცია ინგლისურად:</label>

              }
            <input
            style={{fontFamily: 'YourCustomFont, sans-serif'}}
              type="text"
              placeholder="Section Title"
              value={section.title}
              disabled={true}
            />

            {
                isEdit && <div style={{ display: 'inline-block', position: 'relative',       marginLeft:'5px', marginBottom:'5px'}}>
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
            }


            {/* <input
                  type="checkbox"
                  onChange={() => toggleSectionSelection(section)}
                  checked={!isSectionInSelectedSections(section)}
                /> */}
            </div>
            }
            

            <div className="sectionHead" >
              {
                isEdit && 
                <label style={{fontSize:'13px',fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`GeorgianSectionTitle-${sectionIndex}`}>სექცია ქართულად:</label>

              }
            {/* <label style={{fontSize:'13px'}} htmlFor={`GeorgianSectionTitle-${sectionIndex}`}>სექცია ქართულად:</label> */}
            <input
              type="text"
              placeholder="სექცია ქართულად"
              value={section.georgianTitle}
              disabled={true}
              style={!isEdit ? {backgroundColor:'transparent',color:'black',fontFamily: 'YourCustomFont, sans-serif'} :{fontFamily: 'YourCustomFont, sans-serif'}}
            />
            </div>
            
            
              </> 
              :
              <>
              {
                isEdit && 
              <div className="sectionHead" >
                {
                  isEdit && 
                  <label style={{fontSize:'13px',fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`sectionTitle-${sectionIndex}`}>სექცია ინგლისურად:</label>

                }

              <input
              style={{fontFamily: 'YourCustomFont, sans-serif'}}
              disabled={!isEdit}
              type="text"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) =>
                updateMenuSectionTitle(sectionIndex, e.target.value)
              }
              id={`sectionTitle-${sectionIndex}`}
            />
            </div>
              }
              
            <div className="sectionHead" >
              {
                isEdit &&
                <label  style={{fontSize:'13px',fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`GeorgianSectionTitle-${sectionIndex}`}>სექცია ქართულად:</label>

              }
            <input
              disabled={!isEdit}
              style={!isEdit ? {backgroundColor:'transparent',color:'black',fontFamily: 'YourCustomFont, sans-serif',fontSize:'16px'} : {fontFamily: 'YourCustomFont, sans-serif'}}

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
            {
              isEdit && 
<div className="sectionHead" >
              {
                isEdit &&
                <label style={{fontSize:'13px',fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`sectionTitle-${sectionIndex}`}>სექცია ინგლისურად:</label>

              }

            <input
            style={{fontFamily: 'YourCustomFont, sans-serif'}}
              type="text"
              placeholder="Section Title"
              value={section.title}
              disabled={true}
            />
            {
                isEdit &&            <div style={{ display: 'inline-block', position: 'relative',       marginLeft:'5px', marginBottom:'5px'}}>
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
            }
  
            {/* <input
                  type="checkbox"
                  onChange={() => toggleSectionSelection(section)}
                  checked={!isSectionInSelectedSections(section)}
                /> */}
            </div>
            }
            

            <div className="sectionHead" >
              {
                isEdit &&
                <label style={{fontSize:'13px',fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`GeorgianSectionTitle-${sectionIndex}`}>სექცია ქართულად:</label>

              }
            <input
                          style={!isEdit ? {backgroundColor:'transparent',color:'black',fontFamily: 'YourCustomFont, sans-serif',fontSize:'16px'} : {fontFamily: 'YourCustomFont, sans-serif'}}

              type="text"
              placeholder="სექცია ქართულად"
              value={section.georgianTitle}
              disabled={true}
            />
            </div>
            
              </> 
              :
              <>
              {
                isEdit && 
                <div className="sectionHead" >
                {
                  isEdit &&
                  <label style={{fontSize:'13px',fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`sectionTitle-${sectionIndex}`}>სექცია ინგლისურად:</label>

                }

              <input
              disabled={!isEdit}
                style={{fontFamily: 'YourCustomFont, sans-serif'}}
              type="text"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) =>
                updateMenuSectionTitle(sectionIndex, e.target.value)
              }
            />
            </div>
              }
              

            <div className="sectionHead" >
              {
                isEdit &&
                <label style={{fontSize:'13px',fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`GeorgianSectionTitle-${sectionIndex}`}>სექცია ქართულად:</label>

              }
            <input   
                          style={!isEdit ? {backgroundColor:'transparent',color:'black',fontFamily: 'YourCustomFont, sans-serif',fontSize:'16px'} : {fontFamily: 'YourCustomFont, sans-serif'}}
           
              disabled={!isEdit}
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
            
            <ul className="ul-last-managment">
                {
                    !isEdit ? 
                    section.items.map((item, itemIndex) => (
             <div onClick={()=>{console.log(item),setIsOpenRegistration(true);setSelectedItem1(item);setSelectedItemIndex(itemIndex);setSelectedSectionIndex(sectionIndex);}} className='menu-item-managment'>
                <figure>
                    <img src="../../../public/first/მაგიდა2,1.0.png" alt="" />
                </figure>
                <div>
                    <h3 style={{fontFamily: 'YourCustomFont, sans-serif'}}>{item.name}</h3>
                    <h3 style={{fontFamily: 'YourCustomFont, sans-serif'}}>{`ფასი-${item.price}₾ `}</h3>
                </div>
             </div>

              )) :    
              section.items.map((item, itemIndex) => (

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
                  <label style={{fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`dishName-${sectionIndex}-${itemIndex}`}>კერძის ინგლისური სახელი:</label>

                    <input
                      type="text"
                      placeholder="კერძის ინგლისური სახელი"
                      value={item.name}
                      style={{fontFamily: 'YourCustomFont, sans-serif'}}
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
                    <label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`georgianDishName-${sectionIndex}-${itemIndex}`}>კერძის ქართული სახელი:</label>

                    <input
                    style={{fontFamily: 'YourCustomFont, sans-serif'}}
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
            <label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`DishPrice-${sectionIndex}-${itemIndex}`}>კერძის ფასი:</label>

                    <input
                    style={{fontFamily: 'YourCustomFont, sans-serif'}}
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
                    <label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`DishDescription-${sectionIndex}-${itemIndex}`}>კერძის აღწერა ინგლისურად:</label>

                  <textarea className="menuTextArea"
  placeholder="კერძის აღწერა ინგლისურად"
  value={item.description}
  style={{fontFamily: 'YourCustomFont, sans-serif'}}
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
<label  style={{fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`GeorgianDishDescription-${sectionIndex}-${itemIndex}`}>კერძის აღწერა ქართულად:</label>

<textarea className="menuTextArea"
style={{fontFamily: 'YourCustomFont, sans-serif'}}
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
<label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`ingredients-${sectionIndex}-${itemIndex}`}>ინგრედიენტები:</label>

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
           margintop: '2%',
           marginBottom: '2%',
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
            fontFamily: 'YourCustomFont, sans-serif',

          }),
          dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            color: state.isFocused ? '#8C1D2F' : '#8C1D2F', // Change the color when focused
            fontFamily: 'YourCustomFont, sans-serif',

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
<label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}>ინგრედიენტები ქართულად:</label>


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
            margintop: '2%',
            marginBottom: '2%',

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
<label  style={{fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`image-${sectionIndex}-${itemIndex}`}>კერძის ფოტო:</label>

                    <input
                    style={{fontFamily: 'YourCustomFont, sans-serif'}}
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
                      style={{fontFamily: 'YourCustomFont, sans-serif'}}
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
                    <label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`dishName-${sectionIndex}-${itemIndex}`}>კერძის სახელი:</label>
  
                      <input
                        style={{fontFamily: 'YourCustomFont, sans-serif'}}
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
                          <label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`georgianDishName-${sectionIndex}-${itemIndex}`}>კერძის ქართული სახელი:</label>

                        <input
                        style={{fontFamily: 'YourCustomFont, sans-serif'}}
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
                      
                       <label  style={{fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`DishPrice-${sectionIndex}-${itemIndex}`}>კერძის ფასი:</label>
  
                      <input
                      style={{fontFamily: 'YourCustomFont, sans-serif'}}
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
                      <label  style={{fontFamily: 'YourCustomFont, sans-serif'}} htmlFor={`DishDescription-${sectionIndex}-${itemIndex}`}>კერძის ინგლისური აღწერა:</label>
  
                    <textarea className="menuTextArea"
                    style={{fontFamily: 'YourCustomFont, sans-serif'}}
    placeholder="Dish Description"
    value={item.description}
    disabled={true}
  />
  {simpleErrors[`itemDescription${sectionIndex}-${itemIndex}`] && 
    <div className="error-message">
      Dish Description is required
    </div>
  }
  <label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`GeorgianDishDescription-${sectionIndex}-${itemIndex}`}>კერძის აღწერა ქართულად:</label>
  
  <textarea className="menuTextArea"
  style={{fontFamily: 'YourCustomFont, sans-serif'}}
    placeholder="კერძის აღწერა ქართულად"
    value={item.georgianDescription}
    id={`GeorgianDishDescription-${sectionIndex}-${itemIndex}`}
    disabled={true}
  />
  {simpleErrors[`itemGeorgianDescription${sectionIndex}-${itemIndex}`] && 
    <div  className="error-message">
      Georgian Dish Description is required
    </div>
  }
  <label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`ingredients-${sectionIndex}-${itemIndex}`}>ინგრედიენტები ინგლისურად:</label>
  
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
                              margintop: '2%',
                              marginBottom: '2%',

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
  <label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`GeorgianIngredients-${sectionIndex}-${itemIndex}`}>ინგრედიენტები ქართულად:</label>
  
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
                              margintop: '2%',
                              marginBottom: '2%',

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
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginTop:'5%'}}>
        <label style={{fontFamily: 'YourCustomFont, sans-serif'}}  htmlFor={`image-${sectionIndex}-${itemIndex}`}>კერძის ფოტო:</label>
  
        <img style={{width:'30px',height:'30px', borderRadius:'20px'}} src={"../public/jay-wennington-N_Y88TWmGwA-unsplash.jpg"} alt={item.name} />
  
        </div>
          
                      
                    </div>
                  </li>
                  )}
                  </Draggable>
              ))
                }
              
    
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
            </ul>
           

            {
                isEdit ?
                 <div className='manu-managment-edit-buttons'>
                <button
              className="add-item-button"
              onClick={() => addMenuItem(sectionIndex)}
              style={{fontFamily: 'YourCustomFont, sans-serif'}}
            >
              კერძის დამატება
            </button>

            
            {isThereAnySelectedLeft(section) ? null : (
          <button
            className="delete-section-button"
            onClick={() => deleteMenuSection(sectionIndex)}
            style={{fontFamily: 'YourCustomFont, sans-serif'}}
          >
            სექციის წაშლა
          </button>
        )}
                </div> : null
}
        
            
          </div>
          </div>

          )}
          </Droppable>
        ))}
        </DragDropContext>
       
      </div>
      </div>

      

    </div>


            </div>
        </div>
    );
}