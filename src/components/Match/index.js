import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getMatched, getLikeDogs} from '../../redux/dogsSlice';
import { useModal } from '../Context/Modal';
import './Match.css'


function Match() {

     const likeList = useSelector(getLikeDogs)
     const matchedWithDog = useSelector(getMatched)

    console.log(likeList, matchedWithDog, 'likeList, matchedWithDog in match function line 9')
    let matched = likeList.filter(dog => dog.id === matchedWithDog?.match)
    // console.log(matched, 'matched line 15')

    const dispatch = useDispatch();
    const { closeModal } = useModal();


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
        ):(
        <div>LOADING.......</div>
        )}
      
        <button onClick={closeModal} className="close-btn">Close</button>
     
    </div>
    )
}
export default Match;
