import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMatched, getLikeDogs, clearMatchedDog } from '../../redux/dogsSlice';
import { selectUser } from '../../redux/usersSlice';
import { useModal } from '../Context/Modal';
// import Map from '../Map'
import './Match.css'
import balloons from '../../assets/balloons.png'
import confetti_right from '../../assets/confetti-5182.png'
import confetti_left from '../../assets/confetti-5182-left.png'



function Match() {
  const dispatch = useDispatch()
  const likeList = useSelector(getLikeDogs)
  const matchedWithDog = useSelector(getMatched)
  const user = useSelector(selectUser)
  const { closeModal } = useModal();

  let matched = likeList.filter(dog => dog.id === matchedWithDog?.match)
  // console.log(matched, 'matched line 15')
  let currentUser = user[0].toUpperCase() + user.slice(1)

  return (
    <div className="matchModalContainer">

      {matched ? (
        <>
          <div className='gridArea11'>
          <div className='congrats'><img src={confetti_right} className="confettiPic" alt='confettiimg' />CONGRATULATIONS {currentUser}!!!! <img src={confetti_left} className="confettiPic" alt='confettiimg' /></div></div>
          <div className='gridArea21'>
          <div>YOU ARE MATCHED WITH: {matched[0]?.name}<img src={balloons} className="confettiPic" alt='confettiimg' /></div></div>

          <div className='gridArea31'>

          <img src={matched[0]?.img} alt={matched[0]?.name} className="dogImageMatch" />
          {/* <div>Name: {matched[0]?.name}</div> */}
          <div>{matched[0]?.age} yrs old</div>
          <div>{matched[0]?.breed}</div></div>

          {/* <div className='gridArea41'> */}
          {/* <div><Map location={matched} /></div> */}
          {/* </div> */}


        </>
      ) : (
        <div>LOADING.......</div>
      )}
      <div className='gridArea51'>
      <button onClick={() => { dispatch(clearMatchedDog());  closeModal()  }} className="close-btn">Close</button></div>

    </div>
  )
}
export default Match;
