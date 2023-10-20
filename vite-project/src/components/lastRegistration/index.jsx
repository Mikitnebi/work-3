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


export const LastRegistration = function () {
    const navigate = useNavigate();

    // const [selectedSections, setSelectedSections] = useState([]);
    // const [selectedItems, setSelectedItems] = useState([]);

    const [isChecked,setIsChecked] = useState(false);
    const [step, setStep] = useState(1);
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

    return (
        <section className='last-registration'>
            <button className='button-x-last' onClick={(e) => navigate("..")} ><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button>
          
           {
            !isChecked ? <FinalChecker setCheck={setIsChecked}/> : <><div>
            {step === 1 && (
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
            )}
            {step === 3 && (
              <Tables
                formData={formData}
                handleChange={handleChange}
                prevStep={prevStep}
                nextStep={nextStep}

              />
            )}
             {step === 4 && (
              <LastStep
                formData={formData}
                handleChange={handleChange}
                prevStep={prevStep}
                nextStep={nextStep}
                isParent={isParent}
                setIsParent={setIsParent}
                open={setIsOpenParentMenu}
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
            )}
      
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