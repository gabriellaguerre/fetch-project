import React from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../Context/Modal';


function MatchModal({match, onClose}) {

    // if(!match) return null;

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    console.log(match, 'match in Match function')




    return (
        <div className="modal-overlay">
      <div className="modal-content">
        <h2>Match Found!</h2>
        <img src={match.img} alt={match.name} className="dogImage" />
        <p><strong>Name:</strong> {match.name}</p>
        <p><strong>Age:</strong> {match.age}</p>
        <p><strong>Breed:</strong> {match.breed}</p>

        <button onClick={closeModal} className="close-btn">Close</button>
      </div>
    </div>
    )
}
export default MatchModal;
