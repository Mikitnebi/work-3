import "./information.css"


export const Information =({close}) =>{


    

    return(
        <div className="information">
            <img  className='logoInPincode' src="../../../public/img/Group4.png" alt="Main Logo" />

            <p style={{fontSize:'24px', fontWeight:'400'}}>We will definitely contact you within an hour and go through the final details with you</p>
            <button onClick={(e) =>{
                close(false);
            }} className="information-button">OK</button>
        </div>
       
    )
}

