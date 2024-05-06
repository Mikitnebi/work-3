import { yupResolver } from "@hookform/resolvers/yup";
import  { useContext, useRef,  } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./firstStep.css";
import { StoreContextRecipe } from "../../App";
import { LoadScript,   } from "@react-google-maps/api";
import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import LocationSearchInput from "./localSearch";
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

// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

export const FirstStep = function ({setStep, chooseStep, nextStep }) {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
      // Fetch the access token from local storage on component mount
      const token = localStorage.getItem('accessToken');
      if (token) {
          setAccessToken(token);
      }
  }, []);
  const [street, setStreet] = useState('');

  const [isOpenMap, setIsOpenMap] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false); // State to track if error message should be shown

  const [isAdditionalInfoVisible, setAdditionalInfoVisible] = useState(false);

  const toggleAdditionalInfo = () => {
    setAdditionalInfoVisible(!isAdditionalInfoVisible);
  };

  const { stateRestaurant, dispatchRestaurant } = useContext(StoreContextRecipe);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDmynewxrPLU4NW_x_8tg_FggEq62mc9MI",
    libraries: ["places"], // Add "places" library here

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



 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // restaurantName: stateRestaurant?.name || '',
      adressGeorgian:stateRestaurant?.adressGeorgian || '',
      adressEnglish:stateRestaurant?.adressEnglish || '',
      description: stateRestaurant?.description || '',
      descriptionGeo: stateRestaurant?.descriptionGeo || '',
      location: stateRestaurant?.location || '',
    },
  });
  // console.log(stateRestaurant)

  const onSubmit = (data) => {
    axios
        .post("http://54.93.212.178/Restaurant/CreateOrUpdate/Info",{
          locationX: Lng.current,
          locationY: Lat.current,
          address: data.adressGeorgian,
          addressEng:data.adressEnglish,
          businessTypeId: stateRestaurant?.restaurantTypeId,
  priceTypeId: stateRestaurant?.priceID,
  regionId: stateRestaurant?.restaurantRegionId,
  hasCoupe: stateRestaurant?.isCupe,
  hasTerrace: stateRestaurant?.isTerace,
  hallStartTime: !stateRestaurant.is24Hall ? `${timeValueHall.format('HH:mm:ss')}` : null,
  hallEndTime: !stateRestaurant.is24Hall ? `${timeValueHallEnd.format('HH:mm:ss')}` : null,
  kitchenStartTime: !stateRestaurant.is24 ? `${timeValueKitchen.format('HH:mm:ss')}` : null,
  kitchenEndTime: !stateRestaurant.is24 ? `${timeValueKitchenEnd.format('HH:mm:ss')}` : null,
  musicStartTime: !stateRestaurant.is24Music ? `${timeValueMusic.format('HH:mm:ss')}` : null,
  musicEndTime: !stateRestaurant.is24Music ? `${timeValueMusicEnd.format('HH:mm:ss')}` : null,
  activeStatusId: 0,
  forCorporateEvents: stateRestaurant?.corporative,
  descriptionGeo: data?.descriptionGeo,
  descriptionEng: data?.description
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
            console.log(stateRestaurant)

        });



       
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

        if(
          !(((!timeValueHall || !timeValueHallEnd) && !stateRestaurant.is24Hall) || ((!timeValueKitchen || !timeValueKitchenEnd) && !stateRestaurant.is24) || ((!timeValueMusic || !timeValueMusicEnd) && !stateRestaurant.is24Music) )
          
        ){
          nextStep();

        }
        console.log(data)
        console.log(timeValueHall.format('HH:mm:ss'))
       }

    // if (data.image1[0]) {
    //   dispatchRestaurant({
    //     type: "changePrimitiveType",
    //     propertyId: "image1",
    //     value: data.image1[0],
    //   });
    // }

    // if (data.image2[0]) {
    //   dispatchRestaurant({
    //     type: "changePrimitiveType",
    //     propertyId: "image2",
    //     value: data.image2[0],
    //   });
    // }

    // if (data.image3[0]) {
    //   dispatchRestaurant({
    //     type: "changePrimitiveType",
    //     propertyId: "image3",
    //     value: data.image3[0],
    //   });
    // }
  };
  const options = ['₾', '₾₾', '₾₾₾',"₾₾₾₾","₾₾₾₾₾"];
  const handleOptionChange = (selectedValue) => {
    console.log('Selected option:', selectedValue);
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
    console.log('Selected option:', selectedValue);
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
    console.log('Selected option:', selectedValue);
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
  return (
    <div className="first-box">

      <div className="first-box-brother">
      <div className='firstStep-Name'>
    <img style={{width:'4%',marginRight:'5px'}} src="../../../public/img/Group4.png" alt="Main Logo" />
    <h3 >მოგესალმებით მიკიტანში</h3>

    <div className="details-steps">
      <div onClick={()=>setStep(1)}>
      <ion-icon name="newspaper-outline"></ion-icon>
      <h3 style={{color:'#8C1D2F'}}>1. დეტალები</h3>

      </div>
      <div className="details-line">

      </div>
      <div  onClick={()=>setStep(2)}>
      <ion-icon name="images-outline"></ion-icon>
      <h3>2. სურათები</h3>

      </div>
      <div className="details-line">

      </div>
      <div  onClick={()=>setStep(3)}>
      <ion-icon name="grid-outline"></ion-icon>
      <h3>3. მაგიდები</h3>

      </div>
      <div className="details-line">
        
        </div>
        <div  onClick={()=>setStep(4)}>
          <ion-icon name="fast-food-outline"></ion-icon>
          <h3>4. მენიუ</h3>

        </div>
        <div className="details-line">
          
        </div>
        <div  onClick={()=>setStep(5)}>
          <ion-icon name="flag-outline"></ion-icon>
          <h3>5. დასასრული</h3>

        </div >
 
    </div>

        </div>

        <div className='footerFirst'>
    <h3 >powered by MIKITANI</h3>
    <h3>2024</h3>
    
        </div>
      <img className="ilustrationDetails" src="../../../public/sdasdasd.png" alt="" />
{/* 
      <div className="red-frame1">
 ''
</div> */}
<div className="red-frame2" style={{color:"#D9D9D9",cursor:'default'}}>
s
</div>

    
      <form onSubmit={handleSubmit(onSubmit)} action="" className="form-first" id="form">
          {/* <div className="form-control-first">
            <label> Restaurant name 
              <input type="text" id="name" placeholder="Enter restaurant name" {...register("restaurantName")} />
            </label>
            <small>{errors.restaurantName?.message }</small>
          </div> */}

<div class="coolinput">
    <label for="input" class="text">ქართული აღწერა:</label>
    <textarea type="text" id="discription"  placeholder="შეიყვანეთ რესტორნის აღწერა ქართულ ენაზე" name="input" class="input" {...register("descriptionGeo")}/>
    <small >{errors.descriptionGeo?.message }</small>

</div>

<div class="coolinput">
    <label for="input" class="text">ინგლისური აღწერა:</label>
    <textarea type="text" id="discription"  placeholder="შეიყვანეთ რესტორნის აღწერა ინგლისურ ენაზე" name="input" class="input"  {...register("description")} />
    <small>{errors.description?.message }</small>

</div>


        {/* <div className="form-control-first">
<label style={{fontFamily: 'YourCustomFont, sans-serif'}}>ინგლისური აღწერა    
<textarea type="text" id="discription"  placeholder="შეიყვანეთ რესტორნის აღწერა ინგლისურ ენაზე" {...register("description")}/>
</label>
<small>{errors.description?.message }</small>
</div> */}


{
  isOpenMap ? <Map/> : <></>
}
<div className="first-flex1">

<div style={{width:'45%'}} class="coolinput">
    <label for="input" class="text">მისამართი ქართულად:</label>
    <input type="text" id="table"  placeholder="შეიყვანეთ მისამართი ქართულად" name="input" class="input"  {...register("adressGeorgian")} />
    <small>{errors.adressGeorgian?.message}</small>

</div>
<div style={{width:'45%'}} class="coolinput">
    <label for="input" class="text">მისამართი ინგლისურად:</label>
    <input type="text" id="table"  placeholder="შეიყვანეთ მისამართი ინგლისურად" name="input" class="input"  {...register("adressEnglish")} />
    <small>{errors.adressEnglish?.message}</small>

</div>


</div>


<div className="first-flex2" onClick={()=>{
  if(isOpenMap){
    setIsOpenMap(false)
  } else{
    setIsOpenMap(true)
  }
}}>

<div className="exact-location">
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

<div style={{display:'flex',alignItems:'center', width:'97%',justifyContent:'space-between',marginBottom:'3%',marginTop:'2%'}}>
  <div className="form-control-details">

<label  style={{fontFamily: 'YourCustomFont, sans-serif'}}>
ფასის კატეგორია
</label>
        <SelectInput isEdit={true} defaultValue="₾ __ 0 - 50 ლარი" options={options} onChange={handleOptionChange} />
  </div>

  <div className="form-control-details">
  <label style={{fontFamily: 'YourCustomFont, sans-serif'}} >
რესტორნის ტიპი
</label>

        <SelectInput isEdit={true}  defaultValue="Restaurant" options={options1} onChange={handleOptionChange1} />
  </div>

  <div className="form-control-details">

  <label style={{fontFamily: 'YourCustomFont, sans-serif'}} >
რეგიონი / ქალაქი
  </label>
  <SelectInput isEdit={true}  defaultValue="თბილისი" options={options3} onChange={handleOptionChange3} />

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
          disabled={stateRestaurant?.is24Hall}
          sx={{ '& .MuiInputLabel-root': { fontFamily: 'YourCustomFont, sans-serif',fontSize:'18px' } }} // Custom styles for label

        />
      </DemoContainer>
    </LocalizationProvider>
{/* <input  type="time"  id="hallStart"  disabled={stateRestaurant?.is24Hall}   {...register("hallStart")}/> */}
{
  (showErrorMessage && !stateRestaurant?.is24Hall )&& 
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
          disabled={stateRestaurant?.is24Hall}
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
          disabled={stateRestaurant?.is24}
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
          disabled={stateRestaurant?.is24}
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
          disabled={stateRestaurant?.is24Music}
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
          disabled={stateRestaurant?.is24Music}
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





        {/* <div className="form-control-first">
          <label htmlFor="image1">Image 1</label>
          <input
            type="file"
            id="image1"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image1", { validate: value => value[0] !== undefined })}
          />
          <small>{errors.image1?.message}</small>
        </div>
        <div className="form-control-first">
          <label htmlFor="image2">Image 2</label>
          <input
            type="file"
            id="image2"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image2", { validate: value => value[0] !== undefined })}
          />
          <small>{errors.image2?.message}</small>
        </div>
        <div className="form-control-first">
          <label htmlFor="image3">Image 3</label>
          <input
            type="file"
            id="image3"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image3", { validate: value => value[0] !== undefined })}
          />
          <small>{errors.image3?.message}</small>
        </div> */}
        <button onClick={()=>setShowErrorMessage(true)} className="first-step-button" type="submit" >
          შემდეგი
        </button>
        
      </form>
 
      </div>
  
    </div>
  );
      }

// export default function FirstStep() {
  
// AIzaSyBsmdW7MjD92WUdZRaki62oVdx6O1X8feU

