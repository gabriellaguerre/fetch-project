import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {breeds, getDogBreed, getSearches, searchDog, getDogDetails, postSearchDog, nextPrevList, dogMatch } from '../../redux/dogsSlice';
import './BreedsResult.css'
import dogWaiting from '../../assets/dogwaiting-pic.png'


function BreedsResult({thisPage, totalPage}) {
  const dispatch = useDispatch();
  console.log(thisPage, totalPage, 'thisPage, totalPages')
  const details = useSelector(getDogDetails);
  const searchResult = useSelector(getSearches)

  let total = searchResult.total;
  let nextUrl = searchResult.next;
  let previousUrl = searchResult.prev
  let list = searchResult.resultIds

  const [likeID, setLikeID] = useState([]);
  const [page, setPage] = useState(1)
  const [goToPage, setGoToPage] = useState("")
  const [matchedDog, setMatchedDog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  
  console.log(page, 'page line 25')
 
    const handleNext = async () => {
      
      let getNextList = await dispatch(nextPrevList(nextUrl));
      // console.log(getNextList, 'getNextList line 33')
  
      let dogs2 = await dispatch(postSearchDog(getNextList.payload.resultIds))
  
      // console.log(dogs2, 'dogs after pressing Next line 36')
    }

    const handlePrevious = async () => {
      
      // console.log(previousUrl, 'prev line 40')
 
      let getPrevList = await dispatch(nextPrevList(previousUrl));
      // console.log(getPrevList, 'getNextList line 33')
 
      let dogs2 = await dispatch(postSearchDog(getPrevList.payload.resultIds))
  
      // console.log(dogs2, 'dogs after pressing Prev line 46')
  }

  const likeDogs = (id) => {
    // console.log(id, 'id')
    if(!likeID.includes(id)) {
       setLikeID((prev)=> [...prev, id])
    }

  }
  // console.log(likeID, 'likeId')

  const match = async (likeID) => {
    // console.log('inside match function')
    let foundDog = await dispatch(dogMatch(likeID));
    // console.log(foundDog.payload.match, 'foundDog')
    // console.log(details, 'details in match function')
    let dogData = details.filter(dog => dog.id === foundDog.payload.match)

    if(dogData) {
      console.log('inside if statement with dogdata')
      setMatchedDog(dogData);
      setIsModalOpen(true)
    }
    // console.log(dogData, 'dogData')

  }
// 

  return (
    <>
    <div className='topRow'>
    <div className='totalFinds'>Total Finds: {total}</div>
    <div className='nexPrevButtons'>
    {(details.length>0 && totalPage) && (
      <div>page {page} of {totalPage} pages</div>
    )}
  
    <div><button onClick={()=>{setPage(page-1);handlePrevious()}} disabled={!previousUrl || page === 0}>&lt; Previous</button></div>
    <div><button onClick={()=>{setPage(page+1);handleNext()}} disabled={!nextUrl || page === totalPage }>Next &gt;</button></div>
   
    </div>
    <div><button onClick={()=>match(likeID)} disabled={details.length===0}>Match</button></div>
    </div>

    {details.length>0 ? (
        <div className='resultDisplayed'>
          {details?.map(dog =>
            <button key={dog.id} className='dogSet' onClick={()=>likeDogs(dog.id)}>
                <div><img src={dog.img} className='dogImage'/> </div>
                <div>Name: {dog.name}</div>
                <div>Age: {dog.age}</div>
                <div>Breed: {dog.breed}</div>
             </button>
        )}
        </div>
    ):(
      <div className='waitingDogDiv'><img src={dogWaiting} className='waitingDogImg'/></div>
    )}
    
    </>
  )
}

export default BreedsResult;
