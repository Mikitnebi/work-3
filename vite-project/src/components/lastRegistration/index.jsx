import { Navigate, useNavigate } from 'react-router-dom'
import './last.css'
import { FinalChecker } from '../finalChecker';
import { useState } from 'react';
import { Steps } from '../steps';
import { FirstStep } from '../firstStep';
import { LastStep } from '../lastStep';
import { Tables } from '../addTables';
import { Details } from '../restaurantDetails';
import ImagesInput from '../imagesInput/imagesInput';
import ParentMenuModal from '../modals/parentMenuModal';
import ParentMenu from '../lastStep/parentMenu';
import { v4 as uuidv4 } from 'uuid';


export const LastRegistration = function () {
    const navigate = useNavigate();
    const [isParent1, setIsParent1 ] = useState(false)

    // const [selectedSections, setSelectedSections] = useState([]);
    // const [selectedItems, setSelectedItems] = useState([]);

    const [isChecked,setIsChecked] = useState(false);
    const [step, setStep] = useState(3);
    const [formData, setFormData] = useState({
      restaurantName: "",
      restaurantDescription: "",
      images: ["", "", ""],
      restaurantLocation: "",
      // Add additional fields for the second step here
    });
    const nextStep = () => {
        setStep(step + 1);
      };
    
      const prevStep = () => {
        setStep(step - 1);
      };
    
      const handleChange = (field, value) => {
        setFormData({
          ...formData,
          [field]: value,
        });
      };
      const [isParent,setIsParent] = useState(false)

      const [isOpenParentMenu,setIsOpenParentMenu] = useState(false)
    
      // const onSelectionChange = (selectedSections, selectedItems) => {
      //   setSelectedSections(selectedSections);
      //   setSelectedItems(selectedItems);
      // };
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

    return (

        <section className='last-registration'>
            <button className='button-x-last' onClick={(e) => navigate("/home")} ><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button>
          
           {
            !isChecked ? <FinalChecker setCheck={setIsChecked}/> : <><div>
            {/* {step === 1 && (
              <FirstStep
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
              />
            )}
            {step === 2 && (
              <ImagesInput
                prevStep={prevStep}
                nextStep={nextStep}
              />
            )} */}
            {step === 3 && (
              <Tables
                formData={formData}
                handleChange={handleChange}
                prevStep={prevStep}
                nextStep={nextStep}

              />
            )}
             {/* {step === 4 && (
              <LastStep
                formData={formData}
                handleChange={handleChange}
                prevStep={prevStep}
                nextStep={nextStep}
                isParent={isParent}
                setIsParent={setIsParent}
                open={setIsOpenParentMenu}
                isParent1={isParent1}
                setIsParent1={setIsParent1}
                menuData={menuData}
                setMenuData={setMenuData}
                // selectedSections={selectedSections}
                // setSelectedSections={setSelectedSections}
                // selectedItems={selectedItems}
                // setSelectedItems={setSelectedItems}
                // onSelectionChange={onSelectionChange}
              />
            )}
            {step === 5 && (
              <Details
              formData={formData}
              handleChange={handleChange}
              prevStep={prevStep}
              nextStep={nextStep}
            />
            )} */}
      
            {/* {step < 2 && (
              <button onClick={nextStep}>Next</button>
            )}
            {step === 2 && (
              <button onClick={prevStep}>Previous</button>
            )} */}
      
            {/* You can add more navigation buttons and logic as needed */}
          </div></>
           }  
        </section>
    )
}