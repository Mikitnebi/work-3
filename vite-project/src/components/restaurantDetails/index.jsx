import React, { useEffect, useRef, useState } from 'react';
import './details.css'; // Import your custom CSS for styling
import { useNavigate } from 'react-router-dom';
import { StoreContextRecipe } from '../../App';
import Select from 'react-select';
import axios from 'axios';
const kitchenTagOptions = [
  { value: 1, label: '#ქართული' },
  { value: 2, label: '#ფრანგული' },
  { value: 3, label: '#კახური' },
  { value: 4, label: '#იმერული' },
  { value: 5, label: '#აჭარული' },
  { value: 6, label: '#მესხური ' },
  { value: 7, label: '#ლაზური' },
  { value: 8, label: '#მთიანეთი' },
  { value: 9, label: '#რაჭა-ლეჩხუმური' },
  { value: 10, label: '#გურული' },
  { value: 12, label: '#მეგრული' },
  { value: 13, label: '#სვანური' },
  { value: 14, label: '#ფრანგული' },
  { value: 15, label: '#იტალიური' },
  { value: 16, label: '#მექსიკური' },
  { value: 17, label: '#ტაილანდური' },
  { value: 18, label: '#იაპონური' },
  { value: 19, label: '#ინდური' },
  { value: 20, label: '#ბერძნული' },
  { value: 21, label: '#ესპანური' },
  { value: 22, label: '#თურქული' },
  { value: 23, label: '#სომხური' },
  { value: 24, label: '#აზერბაიჯანული' },
  { value: 25, label: '#ამერიკული' },
  { value: 26, label: '#კორეული' },
  { value: 27, label: '#აფრიკული' },
  { value: 28, label: '#შუა აზიური' },
  { value: 29, label: '#ჩინური' },
  { value: 30, label: '#გერმანული' },
  { value: 31, label: '#უკრაინული' },
  { value: 32, label: '#ზღვის პროდუქტების' },
  { value: 51, label: '#სხვა' },
  { value: 52, label: '#ვეგანური' },
  { value: 53, label: '#ვაეგეტარიანული' },

];


const musicTagOptions = [
  { value: 33, label: '#ჰიპ-ჰოპი' },
  { value: 34, label: '#ჯაზი' },
  { value: 35, label: '#როკენროლი' }, 
  { value: 36, label: '#დისკო' },
  { value:  37, label: '#ტექნო ' },
  { value:  38, label: '#კლასიკური მუსიკა' },
  { value: 39, label: '#ქართული' },
  { value: 40, label: '#სხვა' },
];

const areaTagOptions = [
  { value: 54, label: '#გასართობი' },
  { value: 55, label: '#რომანტიული' },
  { value: 56, label: '#მყუდრო' },
  { value: 57, label: '#სპორტული' },
  { value: 58, label: '#სათამაშო' },
  { value: 59, label: '#ლაუნჯი' },
  { value: 60, label: '#სამაგიდო თამაშები' },
  { value: 50, label: '#სხვა' },

];

export const Details = function ({ setStep,prevStep, nextStep }) {

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
      // Fetch the access token from local storage on component mount
      const token = localStorage.getItem('accessToken');
      if (token) {
          setAccessToken(token);
      }
  }, []);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTags1, setSelectedTags1] = useState([]);

    const [selectedTags2, setSelectedTags2] = useState([]);
const navigation = useNavigate()
    const handleTagSelection = (selectedOptions) => {
      if (selectedOptions.length <= 3) {
        setSelectedTags(selectedOptions);
      } else {
        // Show system alert if more than three tags are selected
        alert('You can only select up to three tags.');
      }
    };
    const handleTagSelection1 = (selectedOptions) => {
      if (selectedOptions.length <= 3) {
        setSelectedTags1(selectedOptions);
      } else {
        // Show system alert if more than three tags are selected
        alert('You can only select up to three tags.');
      }
    };
  
  
    const handleTagSelection2 = (selectedOptions) => {
      if (selectedOptions.length <= 3) {
        setSelectedTags2(selectedOptions);
      } else {
        // Show system alert if more than three tags are selected
        alert('You can only select up to three tags.');
      }
    };
    const [selectWidth, setSelectWidth] = useState('100%'); // Initial width set to 100%

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth; // Get the screen width
      setSelectWidth(`${screenWidth*3/10}px`); // Set the width of the Select component
    };

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Initialize width on mount
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array to run this effect only once on mount


  
  const validateTags = () => {
    if (selectedTags.length === 0 || selectedTags1.length === 0 || selectedTags2.length === 0) {
      alert('Please select at least one tag for each category.');
      return false;
    }
    return true;
  };

  // Function to handle "დასრულება" button click
  const handleComplete = () => {
    if (validateTags()) {
      console.log(selectedTags)
      console.log(selectedTags1)
      console.log(selectedTags2)
      const cousinsTypeIds = selectedTags.map(tag => tag.value);
      const cousinsTypeIds1 = selectedTags1.map(tag => tag.value);
      const cousinsTypeIds2 = selectedTags2.map(tag => tag.value);

      axios
      .post("http://54.93.212.178/Restaurant/CreateOrUpdate/Environment",{
        cousinsTypeIds: cousinsTypeIds,
        musicsTypeIds: cousinsTypeIds1,
        environmentTypeIds: cousinsTypeIds2
      },
      {
        headers: {
          'Authorization':`bearer ${accessToken}`
        }
      })
      .then(response =>{
          console.log(response)
 
      })
      .catch(error =>{
          console.log(error);
         
      })
      .finally(() => {

      });


      // navigation('/home');
    }
  };
  
    return (
      <div className='detailes-div'>
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
        <div style={{borderColor:'#8C1D2F',borderWidth:'1.5px'}}  className="details-line">
          
        </div>
        <div  onClick={()=>setStep(5)}>
          <ion-icon name="flag-outline"></ion-icon>
          <h3 style={{color:'#8C1D2F'}}>5. დასასრული</h3>

        </div >
 
    </div>
        </div>
        <div style={{fontFamily: 'YourCustomFont, sans-serif'}} className='first-tags'>
          <h3 style={{fontFamily: 'YourCustomFont, sans-serif',marginBottom:'-0%'}}>სამზარეულოს ტიპი:</h3>
        <Select
          value={selectedTags}
          onChange={handleTagSelection}
          options={kitchenTagOptions}
          isMulti
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              color: 'red',
              borderColor: state.isFocused ? '#8C1D2F' : '#8C1D2F',
              '&:hover': {
                borderColor: '#8C1D2F', // Change border color on hover
              },
              fontFamily: 'YourCustomFont, sans-serif',
              width: selectWidth,
              backgroundColor: '#D9D9D9',
              outline: 'none', // Remove default outline,
              border: '1px solid #8C1D2F',
              // This line disable the blue border
              boxShadow: 'none',
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
        </div>


        <div style={{fontFamily: 'YourCustomFont, sans-serif'}} className='second-tags'>
          <h3 style={{fontFamily: 'YourCustomFont, sans-serif',marginBottom:'-0%'}}>მუსიკის ტიპი:</h3>
        <Select
          value={selectedTags1}
          onChange={handleTagSelection1}
          options={musicTagOptions}
          isMulti
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              color: 'red',
              borderColor: state.isFocused ? '#8C1D2F' : '#8C1D2F',
              '&:hover': {
                borderColor: '#8C1D2F', // Change border color on hover
              },
              fontFamily: 'YourCustomFont, sans-serif',

              width: selectWidth,
              backgroundColor: '#D9D9D9',
              outline: 'none', // Remove default outline,
              border: '1px solid #8C1D2F',
              // This line disable the blue border
              boxShadow: 'none',

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
        </div>


        <div style={{fontFamily: 'YourCustomFont, sans-serif'}} className='third-tags'>
        <h3 style={{fontFamily: 'YourCustomFont, sans-serif',marginBottom:'-0%'}}>გარემოს დახასითება:</h3>

        <Select
          value={selectedTags2}
          onChange={handleTagSelection2}
          options={areaTagOptions}
          isMulti
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              color: 'red',
              borderColor: state.isFocused ? '#8C1D2F' : '#8C1D2F',
              '&:hover': {
                borderColor: '#8C1D2F', // Change border color on hover
              },
              fontFamily: 'YourCustomFont, sans-serif',

              width: selectWidth,
              backgroundColor: '#D9D9D9',
              outline: 'none', // Remove default outline,
              border: '1px solid #8C1D2F',
              // This line disable the blue border
              boxShadow: 'none',
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
        </div>

        <div style={{position:'absolute',bottom:"12%",left:"8%",display:'flex', width:'50%', justifyContent:'space-around',alignItems:'',}}>
          
        <button style={{fontFamily: 'YourCustomFont, sans-serif'}} onClick={prevStep} className="imageButtonSubmit" >უკან</button>

        <button  style={{fontFamily: 'YourCustomFont, sans-serif'}} onClick={handleComplete} className="final-save-button-last" type="submit">დასრულება</button>

        </div>
        <img style={{position:"absolute",width:'20%',bottom:"10%",right:'5%'}} src="../../../public/cozy.png" alt="Main Logo" />

             <div style={{zIndex:'-1'}} className='footerLast'>
    <h3 >powered by MIKITANI</h3>
    <h3>2024</h3>
    
        </div>
      </div>
    );
  };