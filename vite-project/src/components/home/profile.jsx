import { NavLink, useLocation, useParams } from 'react-router-dom'
import './homePage.css'

import { yupResolver } from "@hookform/resolvers/yup";
import  { useContext, useRef,  } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { StoreContextRecipe } from "../../App";
import { LoadScript,   } from "@react-google-maps/api";
import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  
} from "use-places-autocomplete";
import SelectInput from "../selecter";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { useDropzone } from "react-dropzone";

const LIBRARIES = ["places"];

export default function ProfileHomePage () {
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
    image7: null,
    image8: null,
    image9: null,
    image10: null,
  });




  const onDrop = (acceptedFiles, fieldName) => {
    // Filter out files that are not PNG or JPEG
    const imageFiles = acceptedFiles.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );

    if (imageFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prevState) => ({
          ...prevState,
          [fieldName]: e.target.result,
        }));
      };
      reader.readAsDataURL(imageFiles[0]);
    } else {
      alert("Please upload only PNG or JPEG files.");
    }
  };

  const renderDropzone = (fieldName) => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/jpeg, image/png",
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, fieldName),
    });

    return (
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <ion-icon size={'large'} name="cloud-upload-outline"></ion-icon> 
        <p style={{fontFamily: 'YourCustomFont, sans-serif'}}>ატვირთე ფოტო</p>
        {imagePreviews[fieldName] && (
          <div className="image-preview">
            <img src={imagePreviews[fieldName]} alt={`Preview `} />
          </div>
        )}
      </div>
    );
  };
    const [isEdit,setIsEdit] = useState(true)
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


    const [street, setStreet] = useState('');

    const [isOpenMap, setIsOpenMap] = useState(false);
  
    const [showErrorMessage, setShowErrorMessage] = useState(false); // State to track if error message should be shown
  
    const [isAdditionalInfoVisible, setAdditionalInfoVisible] = useState(false);
  
    const toggleAdditionalInfo = () => {
      setAdditionalInfoVisible(!isAdditionalInfoVisible);
    };
  
    const { stateRestaurant, dispatchRestaurant,dispatchUser,stateUser } = useContext(StoreContextRecipe);
    // console.log(stateUser)
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyDmynewxrPLU4NW_x_8tg_FggEq62mc9MI",
      libraries: LIBRARIES, // Add "places" library here
  
    });
  
    // if (!isLoaded) return <div>Loading...</div>;
    // return <Map />;
  
  const GEOCODING_API_KEY = "AIzaSyDf4PZPy98nRtr-8mo2LPwq9wzHjC2TpDU";
  
  const formattedAddressRef = useRef(stateRestaurant.location || null);
  const Lng = useRef(stateRestaurant.lng || null);
  const Lat = useRef(stateRestaurant.lat || null);
  
  
  
  async function getLocationInfo(lat, lng) {
    Lng.current=lng
    Lat.current=lat
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEOCODING_API_KEY}`
    );
    console.log(response);
    if (response.data.results.length > 0) {
      const result = response.data.results[0];
      formattedAddressRef.current = result.formatted_address; // Store the value in the ref
      console.log("Formatted Address:", result.formatted_address);
      for (const component of result.address_components) {
        if (component.types.includes("locality")) {
          // console.log("City:", component.long_name);
        }
      }
    }
  }
  
  function Map() {
    const center = useMemo(() => ({ lat: 42, lng: 44.5 }), []);
    const zoom = 6;
  
    const [selected, setSelected] = useState(null);
    const [clickedPosition, setClickedPosition] = useState(center);
    const [searchValue, setSearchValue] = useState("");
    const [map, setMap] = useState(null); // Add a state variable to store the map object
  
    const handleMapClick = (event) => {
      const newMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      let {lat,lng} = newMarker
      setSelected(newMarker);
      setClickedPosition(newMarker);
      getLocationInfo(lat=lat, lng=lng)
      // setLat(lat)
      // setLng(lng)
    };
  
    useEffect(() => {
      // You can access the initial position once the component is mounted
      // For example, you can set the clickedPosition to a default location here
      setClickedPosition(center);
    }, []);
  
    // const handleSelect = async (address) => {
    //   try {
    //     const results = await geocodeByAddress(address);
    //     const latLng = await getLatLng(results[0]);
    //     setClickedPosition(latLng);
    //     setSearchValue(address);
    //   } catch (error) {
    //     console.error("Error selecting address: ", error);
    //   }
    // };
    
    return (
      <div>
        {/* <PlacesAutocomplete
          value={searchValue}
          onChange={setSearchValue}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({ placeholder: "Search for a location" })}
              />
              <div>
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={suggestion.placeId}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete> */}
   
  
        {/* <div className="places-container">
          <PlacesAutocomplete setSelected={setSelected} map={map}/>
        </div> */}
  
  <GoogleMap
    zoom={zoom}
    center={center}
    mapContainerStyle={{
      zIndex: "500",
      position: "absolute",
      top: "15%",
      left: "50%",
      borderRadius: "20px",
      height: "35%",
      width: "40%"
    }}
    mapContainerClassName="map-container"
    onLoad={(map) => setMap(map)} // Store the map object when it loads
    onClick={handleMapClick}
    options={{
      disableDefaultUI: true, // Disable default UI controls
      zoomControl: true, // Enable zoom control
      fullscreenControl: true, // Enable fullscreen control
      streetViewControl: true, // Enable street view control
      mapTypeControl: true, // Enable map type control
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.DEFAULT, // Set the style of the map type control
        position: window.google.maps.ControlPosition.TOP_LEFT // Set the position of the map type control
      }
    }}
  >
    {selected && <Marker position={selected} />}
  </GoogleMap>
  
      </div>
    );  
  }
  const PlacesAutocomplete = ({ setSelected, map }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      setSelected({ lat, lng });
  
      // Set the zoom level and pan to the selected location
      map.setZoom(10); // Adjust the zoom level as needed
      map.panTo({ lat, lng });
  
      formattedAddressRef.current = address; // Store the value in the ref
    };
  
    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an address"
          style={{width:'60%',borderRadius:'20px',position:"absolute", left:'60%'}}
        />
        <ComboboxPopover>
          <ComboboxList style={{position:'absolute',top:'10px',left:'-40%',width:'300px',zIndex:'11',backgroundColor:'white'}}>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  };



  
  


  
  let schema;
  const englishLettersWithSpacesAndTabsRegex = /^[A-Za-z0-9 \t\-_]+$/;
  const georgianLettersWithSpacesAndTabsRegex = /^[\u10A0-\u10FF0-9 \t_-]+$/;
  
  const defaultValues = {
    adressGeorgian:stateRestaurant?.adressGeorgian || '',
        adressEnglish:stateRestaurant?.adressEnglish || '',
        description: stateRestaurant?.description || '',
        descriptionGeo: stateRestaurant?.descriptionGeo || '',
        location: stateRestaurant?.location || '',
        name:stateUser?.name,
        name1:stateUser?.name1,
        email:stateUser?.email,
        card:stateUser?.number
  }

      schema = yup.object().shape({
        // restaurantName: yup.string().max(50).required(),
        adressGeorgian:yup.string()
        .matches(georgianLettersWithSpacesAndTabsRegex, 'Only Georgian letters are allowed')
        .max(25).required(),
        adressEnglish:yup.string()
        .matches(englishLettersWithSpacesAndTabsRegex, 'Only English letters are allowed')
        .max(25).required(),
        description: yup.string()
        .matches(englishLettersWithSpacesAndTabsRegex, 'Only English letters are allowed')
        .max(500, 'Description must be at most 500 characters')
        .required('Description is required'),      
        
        descriptionGeo: yup.string()
        .matches(georgianLettersWithSpacesAndTabsRegex, 'Only Georgian letters are allowed')
        .max(500, 'Description must be at most 500 characters')
        .required('რესტორნის ქართული აღწერა სავალდებულოა'),
  
        name: yup
        .string()
        .matches(/^[a-zA-Z]+$/, 'English name must contain only English letters')
        .min(5,'Company name must be at least 5 characters')
        .max(15,'Company name must be less then  15 characters')
        .required('Company name is required'),
      name1: yup
        .string()
        .matches(/^[\u10A0-\u10FF]+$/, 'Georgian name must contain only Georgian letters')
        .min(5,'Company name must be at least 5 characters')
        .max(15,'Company name must be less then  15 characters')
        .required('Company name is required'),

        email: yup.string().email().required(),
        card: yup.number().typeError("Phone number must be a number").required("phone number is required"),

        // hallStart: yup.string().matches(
        //   /^([01]\d|2[0-3]):[0-5]\d$/,
        //   'Invalid time format (HH:MM)'
        // ).required('Time is required'),
        // hallEnd:  yup.string().matches(
        //   /^([01]\d|2[0-3]):[0-5]\d$/,
        //   'Invalid time format (HH:MM)'
        // ).required('Time is required'),
        // kitchenStart: yup.string().matches(
        //   /^([01]\d|2[0-3]):[0-5]\d$/,
        //   'Invalid time format (HH:MM)'
        // ).required('Time is required'),
        // kitchenEnd: yup.string().matches(
        //   /^([01]\d|2[0-3]):[0-5]\d$/,
        //   'Invalid time format (HH:MM)'
        // ).required('Time is required'),
      });
  
  
  
   
    const { register, handleSubmit,reset, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      defaultValues:defaultValues
    });
    // console.log(stateRestaurant)
  
    const onSubmit = (data) => {   
      const allImagesProvided =
      imagePreviews.image1 &&
      imagePreviews.image2 &&
      imagePreviews.image3 &&
      imagePreviews.image4 &&
      imagePreviews.image5 &&
      imagePreviews.image6 &&
      imagePreviews.image7 &&
      imagePreviews.image8 &&
      imagePreviews.image9 &&
      imagePreviews.image10 

    if (allImagesProvided) {
      nextStep();
    } else {
      alert("Please provide all five images.");
    }   
         if(formattedAddressRef.current){
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "location",
            value: formattedAddressRef.current,
          });
       dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "lat",
            value: Lat.current,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "lng",
            value: Lng.current,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "description",
            value: data.description,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "descriptionGeo",
            value: data.descriptionGeo,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "hallStart",
            value: timeValueHall,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "hallEnd",
            value: timeValueHallEnd,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "kitchenStart",
            value: timeValueKitchen,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "kitchenEnd",
            value: timeValueKitchenEnd,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "musicStart",
            value: timeValueMusic,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "musicEnd",
            value: timeValueMusicEnd,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "adressGeorgian",
            value: data.adressGeorgian,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "adressEnglish",
            value: data.adressEnglish,
          });
          // dispatchRestaurant({
          //       type: "changePrimitiveType",
          //       propertyId: "priceID",
          //       value: price
          //   })
          //   dispatchRestaurant({
          //       type: "changePrimitiveType",
          //       propertyId: "restaurantTypeId",
          //       value: type
          //   }) 
          //   dispatchRestaurant({
          //       type: "changePrimitiveType",
          //       propertyId: "restaurantRegionId",
          //       value: region
          //   })
          if(
            !(((!timeValueHall || !timeValueHallEnd) && !stateRestaurant.is24Hall) || ((!timeValueKitchen || !timeValueKitchenEnd) && !stateRestaurant.is24) || ((!timeValueMusic || !timeValueMusicEnd) && !stateRestaurant.is24Music) )
            
          ){
        setIsEdit(true)

          }
  
         }
    };

    const options = ['₾', '₾₾', '₾₾₾',"₾₾₾₾","₾₾₾₾₾"];
    const handleOptionChange = (selectedValue) => {
      // console.log('Selected option:', selectedValue);
      switch (selectedValue) {
        case '₾':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "priceID",
                value: 1
            })    
            break;
      
            case '₾₾':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "priceID",
                value: 2
            })     
       
            break;
            case '₾₾₾':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "priceID",
                value: 3
            })     
       
            break;
            case '₾₾₾₾':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "priceID",
                value: 4
            })
            
            break;
            case '₾₾₾₾₾':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "priceID",
                value: 5
            })
            break;
  
        default:
            break;
      }
    };
  
  
  
  
    const options1 = ["რესტორანი","კაფე","ბარი","კაფე-ბარი","ღამის კლუბი","კლუბი","პაბი","სუშიბარი","ლაუნჯბარი","ბურგერბარი","პიცერია","სწრაფი კვება"];
    const handleOptionChange1 = (selectedValue) => {
      // console.log('Selected option:', selectedValue);
      
      switch (selectedValue) {
        case 'რესტორანი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 1
            })    
            break;
            case 'კაფე':
              dispatchRestaurant({
                  type: "changePrimitiveType",
                  propertyId: "restaurantTypeId",
                  value: 2
              })
              break;
              case 'ბარი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 3
            })
            break;
            case 'კაფე-ბარი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 4
            })
            break;
            case 'ღამის კლუბი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 5
            })
            break;
            case 'კლუბი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 6
            })
            break;
            case 'პაბი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 7
            })
                        
            break;
            case 'სუშიბარი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 8
            })
                        
            break;
            case 'ლაუნჯბარი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 9
            })
                        
            break;
            case 'ბურგერბარი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 10
            })
                         
            break;
            case 'პიცერია':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 11
            })
                         
            break;
            case 'სწრაფი კვება':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantTypeId",
                value: 12
            })
                         
            break;
  
  
        default:
            break;
      }
    };
    
    
    const options3 = ['თბილისი', 'ქუთაისი', 'ბათუმი',"თელავი","ზუგდიდი","მცხეთა","მესტია","სიღნაღი","სხვა"];


    // const [region, setRegion] = useState('');
    const handleOptionChange3 = (selectedValue) => {
      // console.log('Selected option:', selectedValue);
      switch (selectedValue) {
        case 'თბილისი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantRegionId",
                value: 1
            })
                        
            break;
        case 'ქუთაისი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantRegionId",
                value: 2
            })
            
            break;
         case 'ბათუმი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantRegionId",
                value: 3
            })
            
            break;
        case 'თელავი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantRegionId",
                value: 4
            })
            
            break;
        case 'ზუგდიდი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantRegionId",
                value: 5
            })
            
            break; 
        case 'მცხეთა':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantRegionId",
                value: 6
            })
            
            break;
        case 'მესტია':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantRegionId",
                value: 7
            })
            
            break;
        case 'სიღნაღი':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantRegionId",
                value: 8
            })
            
            break;
        case 'სხვა':
            dispatchRestaurant({
                type: "changePrimitiveType",
                propertyId: "restaurantRegionId",
                value: 9
            })
            break;      
  
        default:
            break;
      }
    };
  const [timeValueHall, setTimeValueHall] = useState(stateRestaurant?.hallStart || '');
  const [timeValueHallEnd, setTimeValueHallEnd] = useState(stateRestaurant?.hallEnd || "");
  const [timeValueKitchen, setTimeValueKitchen] = useState(stateRestaurant?.kitchenStart || "");
  const [timeValueKitchenEnd, setTimeValueKitchenEnd] = useState(stateRestaurant?.kitchenEnd || "");
  const [timeValueMusic, setTimeValueMusic] = useState(stateRestaurant?.musicStart || "");
  const [timeValueMusicEnd, setTimeValueMusicEnd] = useState(stateRestaurant?.musicEnd || "");
  
  const handleTimeChange = (newTime, setTimeFunc, field) => {
    setTimeFunc(newTime); // Update the local state with the new time
  };
  const handleChange = () => {
    setIsEdit(!isEdit)
    // Copy the current state of menuSections to menuSections1
  };
    return (
        <div className={`homePage-container ${isOpenSideBar ? 'sidebar-open' : 'sidebar-closed'}`}>
        <img className='home-paige-logo' src="../../../public/img/Group4.png" alt="" />
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
            
            <div style={{overflowY:'scroll',padding:'2%'}} className='content-container'>
{
   isEdit &&
   <div className='menu-managment-buttons1-change'>
   
       <button  onClick={handleChange} style={{fontFamily: 'YourCustomFont, sans-serif'}}  >
       შეცვლა
       <ion-icon name="create-outline"></ion-icon>
   </button>
   </div>
}

            <form onSubmit={handleSubmit(onSubmit)} action="" className="form-first" id="form">
            {
                !isEdit && 

<div  className='menu-managment-buttons1-change'>
{/* <button  onClick={()=>{
  reset(defaultValues)
  setIsEdit(true)
  setTimeValueHall(stateRestaurant?.hallStart)
  setTimeValueHallEnd(stateRestaurant?.hallEnd)
  setTimeValueKitchen(stateRestaurant?.kitchenStart)
  setTimeValueKitchenEnd(stateRestaurant?.kitchenEnd)
  setTimeValueMusic(stateRestaurant?.musicStart)
  setTimeValueMusicEnd(stateRestaurant?.musicEnd)
  dispatchRestaurant({
    type: "changePrimitiveType",
    propertyId: "is24Hall",
    value: stateRestaurant?.is24Hall,
  });
  dispatchRestaurant({
    type: "changePrimitiveType",
    propertyId: "is24Music",
    value: stateRestaurant?.is24Music,
  });
  dispatchRestaurant({
    type: 'changePrimitiveType',
    propertyId: 'is24',
    value: stateRestaurant?.is24,
  });
  dispatchRestaurant({
    type: "changePrimitiveType",
    propertyId: "isTerace",
    value: stateRestaurant.isTerace,
  });
  dispatchRestaurant({
    type: "changePrimitiveType",
    propertyId: "isCupe",
    value: stateRestaurant.isCupe,
  });
  dispatchRestaurant({
    type: "changePrimitiveType",
    propertyId: "corporative",
    value: stateRestaurant.corporative,
  });
  console.log(options3[stateRestaurant?.restaurantRegionId-1])
  dispatchRestaurant({
    type: "changePrimitiveType",
    propertyId: "priceID",
    value: stateRestaurant?.priceID
})
dispatchRestaurant({
    type: "changePrimitiveType",
    propertyId: "restaurantTypeId",
    value: stateRestaurant?.restaurantTypeId
}) 
dispatchRestaurant({
    type: "changePrimitiveType",
    propertyId: "restaurantRegionId",
    value: stateRestaurant?.restaurantRegionId 
})
  handleOptionChange3(options3[stateRestaurant?.restaurantRegionId-1])
  handleOptionChange1(options1[stateRestaurant?.restaurantTypeId-1])
  handleOptionChange(options[stateRestaurant?.priceID-1])
}} style={{fontFamily: 'YourCustomFont, sans-serif'}}  >
                        გაუქმება
                        <span>
                        <ion-icon name="close-outline"></ion-icon>

                        </span>
                    </button> */}
                    <button onClick={()=>setShowErrorMessage(true)}  type='submit' style={{fontFamily: 'YourCustomFont, sans-serif'}}  >
                    დასრულება
                    <span>
                    <ion-icon name="checkmark-outline"></ion-icon>

                    </span>
                    </button>
                    </div>
            }
          {/* <div className="form-control-first">
            <label> Restaurant name 
              <input type="text" id="name" placeholder="Enter restaurant name" {...register("restaurantName")} />
            </label>
            <small>{errors.restaurantName?.message }</small>
          </div> */}
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
<div class="coolinput">
    <label for="input" class="text">ქართული აღწერა:</label>
    <textarea disabled={isEdit}  type="text" id="discription"  placeholder="შეიყვანეთ რესტორნის აღწერა ქართულ ენაზე" name="input" class="input" {...register("descriptionGeo")}/>
    <small >{errors.descriptionGeo?.message }</small>

</div>
<div style={{width:'40%',height:'auto'}} class="coolinput">
    <label for="input" class="text">კომპანიის სახელი ქართულად:</label>
    <input disabled={isEdit} type="text" id="discription"  placeholder="შეიყვანეთ კომპანიის სახელი ქართულად" name="input" class="input" {...register("name")}/>
    <small >{errors.name?.message }</small>

</div>
</div>
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
<div class="coolinput">
    <label for="input" class="text">ინგლისური აღწერა:</label>
    <textarea disabled={isEdit}  type="text" id="discription"  placeholder="შეიყვანეთ რესტორნის აღწერა ინგლისურ ენაზე" name="input" class="input"  {...register("description")} />
    <small>{errors.description?.message }</small>

</div>
<div style={{width:'40%',height:'auto'}} class="coolinput">
    <label for="input" class="text">კომპანიის სახელი ინგლისურად:</label>
    <input disabled={isEdit} type="text" id="discription"  placeholder="შეიყვანეთ კომპანიის სახელი ინგლისურად" name="input" class="input" {...register("name1")}/>
    <small >{errors.name1?.message }</small>

</div>
</div>




        {/* <div className="form-control-first">
<label style={{fontFamily: 'YourCustomFont, sans-serif'}}>ინგლისური აღწერა    
<textarea type="text" id="discription"  placeholder="შეიყვანეთ რესტორნის აღწერა ინგლისურ ენაზე" {...register("description")}/>
</label>
<small>{errors.description?.message }</small>
</div> */}


{/* {
  isOpenMap ? <Map/> : <></>
} */}
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
  <div  style={{marginBottom:'1%'}} className="first-flex1">

<div style={{width:'45%'}} class="coolinput">
    <label for="input" class="text">მისამართი ქართულად:</label>
    <input disabled={isEdit} type="text" id="table"  placeholder="შეიყვანეთ მისამართი ქართულად" name="input" class="input"  {...register("adressGeorgian")} />
    <small>{errors.adressGeorgian?.message}</small>

</div>
<div style={{width:'45%'}} class="coolinput">
    <label for="input" class="text">მისამართი ინგლისურად:</label>
    <input disabled={isEdit} type="text" id="table"  placeholder="შეიყვანეთ მისამართი ინგლისურად" name="input" class="input"  {...register("adressEnglish")} />
    <small>{errors.adressEnglish?.message}</small>

</div>


</div>
<div style={{width:'40%',height:'auto'}} class="coolinput">
    <label for="input" class="text">კომპანიის მეილი:</label>
    <input disabled={isEdit} type="email" id="discription"  placeholder="შეიყვანეთ კომპანიის მეილი" name="input" class="input" {...register("email")}/>
    <small >{errors.email?.message }</small>

</div>
</div>


<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
<div style={{width:'50%',marginBottom:'0%'}} className="first-flex2" onClick={()=>{
  if(isOpenMap){
    setIsOpenMap(false)
  } else{
    if(!isEdit){
      setIsOpenMap(true)

    }
  }
}}>

<div style={{width:'100%'}} className="exact-location">
  <label style={{fontFamily: 'YourCustomFont, sans-serif'}}>
  აირჩიეთ ლოკაცია :
  </label> 
<span style={{color:"#8C1D2F"}}>{formattedAddressRef.current}</span> 
</div>


<div style={{display:'flex',alignItems:"center",cursor:'pointer',marginLeft:'2%'}} > 
<ion-icon  name="location-outline" size={'large'}/>
</div>
{(showErrorMessage && !formattedAddressRef.current )&&  <small style={{ color: 'red' }}>{'აირჩიეთ თქვენი ლოკაცია '}</small>}

</div>
<div style={{width:'40%',height:'auto'}} class="coolinput">
    <label for="input" class="text">კომპანიის ტელეფონის ნომერი:</label>
    <input disabled={isEdit} type="number" id="discription"  placeholder="შეიყვანეთ კომპანიის ტელეფონის ნომერი" name="input" class="input" {...register("card")}/>
    <small >{errors.card?.message }</small>

</div>
</div>


<div style={{display:'flex',alignItems:'center', width:'97%',justifyContent:'space-between',marginBottom:'3%',marginTop:'2%'}}>
  <div className="form-control-details">

<label  style={{fontFamily: 'YourCustomFont, sans-serif',zIndex:'1000'}}>
ფასის კატეგორია
</label>
        <SelectInput isEdit={!isEdit} defaultValue={options[stateRestaurant?.priceID-1]} options={options} onChange={handleOptionChange} />
  </div>

  <div className="form-control-details">
  <label style={{fontFamily: 'YourCustomFont, sans-serif',zIndex:'1000'}} >
რესტორნის ტიპი
</label>

<SelectInput
  isEdit={!isEdit}
  defaultValue={options1[stateRestaurant?.restaurantTypeId - 1]}
  options={options1}
  onChange={handleOptionChange1}
/>
  </div>

  <div className="form-control-details">

  <label style={{fontFamily: 'YourCustomFont, sans-serif',zIndex:'1000'}} >
რეგიონი / ქალაქი
  </label>
  <SelectInput isEdit={!isEdit}  defaultValue={options3[stateRestaurant?.restaurantRegionId-1]} options={options3} onChange={handleOptionChange3} />

  </div>

</div>




{/* <div style={{marginTop:"20px"}} className="form-control-first">
<label >Table Quantity    
<input type="number"  id="table"  placeholder="Enter restaurant's table Quantity" {...register("tableQuantity")}/>
</label>
<small>{errors.tableQuantity?.message }</small>
</div> */}

{/* <div style={{marginTop:"20px"}} className="form-control-first">
<label >Cupe Quantity    
<input type="number"  id="cupe"  placeholder="Enter restaurant's cupe Quantity" {...register("cupeQuantity")}/>
</label>
<small>{errors.cupeQuantity?.message }</small>
</div> */}

{/* <div style={{marginTop:"20px"}} className="form-control-first">
<label >Terrace Quantity    
<input type="number"  id="terrace"  placeholder="Enter restaurant's terrace Quantity" {...register("terraceQuantity")}/>
</label>
<small>{errors.terraceQuantity?.message }</small>
</div> */}



<div  style={{alignItems:'center', width:'97%'}} className="first-flex">
<div style={{zIndex:'200'}}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField']}>
        <TimeField
          label="დარბაზის გახსნის დრო"
          value={timeValueHall}
          onChange={(newTime) => handleTimeChange(newTime, setTimeValueHall)}
          format="HH:mm"
          disabled={(stateRestaurant?.is24Hall || isEdit)}
          sx={{ '& .MuiInputLabel-root': { fontFamily: 'YourCustomFont, sans-serif',fontSize:'18px' } }} // Custom styles for label

        />
      </DemoContainer>
    </LocalizationProvider>
{/* <input  type="time"  id="hallStart"  disabled={stateRestaurant?.is24Hall}   {...register("hallStart")}/> */}
{
  (showErrorMessage && !stateRestaurant.is24Hall )&& 
  <small style={{bottom:'-20%',zIndex:'200',color:'red'}}>{!timeValueHall ? "შეიყვანეთ დრო": null }</small>

}
</div>
<div>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField']}>
        <TimeField
          label="დარბაზის დახურვის დრო"
          value={timeValueHallEnd}
          onChange={(newTime) => handleTimeChange(newTime, setTimeValueHallEnd)}
          format="HH:mm"
          disabled={(stateRestaurant?.is24Hall || isEdit)}
          sx={{ '& .MuiInputLabel-root': { fontFamily: 'YourCustomFont, sans-serif',fontSize:'18px' } }} // Custom styles for label
          
        />
      </DemoContainer>
    </LocalizationProvider>
    {
  (showErrorMessage && !stateRestaurant?.is24Hall )&& 
  <small style={{bottom:'-20%',zIndex:'200',color:'red'}}>{!timeValueHallEnd ? "შეიყვანეთ დრო": null }</small>
}
</div>

<div style={{marginTop:"20px",width:'30%' }} className="form-control-first">
<label  style={{display:'flex' ,width:'105%', alignItems:'center',justifyContent:'center',fontFamily: 'YourCustomFont, sans-serif'}}>24საათიანი დარბაზი  



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
    onChange={() => {
      if (stateRestaurant?.is24Hall) {
        dispatchRestaurant({
          type: "changePrimitiveType",
          propertyId: "is24Hall",
          value: false,
        });
      } else {
        dispatchRestaurant({
          type: "changePrimitiveType",
          propertyId: "is24Hall",
          value: true,
        });
      }
    }}
    defaultChecked={stateRestaurant?.is24Hall}
    disabled={isEdit}
  />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: stateRestaurant?.is24Hall ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {stateRestaurant?.is24Hall && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>




</label>
</div>

</div>

<div style={{alignItems:'center', width:'97%'}} className="first-flex">
<div style={{zIndex:'200'}}>

<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField']}>
        <TimeField
          label="სამზარეულოს გახსნის დრო"
          value={timeValueKitchen}
          onChange={(newTime) => handleTimeChange(newTime, setTimeValueKitchen)}
          format="HH:mm"
          disabled={(stateRestaurant?.is24 || isEdit)}
          sx={{ '& .MuiInputLabel-root': { fontFamily: 'YourCustomFont, sans-serif',fontSize:'18px' } }} // Custom styles for label

        />
      </DemoContainer>
    </LocalizationProvider>
    {
  (showErrorMessage && !stateRestaurant?.is24 )&& 

    <small style={{bottom:'-20%',zIndex:'200',color:'red'}}>{!timeValueKitchen ? "შეიყვანეთ დრო": null }</small>
    }
    </div>
<div>

<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField']}>
        <TimeField
          label="სამზარეულოს დახურვის დრო"
          value={timeValueKitchenEnd}
          onChange={(newTime) => handleTimeChange(newTime, setTimeValueKitchenEnd)}
          format="HH:mm"
          disabled={(stateRestaurant?.is24 || isEdit)}
          sx={{ '& .MuiInputLabel-root': { fontFamily: 'YourCustomFont, sans-serif',fontSize:'18px' } }} // Custom styles for label

        />
      </DemoContainer>
    </LocalizationProvider>
    {
  (showErrorMessage && !stateRestaurant?.is24 )&& 
  <small style={{bottom:'-20%',zIndex:'200',color:'red'}}>{!timeValueKitchenEnd ? "შეიყვანეთ დრო": null }</small>
    }
        </div>

<div style={{marginTop:"20px" ,width:'30%' }} className="form-control-first">
<label  style={{fontFamily: 'YourCustomFont, sans-serif',display:'flex' ,width:'100%',alignItems:'center',justifyContent:'center',marginBottom:'0px'}}>24საათიანი სამზარეულო   
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
    onChange={() => {
      dispatchRestaurant({
        type: 'changePrimitiveType',
        propertyId: 'is24',
        value: !stateRestaurant?.is24,
      });
    }}
    defaultChecked={stateRestaurant?.is24}
    disabled={isEdit}
  />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: stateRestaurant?.is24 ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {stateRestaurant?.is24 && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>

</label>
</div>

</div>


<div style={{alignItems:'center', width:'97%'}} className="first-flex">
  <div style={{zIndex:'200'}}>

<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField']}>
        <TimeField
          label="მუსიკის დაწყების დრო"
          value={timeValueMusic}
          onChange={(newTime) => handleTimeChange(newTime, setTimeValueMusic)}
          format="HH:mm"
          disabled={(stateRestaurant?.is24Music || isEdit)}
          sx={{ '& .MuiInputLabel-root': { fontFamily: 'YourCustomFont, sans-serif',fontSize:'18px' } }} // Custom styles for label

        />
      </DemoContainer>
    </LocalizationProvider>
    {
  (showErrorMessage && !stateRestaurant?.is24Music )&& 
  <small style={{bottom:'-20%',zIndex:'200',color:'red'}}>{!timeValueMusic ? "შეიყვანეთ დრო": null }</small>
}
</div>

<div>

<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField']}>
        <TimeField
          label="მუსიკის დასრულების დრო"
          value={timeValueMusicEnd}
          onChange={(newTime) => handleTimeChange(newTime, setTimeValueMusicEnd)}
          format="HH:mm"
          disabled={(stateRestaurant?.is24Music || isEdit)}
          sx={{ '& .MuiInputLabel-root': { fontFamily: 'YourCustomFont, sans-serif',fontSize:'18px' } }} // Custom styles for label

        />
      </DemoContainer>
    </LocalizationProvider>
    {
  (showErrorMessage && !stateRestaurant?.is24Music )&& 
    <small style={{bottom:'-20%',zIndex:'200',color:'red'}}>{!timeValueMusicEnd ? "შეიყვანეთ დრო": null }</small>
}
    </div>

<div style={{marginTop:"20px" ,width:'30%' }} className="form-control-first">
<label  style={{fontFamily: 'YourCustomFont, sans-serif',display:'flex' ,width:'100%',alignItems:'center',justifyContent:'center',marginBottom:'0px'}}>მუსიკის გარეშე   
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
    onChange={() => {
      dispatchRestaurant({
        type: 'changePrimitiveType',
        propertyId: 'is24Music',
        value: !stateRestaurant?.is24Music,
      });
    }}
    defaultChecked={stateRestaurant?.is24Music}
    disabled={isEdit}
  />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: stateRestaurant?.is24Music ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {stateRestaurant?.is24Music && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>

</label>
</div>
</div>


<div className="first-flex">

<div style={{marginTop:"20px"}} className="form-control-first">
<label style={{display:"flex",width:'100%',fontFamily: 'YourCustomFont, sans-serif'}}>კორპერატიულები ?    

<div style={{ display: 'inline-block', position: 'relative', marginLeft:'5px'}}>
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
    disabled={isEdit}
    type="checkbox"
    onChange={() => {
      if(stateRestaurant?.corporative){
        dispatchRestaurant({
          type: "changePrimitiveType",
          propertyId: "corporative",
          value: false,
        });
      }else {
        dispatchRestaurant({
          type: "changePrimitiveType",
          propertyId: "corporative",
          value: true,
        });
      }
    }}
    defaultChecked={stateRestaurant?.corporative}
    />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: stateRestaurant?.corporative ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {stateRestaurant?.corporative && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>
</label>
</div>



<div style={{marginTop:"20px"}} className="form-control-first">
<label style={{display:"flex",width:'100%',fontFamily: 'YourCustomFont, sans-serif'}}>კუპე ?

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
    onChange={() => {
      if(stateRestaurant?.isCupe){
        dispatchRestaurant({
          type: "changePrimitiveType",
          propertyId: "isCupe",
          value: false,
        });
      }else {
        dispatchRestaurant({
          type: "changePrimitiveType",
          propertyId: "isCupe",
          value: true,
        });
      }
    }}
    defaultChecked={stateRestaurant?.isCupe}
    disabled={isEdit}
    />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: stateRestaurant?.isCupe ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {stateRestaurant?.isCupe && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>


{/* 
<input onClick={()=>{
  if(stateRestaurant?.isCupe){
    dispatchRestaurant({
      type: "changePrimitiveType",
      propertyId: "isCupe",
      value: false,
    });
  }else {
    dispatchRestaurant({
      type: "changePrimitiveType",
      propertyId: "isCupe",
      value: true,
    });
  }
}}
defaultChecked={stateRestaurant?.isCupe}
 style={{width:'20px', marginLeft:'10px'}} type="checkbox"    /> */}
</label>
</div>



<div style={{marginTop:"20px"}} className="form-control-first">
<label style={{display:"flex",width:'100%',fontFamily: 'YourCustomFont, sans-serif'}}>ტერასა ?  


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
    onChange={() => {
      if(stateRestaurant?.isTerace){
        dispatchRestaurant({
          type: "changePrimitiveType",
          propertyId: "isTerace",
          value: false,
        });
      }else {
        dispatchRestaurant({
          type: "changePrimitiveType",
          propertyId: "isTerace",
          value: true,
        });
      }
    }}
    defaultChecked={stateRestaurant?.isTerace}
    disabled={isEdit}
    />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: stateRestaurant?.isTerace ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {stateRestaurant?.isTerace && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>




</label>
</div>

</div>
{/* 
        <button onClick={()=>setShowErrorMessage(true)} className="first-step-button" type="submit" >
          შემდეგი
        </button> */}
         <div className="FirstPartImages">
        <div style={{position:'relative'}} className="form-controlImages">
          <span style={{fontFamily: 'YourCustomFont, sans-serif',fontSize:'13px',color:'#8C1D2F',position:'absolute',top:"-10%"}}>მთავარი სურათი</span>
          {renderDropzone("image1")}

        </div>
        <div className="form-controlImages">
          {renderDropzone("image2")}

        </div>
        <div className="form-controlImages">
          {renderDropzone("image3")}

        </div>
        <div className="form-controlImages">
          {renderDropzone("image9")}

        </div>
        <div className="form-controlImages">
          {renderDropzone("image10")}

        </div>
        </div>
        <div className="SecondPartImages">
        <div className="form-controlImages">
          {renderDropzone("image4")}

        </div>
        <div className="form-controlImages">
          {renderDropzone("image5")}

        </div>
        <div className="form-controlImages">
          {renderDropzone("image6")}

        </div>
        <div className="form-controlImages">
          {renderDropzone("image7")}

        </div><div className="form-controlImages">
          {renderDropzone("image8")}

        </div>
        </div>
      </form>
      {/* <form onSubmit={handleSubmit(onSubmit)} className="formImages" id="form">
       
      </form> */}
            </div>
        </div>
    );
}