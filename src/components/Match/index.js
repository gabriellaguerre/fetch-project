import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMatched, getLikeDogs, clearMatchedDog } from '../../redux/dogsSlice';
import { useModal } from '../Context/Modal';
import './Match.css'


function Match() {
  const dispatch = useDispatch()
  const likeList = useSelector(getLikeDogs)
  const matchedWithDog = useSelector(getMatched)
  const { closeModal } = useModal();

  let matched = likeList.filter(dog => dog.id === matchedWithDog?.match)

  return (
    <div className="matchModalContainer">

      {matched ? (
        <>
          <div>CONGRATULATIONS!!!! WE FOUND A MATCH!!!</div>
          <div>YOU ARE MATCHED WITH:</div>
          <img src={matched[0]?.img} alt={matched[0]?.name} className="dogImage" />
          <div>Name: {matched[0]?.name}</div>
          <div>Age: {matched[0]?.age}</div>
          <div>Breed:{matched[0]?.breed}</div>
        </>
      ) : (
        <div>LOADING.......</div>
      )}

      <button onClick={() => { dispatch(clearMatchedDog()); { closeModal() } }} className="close-btn">Close</button>

    </div>
  )
}
export default Match;
