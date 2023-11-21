import React, { createContext } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import { StoreContextRecipe } from '../../App';
import './modalManu.css'

import { limitRecipeTitle } from '../../utils';


export default function ModalManu({ open, children, onClose,menu,setMenu }) {

  const {stateRecipe, stateManu,stateManuName ,stateManuPrice, dispatchManu} = useContext(StoreContextRecipe);



  let payment = 0;


    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(6);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=pizza`);
          setData(result?.data?.recipes);
        } catch (error) {
          setError('Error fetching data from the API');
        } finally {
          setLoading(false);
        }
      };
  
        fetchData();
      
    }, []);

  // const { isLoading, isError, data, error, refetch } = useQuery(stateRecipe?.inputQuery, fetchData, { 
  //     variables: stateRecipe?.inputQuery,
  //     skip: !stateRecipe?.inputQuery,
      
  //  });

  // async function fetchData({ queryKey }){
  //     const [q] = queryKey;
  //     if(!q) return [];
  //     const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=pizza`);


  //     return result?.data?.recipes;
  // };

  useEffect(() => {
    stateRecipe?.inputQuery && refetch();
    setPage(1);
}, [stateRecipe?.inputQuery]);

useEffect(() => {
    setStart((page - 1) * 10);
    setEnd(page * 10);
},[page]);
const handleDelete = (key) => {
  setMenu((prevMenu) => {
    const updatedMenu = new Map(prevMenu);
    updatedMenu.delete(key);
    return updatedMenu;
  });
};
  

if (loading) {
  return (
      <div className="loader">
          <svg>
              <use href="img/icons.svg#icon-cw"></use>
          </svg>
      </div>
  )
}



if (error) {
  return <div className='error'>Cant' find enything...</div>
}
    
  if (!open)
    return null

    
    // const changeQuantity = (el) =>{
      
    // }
    // console.log(menu)
  // const  clearMenuQuantity = function () {
  //   menu.clear();
  // }

  return ReactDom.createPortal(

    <>
      <div className='overlay-style' onClick={()=> {onClose();  }}  />
        <div className='modal-styles-manu' >
            <button className='button-x' onClick={()=> {onClose();  }}><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button>
          
          

 <div className="results__pages-manu">
    { page > 1 && page <= (Math.ceil(data?.length / 10)) && <button className="btn-inline results__btn--prev-manu" onClick={() => setPage(value => value - 1)}>
        <span>Prev { page - 1 }</span>
        <svg className="search__icon-manu">
            <use href="/img/icons.svg#icon-triangle-left"></use>
        </svg>
    </button>}
    {page < (Math.ceil(data?.length / 10)) && <button className="btn-inline results__btn--next-manu"  onClick={() => setPage(value => value + 1)}>
        <span>Next { page + 1 }</span>
        <svg className="search__icon-manu">
            <use href="/img/icons.svg#icon-triangle-right"></use>
        </svg>
    </button>}
</div> 
   
  <div className='restaurants-view-manu'>
    {
      data && data?.slice(start, end).map((el, index) => (
      <li key={el.recipe_id} className='restaurant-card-manu'>
        <form>
          <a   className='restaurant-manu'>
            <figure className="restaurant__fig-manu">
              
              <img src={el?.image_url} alt={limitRecipeTitle(el?.title)}/>
            </figure>
              <h4 className="restaurant__name-manu">{limitRecipeTitle(el?.title)}</h4>
              <input  className='manu-input' type="number" value={menu.get(`${el.recipe_id}`)?.[0] } min="0" 
                onChange={(e) => {   
                  menu.set(`${el.recipe_id}`, [e.target.value,10,limitRecipeTitle(el?.title)])
                  
                }}  
               /> 
              <h2 className='manu-price'>10$</h2>
          </a>
        </form>
      </li> ))
}

</div> 
<div className='chek-div'>
{            
Array.from(menu.entries()).map(([key, value]) =>{
  if(value[0] != 0){
    payment = payment + value[1]*value[0];
    return(
      <>
        <div className='chek-dishes' key={key}> {` ${value[0]} ${value[2]} .................................... ჯამში ${value[1]*value[0]} $`}
          <button onClick={(e) => {
            // console.log(disheName[index])
            handleDelete(key);
          }} className='delete-dish'><ion-icon className='icon-modal-check' size="large" name="close"></ion-icon></button>
        </div>
       
      </>
    )
  }

})
}


              <div className='payment'>{`: ჯამში ${payment} $`}</div>
              </div>
        </div>
    </> ,
    document.getElementById('portal7')

  )
}









{/* <div className='restaurants-view-manu'>
        
{
data && data?.slice(start, end).map((el, index) => (
    <li key={index} className='restaurant-card-manu'>
        <a   className='restaurant-manu'>
            <figure className="restaurant__fig-manu">
                <img src={el?.image_url} alt={limitRecipeTitle(el?.title)}/>
            </figure>
                <h4 className="restaurant__name-manu">{limitRecipeTitle(el?.title)}</h4>
              <input onChange={(e) => console.log(`${el?.title} "  " ${e.target.value}`)} className='manu-input' type="number" />
              <h2 className='manu-price'>10$</h2>
        </a>
    </li> ))
}

</div> */}