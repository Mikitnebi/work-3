import "./information.css"


export const Information =({close}) =>{


    

    return(
        <div className="information">
            <p>We will definitely contact you within an hour and go through the final details with you</p>
            <button onClick={(e) =>{
                close(false);
            }} className="information-button">OK</button>
        </div>
       
    )
}

