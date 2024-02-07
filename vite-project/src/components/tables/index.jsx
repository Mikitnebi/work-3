import React, { useContext, useEffect, useState } from 'react';
import { StoreContextRecipe } from '../../App';
import { Waypoint } from 'react-waypoint';
import './style.css';
import ModalManu from '../modals/modalManu';
import { useNavigate } from 'react-router-dom';
import { TablesForUse } from '../addTables/index3';
import RestaurantFloorForUse from '../addTables/restaurantFloorsForUse';

export default function Tables() {
  const { setIsSearchVisible } = useContext(StoreContextRecipe);
  const [tablesInfo, setTablesInfo] = useState([]);
  const [isOpenManu, setIsOpenManu] = useState(false)

  const [menu, setMenu] = useState(new Map());

  const clearMenu = function ()  {
    setMenu(new Map());
  };
const navigate = useNavigate()


  useEffect(() => {
    // Fetch data from local storage
    const tablesData = JSON.parse(localStorage.getItem('tablesInfo')) || [];
    setTablesInfo(tablesData);
  
    // Count total tables
    const totalTables = tablesData.reduce((acc, tableGroup) => acc + tableGroup.tableCount, 0);
  
    // Create an object to store tables
    const allTablesObject = {};
    for (let i = 1; i <= totalTables; i++) {
      allTablesObject[`table${i}`] = [];
    }
  
    // Store the object in local storage
    localStorage.setItem('allTables', JSON.stringify(allTablesObject));
  
    console.log('Total Tables:', totalTables);
  
  }, []);
  
  
  
  useEffect(() => {
    setIsSearchVisible(true);
  }, [setIsSearchVisible]);

  const [tableStatus, setTableStatus] = useState({});

  // Function to handle table status toggle
  const handleTableClick = (uniqueKey) => {
    setTableStatus((prevStatus) => ({
      ...prevStatus,
      [uniqueKey]: !prevStatus[uniqueKey], // Toggle the status
    }));
    // setIsOpenManu(true)
  };
  let counter = 0; // Counter for numbering the tables

  return (

    <div id="table" className="table-interface">
       <button className='button-x-last5' onClick={(e) => navigate("/home")} ><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button>
       
      <RestaurantFloorForUse/>
    </div>
  );
}


            
{/* <Waypoint onEnter={() => setIsSearchVisible(true)}>
<span className="search-spane"></span>
</Waypoint>
<ModalManu menu={menu} setMenu={setMenu} open={isOpenManu} onClose={() => {setIsOpenManu(false);  }}> </ModalManu>   

<div className="frame1">
<div style={{position:'absolute',top:'5%',left:"5%",display:'flex',width:'30%',justifyContent:'space-between'}}>
    <div>
            <div className='squaresForShow1'>

            </div>
            <h3>Free </h3>
    </div>
    <div>
        <div className='squaresForShow2'>

        </div>
        <h3>Taken</h3>
    </div>
    <div>
        <div className='squaresForShow3'>

        </div>
        <h3>In Progress</h3>
    </div>
    <div>
        <div className='squaresForShow4'>

        </div>
        <h3>Reserved</h3>
    </div>

</div>
<h1 style={{marginTop:'30%'}}>Tables</h1>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:'27%' }}>
  {tablesInfo.map((tableGroup, rowIndex) => (
    <div key={rowIndex} className="table-group">
      <p className="group-label">{`${tableGroup.tableCount} Tables with ${tableGroup.seatsCount} Seats`}</p>
      <div className="table-row-container">
        <div className="table-row">
          {[...Array(tableGroup.tableCount)].map((_, tableIndex) => {
            const uniqueKey = `${rowIndex}-${tableIndex}`;
            return (
              <div
                key={uniqueKey}
                className={`table-item ${tableStatus[uniqueKey] ? 'taken' : 'free'}`}
                onClick={() => handleTableClick(uniqueKey)}
              >
                {tableStatus[uniqueKey] ? `${++counter}` : `${++counter}`}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ))}
</div>
</div> */}











