import { useNavigate } from 'react-router-dom';
import './style.css';
import BookCard from './reservationCard';
import { useContext, useState } from 'react';
import { StoreContextRecipe } from '../../App';

export default function Reservations() {
  const navigate = useNavigate();
  const date = new Date();

  const formattedDate = date.toLocaleString('en-GB', {
    hour12: false,
    timeZone: 'Asia/Tbilisi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const [activeOption, setActiveOption] = useState(0);
  const { stateRecipe,dispatchRecipe } = useContext(StoreContextRecipe);

  const handleOptionClick = (index) => {
    setActiveOption(index);
  };

  return (
    <div id='book' className="reservation-interface">
      <div className='frame'>
        <button className='button-x-last5' onClick={(e) => navigate("/home")}>
          <ion-icon className='icon-modal' size='large' name="close"></ion-icon>
        </button>

        <h1 style={{ fontFamily: "cursive" }}>Requests</h1>

        <div className='reservation-options'>
          <a
            className={activeOption === 0 ? 'active-option' : ''}
            onClick={() => handleOptionClick(0)}
          >
            Active Request
          </a>
          <a
            className={activeOption === 1 ? 'active-option' : ''}
            onClick={() => handleOptionClick(1)}
          >
            Today's Reservations
          </a>
          <a
            className={activeOption === 2 ? 'active-option' : ''}
            onClick={() => handleOptionClick(2)}
          >
            All reservations
          </a>
        </div>

        <div className='choosen-reservation'>
          <div className="likes__panel">
          {stateRecipe.requests
      .filter(request => (activeOption == 0 ? request.status : !request.status)) // Filter out items with status false
      .map((request, index) => (
        <BookCard
          key={index}
          name={request.name}
          person={request.person}
          aditional={request.aditional}
          data={formattedDate}
          img={request.img}
          id={request.id}
          status={request.status}
          position={request.position}
          tableNumber={request.tableNumber}
        />
      ))}
          </div>
        </div>
      </div>
    </div>
  );
}