import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {breeds, getDogBreed, getSearches, searchDog, getDogDetails, postSearchDog, nextList, dogMatch } from '../../redux/dogsSlice';
import './Table.css'
import MatchModal from '../Match';

function Table() {
  const dispatch = useDispatch();

  const details = useSelector(getDogDetails);
  const searchResult = useSelector(getSearches)
  
  const [likeID, setLikeID] = useState([]);
  const [matchedDog, setMatchedDog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let total = searchResult.total;
  let nextUrl = searchResult.next;
  let previousUrl = searchResult.prev
  let list = searchResult.resultIds
  
  console.log(total, 'total')
  console.log(details, 'details')  
  console.log(searchResult, 'searchResult')

    const handleNext = async () => {
        console.log(nextUrl, 'next')
        await dispatch(nextList(nextUrl));
        let dogs2 = await dispatch(postSearchDog(list))
        console.log(dogs2, 'dogs')
    }

    const handlePrevious = async () => {
      console.log(previousUrl, 'next')
      await dispatch(nextList(previousUrl));
      let dogs2 = await dispatch(postSearchDog(list))
      console.log(dogs2, 'dogs')
  }

  const likeDogs = (id) => {
    console.log(id, 'id')
    if(!likeID.includes(id)) {
       setLikeID((prev)=> [...prev, id])
    }
   
  }
  console.log(likeID, 'likeId')

  const match = async (likeID) => {
    console.log('inside match function')
    let foundDog = await dispatch(dogMatch(likeID));
    console.log(foundDog.payload.match, 'foundDog')
    console.log(details, 'details in match function')
    let dogData = details.filter(dog => dog.id === foundDog.payload.match)

    if(dogData) {
      console.log('inside if statement with dogdata')
      setMatchedDog(dogData);
      setIsModalOpen(true)
    }
    console.log(dogData, 'dogData')

  }

  return (
    <>
    <div>Total Finds: {total}</div>
    <div><button onClick={handleNext}>Next</button></div>
    <div><button onClick={handlePrevious}>Previous</button></div>
    <div><button onClick={()=>match(likeID)}>Match</button></div>
   
    <div className='resultDisplayed'>
          {details?.map(dog =>
            <button key={dog.id} className='dogSet' onClick={()=>likeDogs(dog.id)}>
                <div><img src={dog.img} className='dogImage'/> </div>
                <div>ID: {dog.id}</div>
                <div>Name: {dog.name}</div>
                <div>Age: {dog.age}</div>
                <div>Breed: {dog.breed}</div>
             </button>
        )}
    </div>
    </>
  )
}

export default Table;
