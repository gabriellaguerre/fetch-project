import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getMatched} from '../../redux/dogsSlice';
import { useModal } from '../Context/Modal';


function Match({matchedDog}) {

    console.log(matchedDog, 'in match function line 9')

    const dispatch = useDispatch();
    const { closeModal } = useModal();


    return (
        <div className="modal-overlay">
      <div className="modal-content">
        <h2>Match Found!</h2>
        {/* <img src={match.img} alt={match.name} className="dogImage" />
        <p><strong>Name:</strong> {match.name}</p>
        <p><strong>Age:</strong> {match.age}</p>
        <p><strong>Breed:</strong> {match.breed}</p> */}

        <button onClick={closeModal} className="close-btn">Close</button>
      </div>
    </div>
    )
}
export default Match;
