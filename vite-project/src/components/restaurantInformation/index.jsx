import { yupResolver } from "@hookform/resolvers/yup";
import  { useContext, useRef,  } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./style.css";
import { StoreContextRecipe } from "../../App";
import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  
} from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";
import { LastStep } from "../lastStep";
import { LastStep1 } from "../lastStep/index1";
import { Tables } from "../addTables";
import { Tables1 } from "../addTables/index1";
import { useNavigate, useNavigation } from "react-router-dom";
import { TablesForProfile } from "../addTables/index2";
import RestaurantFloorForDetails from "../addTables/restaurantFloorsForDetails";


export default function Profile () {
const navigate = useNavigate() 
    const [street, setStreet] = useState('');

    const [isOpenMap, setIsOpenMap] = useState(false);
  
  
    const [isAdditionalInfoVisible, setAdditionalInfoVisible] = useState(false);
  
    const toggleAdditionalInfo = () => {
      setAdditionalInfoVisible(!isAdditionalInfoVisible);
    };
  
    const { isSearchVisible, setIsSearchVisible,stateRestaurant, dispatchRestaurant,stateUser, dispatchUser, stateRecipe, dispatchRecipe } = useContext(StoreContextRecipe);
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
  
  console.log(stateRestaurant)
  
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
          mapContainerStyle={{zIndex:"5",position:"absolute",top:'2%',left:'45%',borderRadius:"20px", height: "300px", width: "500px" }}
          mapContainerClassName="map-container"
          onLoad={(map) => setMap(map)} // Store the map object when it loads
          onClick={handleMapClick}      >
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
          style={{width:'60%',borderRadius:'20px',position:"absolute", left:'95%',top:'10px'}}
        />
        <ComboboxPopover>
          <ComboboxList>
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
  
  if (!stateRestaurant?.is24) {
    if(!stateRestaurant?.is24Hall){
      schema = yup.object().shape({
        // restaurantName: yup.string().max(50).required(),
        description: yup.string().max(500).required(),
        cupeQuantity: yup.number().min(0, 'Number must be greater than or equal to 0'),
        tableQuantity: yup.number().min(-1, 'Number must be greater than or equal to 0').required(),
        terraceQuantity: yup.number().min(0, 'Number must be greater than or equal to 0'),
        hallStart: yup.string().matches(
          /^([01]\d|2[0-3]):[0-5]\d$/,
          'Invalid time format (HH:MM)'
        ).required('Time is required'),
        hallEnd:  yup.string().matches(
          /^([01]\d|2[0-3]):[0-5]\d$/,
          'Invalid time format (HH:MM)'
        ).required('Time is required'),
        kitchenStart: yup.string().matches(
          /^([01]\d|2[0-3]):[0-5]\d$/,
          'Invalid time format (HH:MM)'
        ).required('Time is required'),
        kitchenEnd: yup.string().matches(
          /^([01]\d|2[0-3]):[0-5]\d$/,
          'Invalid time format (HH:MM)'
        ).required('Time is required'),
      });
    } else{
      schema = yup.object().shape({
        // restaurantName: yup.string().max(50).required(),
        description: yup.string().max(500).required(),
        cupeQuantity: yup.number().min(0, 'Number must be greater than or equal to 0'),
        tableQuantity: yup.number().min(-1, 'Number must be greater than or equal to 0').required(),
        terraceQuantity: yup.number().min(0, 'Number must be greater than or equal to 0'),
        kitchenStart: yup.string().matches(
          /^([01]\d|2[0-3]):[0-5]\d$/,
          'Invalid time format (HH:MM)'
        ).required('Time is required'),
        kitchenEnd: yup.string().matches(
          /^([01]\d|2[0-3]):[0-5]\d$/,
          'Invalid time format (HH:MM)'
        ).required('Time is required'),
      });
    }
    
  } else {
    if(stateRestaurant?.is24Hall){
      schema = yup.object().shape({
        // restaurantName: yup.string().max(50).required(),
        description: yup.string().max(500).required(),
        cupeQuantity: yup.number().min(0, 'Number must be greater than or equal to 0').required(),
        tableQuantity: yup.number().min(-1, 'Number must be greater than 0').required(),
        terraceQuantity: yup.number().min(0, 'Number must be greater than or equal to 0').required(),
      });
    } else {
      schema = yup.object().shape({
        // restaurantName: yup.string().max(50).required(),
        description: yup.string().max(500).required(),
        cupeQuantity: yup.number().min(0, 'Number must be greater than or equal to 0').required(),
        tableQuantity: yup.number().min(-1, 'Number must be greater than 0').required(),
        terraceQuantity: yup.number().min(0, 'Number must be greater than or equal to 0').required(),
        hallStart: yup.string().matches(
          /^([01]\d|2[0-3]):[0-5]\d$/,
          'Invalid time format (HH:MM)'
        ).required('Time is required'),
        hallEnd:  yup.string().matches(
          /^([01]\d|2[0-3]):[0-5]\d$/,
          'Invalid time format (HH:MM)'
        ).required('Time is required'),
        
      });
    }
    
  }
  
   
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        // restaurantName: stateRestaurant?.name || '',
        description: stateRestaurant?.description || '',
        location: stateRestaurant?.location || '',
        cupeQuantity: stateRestaurant?.cupeQuantity || 0,
        tableQuantity: stateRestaurant?.tableQuantity || '',
        terraceQuantity: stateRestaurant?.terraceQuantity || 0,
        hallStart: stateRestaurant?.hallStart || '',
        hallEnd: stateRestaurant?.hallEnd || '',
        ...(stateRestaurant?.is24
          ? {}
          : {
              kitchenStart: stateRestaurant?.kitchenStart || '',
              kitchenEnd: stateRestaurant?.kitchenEnd || '',
            }),
        musicStart:  stateRestaurant?.musicStart || '',
        musicEnd:  stateRestaurant?.musicEnd || '',
      },
    });
    // console.log(stateRestaurant)
  
    const onSubmit = (data) => {
  
     
      let hallStartHour
      let hallStartMinute
      let hallEndHour 
      let hallEndMinute 
      let kitchenStartHour
      let kitchenStartMinute
      let kitchenEndHour 
      let kitchenEndMinute 
      let [musicStartHour, musicStartMinute] = data.musicStart && data.musicStart.split(":");
      let [musicEndHour, musicEndMinute] = data.musicEnd && data.musicEnd.split(":");
      if(stateRestaurant.is24){
        kitchenStartHour=24
        kitchenEndHour=24
        kitchenStartMinute=0
        kitchenEndMinute=0
      }
      else{
        [kitchenStartHour,kitchenStartMinute]= data.kitchenStart.split(":")
        [kitchenEndMinute,kitchenEndMinute] =  data.kitchenEnd.split(":")
      }
      if(stateRestaurant.is24Hall){
        hallStartHour=24
        hallEndHour=24
        hallStartMinute=0
        hallEndHour=0
      }
      else{
       [hallStartHour, hallStartMinute] = data.hallStart.split(":");
       [hallEndHour, hallEndMinute] =   data.hallEnd.split(":");
      }
  
  
      // axios
      //     .post("http://3.66.89.33/Restaurant/registration/StarterInfo",{
      //       locationX: Lng.current,
      //       locationY: Lat.current,
      //       address: formattedAddressRef.current,
      //       businessTypeId: 0,
      //       coupeQuantity: data.cupeQuantity,
      //       tableQuantity: data.tableQuantity,
      //       terraceQuantity: data.terraceQuantity,
      //       hallStartHour: hallStartHour*1,
      //       hallEndHour: hallEndHour*1,
      //       hallStartMinute: hallStartMinute*1,
      //       hallEndMinute: hallEndMinute*1,
      //       kitchenStartHour: kitchenStartHour*1,
      //       kitchenEndHour: kitchenEndHour*1,
      //       kitchenStartMinute: kitchenEndMinute*1,
      //       kitchenEndMinute: kitchenEndMinute*1,
      //       musicStartHour: musicStartHour*1,
      //       musicEndHour: musicEndHour*1,
      //       musicStartMinute: musicStartMinute*1,
      //       musicEndMinute: musicEndMinute*1,
      //       forCorporateEvents: stateRestaurant.corporative,
      //       description: data.description,
      //       activeStatusId: 1,
      //       twoStepAuth: stateRestaurant.doubleSecurity
      //     })
      //     .then(response =>{
              
     
          // })
          // .catch(error =>{
          //     console.log(error);
             
          // })
          // .finally(() => {
          //     console.log(stateRestaurant)
  
          // });
  
  
         
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
            propertyId: "cupeQuantity",
            value: data.cupeQuantity,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "tableQuantity",
            value: data.tableQuantity,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "terraceQuantity",
            value: data.terraceQuantity,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "hallStart",
            value: data.hallStart,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "hallEnd",
            value: data.hallEnd,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "kitchenStart",
            value: data.kitchenStart,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "kitchenEnd",
            value: data.kitchenEnd,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "musicStart",
            value: data.musicStart,
          });
          dispatchRestaurant({
            type: "changePrimitiveType",
            propertyId: "musicEnd",
            value: data.musicEnd,
          });
  
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
  

    return( 
        <section className='last-registration2'>
                      <button  className='button-x-last' onClick={(e) => navigate("/home")} ><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button>

            <h3  style={{marginLeft:"30%",marginTop:"3%",color:'navy',fontWeight:'bold',fontSize:"25px"}}>Your Restaurant Information</h3>
            <form onSubmit={handleSubmit(onSubmit)} action="" className="form" id="form">
            <button type="submit">Save changes</button>
    
          <div className="form-control-first">
<label >description    
<textarea type="text" id="discription"  placeholder="Enter restaurant's description" {...register("description")}/>
</label>
<small>{errors.description?.message }</small>
</div>

<div style={{display:'flex',alignItems:"center", marginTop:"20px", cursor:'pointer'}} onClick={()=>{
  if(isOpenMap){
    setIsOpenMap(false)
  } else{
    setIsOpenMap(true)
  }
}}> Restaurant location
<ion-icon  name="location-outline" size={'large'}/>
</div>
{!formattedAddressRef.current && <small style={{ color: 'red' }}>{'Select your location '}</small>}
<li>Chosen location :<span style={{color:"#ec0f6f"}}>{formattedAddressRef.current}</span> </li>

{
  isOpenMap ? <Map/> : <></>
}
<div style={{marginTop:"20px"}} className="form-control-first">
<label >Table Quantity    
<input type="number"  id="table"  placeholder="Enter restaurant's table Quantity" {...register("tableQuantity")}/>
</label>
<small>{errors.tableQuantity?.message }</small>
</div>

<div style={{marginTop:"20px"}} className="form-control-first">
<label >Cupe Quantity    
<input type="number"  id="cupe"  placeholder="Enter restaurant's cupe Quantity" {...register("cupeQuantity")}/>
</label>
<small>{errors.cupeQuantity?.message }</small>
</div>

<div style={{marginTop:"20px"}} className="form-control-first">
<label >Terrace Quantity    
<input type="number"  id="terrace"  placeholder="Enter restaurant's terrace Quantity" {...register("terraceQuantity")}/>
</label>
<small>{errors.terraceQuantity?.message }</small>
</div>

<div  style={{alignItems:'center', width:'100%'}} className="first-flex">
<div style={{marginTop:"20px"}} className="form-control-first">
<label >Hall starting time    
<input style={{width:"100%"}} type="time"  id="hallStart"  disabled={stateRestaurant?.is24Hall}   {...register("hallStart")}/>
</label>
<small style={{bottom:'-20%'}}>{errors.hallStart?.message }</small>
</div>

<div style={{marginTop:"20px"}} className="form-control-first">
<label >Hall ending time    
<input style={{width:"100%"}} type="time"  id="hallEnd"  disabled={stateRestaurant?.is24Hall}   {...register("hallEnd")}/>
</label>
<small style={{bottom:'-20%'}}>{errors.hallEnd?.message }</small>
</div>
<div style={{marginTop:"20px" }} className="form-control-first">
<label  style={{display:'flex' ,width:'100%'}}>24 Hour hall    
<input
  style={{ width: '20px', marginLeft: '10px' }}
  type="checkbox"
   // Set the checked state based on stateRestaurant?.is24
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
</label>
</div>
</div>

<div style={{alignItems:'center', width:'100%'}} className="first-flex">
<div style={{marginTop:"20px",}} className="form-control-first">
<label >Kitchen opening time    
<input style={{width:"100%"}} type="time"  id="kitchenStart" disabled={stateRestaurant?.is24}  {...register("kitchenStart")}/>
</label>
<small style={{bottom:'-20%'}}>{errors.kitchenStart?.message }</small>
</div>

<div style={{marginTop:"20px"}} className="form-control-first">
<label >Kitchen closing time    
<input style={{width:"100%",}} type="time"  id="kitchenEnd" disabled={stateRestaurant?.is24}  {...register("kitchenEnd")}/>
</label>
<small style={{bottom:'-20%'}}>{errors.kitchenEnd?.message }</small>
</div>

<div style={{marginTop:"20px" }} className="form-control-first">
<label  style={{display:'flex' ,width:'100%'}}>24 Hour kithen    
<input
  style={{ width: '20px', marginLeft: '10px' }}
  type="checkbox"
   // Set the checked state based on stateRestaurant?.is24
  onChange={() => {
    if (stateRestaurant?.is24) {
      dispatchRestaurant({
        type: "changePrimitiveType",
        propertyId: "is24",
        value: false,
      });
    } else {
      dispatchRestaurant({
        type: "changePrimitiveType",
        propertyId: "is24",
        value: true,
      });
    }
  }}
  defaultChecked={stateRestaurant?.is24}
/>
</label>
</div>

</div>


<div className="first-flex">
<div style={{marginTop:"20px"}} className="form-control-first">
<label >Music starting time    
<input style={{width:"100%"}} type="time"  id="musicStart"  {...register("musicStart")}/>
</label>
<small style={{bottom:'-20%'}}>{errors.musicStart?.message }</small>
</div>

<div style={{marginTop:"20px"}} className="form-control-first">
<label >Music ending time    
<input style={{width:"100%"}} type="time"  id="musicEnd"  {...register("musicEnd")}/>
</label>
<small style={{bottom:'-20%'}}>{errors.musicEnd?.message }</small>
</div>
</div>

<div className="first-flex">

<div style={{marginTop:"20px"}} className="form-control-first">
<label style={{display:"flex",width:'100%'}}>My restaurant is for corporatives    
<input onClick={()=>{
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
 style={{width:'20px', marginLeft:'10px'}} type="checkbox"    />
</label>
</div>
</div>

<div className="first-flex">

<div style={{marginTop:"20px" , display:'flex'}} className="form-control-first">
<label style={{display:"flex",width:'100%'}}>I want two step security    
<input onClick={()=>{
  if(stateRestaurant?.doubleSecurity){
    dispatchRestaurant({
      type: "changePrimitiveType",
      propertyId: "doubleSecurity",
      value: false,
    });
  }else {
    dispatchRestaurant({
      type: "changePrimitiveType",
      propertyId: "doubleSecurity",
      value: true,
    });
  }
}}
defaultChecked={stateRestaurant?.doubleSecurity}
style={{width:'20px', marginLeft:'10px'}} type="checkbox"    />

</label>
<ion-icon name="help-outline" size={'small'} onClick={toggleAdditionalInfo} ></ion-icon>

{isAdditionalInfoVisible && (
          <div
            style={{
              borderRadius: '20px',
              padding: '5px',
              width: '200px',
              backgroundColor: 'wheat',
              position: 'absolute',
              right: '-90%',
              top: '-50%',
            }}
          >
            ვასკა კუტუხოვივარ მასწავლებელო გამიღეეე 
          </div>
        )}</div>
</div>


       
      </form>
      <LastStep1/>
      <RestaurantFloorForDetails/>
        </section>

    )
} 