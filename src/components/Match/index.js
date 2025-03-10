import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMatched, getLikeDogs, clearMatchedDog } from '../../redux/dogsSlice';
import { selectUser } from '../../redux/usersSlice';
import { useModal } from '../Context/Modal';
import Map from '../Map'
import './Match.css'


function Match() {
  const dispatch = useDispatch()
  const likeList = useSelector(getLikeDogs)
  const matchedWithDog = useSelector(getMatched)
  const user = useSelector(selectUser)
  const { closeModal } = useModal();

  let matched = likeList.filter(dog => dog.id === matchedWithDog?.match)
  // console.log(matched, 'matched line 15')

  return (
    <div className="matchModalContainer">

      {matched ? (
        <>
          <div className='gridArea11'>
          <div>CONGRATULATIONS {user}!!!! </div></div>
          <div className='gridArea21'>
          <div>YOU ARE MATCHED WITH:</div></div>
        
          <div className='gridArea31'>
         
          <img src={matched[0]?.img} alt={matched[0]?.name} className="dogImageMatch" />
          <div>Name: {matched[0]?.name}</div>
          <div>Age: {matched[0]?.age}</div>
          <div>Breed:{matched[0]?.breed}</div></div>

          <div className='gridArea41'>
          <div><Map location={matched} /></div></div>
        
       
        </>
      ) : (
        <div>LOADING.......</div>
      )}
      <div className='gridArea51'>
      <button onClick={() => { dispatch(clearMatchedDog()); { closeModal() } }} className="close-btn">Close</button></div>

    </div>
  )
}
export default Match;
