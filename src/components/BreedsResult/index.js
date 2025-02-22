import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addLikeDog, getSearches, getLikeDogs, getDogDetails, postSearchDog, nextPrevList, dogMatch,removeLikeDog, getMatched } from '../../redux/dogsSlice';
import OpenModalButton from '../OpenModalButton';
import Match from '../Match';
import './BreedsResult.css'
import dogWaiting from '../../assets/dogwaiting-pic.png'
import deleteImg from '../../assets/x.png';


function BreedsResult({size, sizeChange, totalPage}) {
  const dispatch = useDispatch();

  const details = useSelector(getDogDetails);
  const searchResult = useSelector(getSearches)
  const likeList = useSelector(getLikeDogs)
  const matchedWithDog = useSelector(getMatched)

  let total = searchResult.total;
  let nextUrl = searchResult.next;
  let previousUrl = searchResult.prev
  let list = searchResult.resultIds
  // console.log(likeList, 'likeList line 19')

  const [likeID, setLikeID] = useState([]);
  const [page, setPage] = useState(1)
  const [selectedDogs, setSelectedDogs] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(true)

  let dogData;
  // console.log(dogData, 'dogData line 32')
  // console.log(matchedWithDog?.match, 'matchedWithDog line 33')
  // console.log(size, totalPage, sizeChange, 'size, totalPages, sizeChange line 26')

  useEffect(()=> {
    if(totalPage === Infinity || totalPage<0) totalPage = 0
    if(sizeChange) setPage(1)
  }, [totalPage, sizeChange])

  // console.log(page, totalPage,  ' line 32')

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
  // console.log(likeID, 'likeID list line 58')

  const likeDogs = async (dog) => {
    console.log(dog, 'like dogs line 61')
    if(!likeID.includes(dog.id)) {
       setLikeID((prev)=> [...prev, dog.id])
       await dispatch(addLikeDog(dog))
    }
    setSelectedDogs((prevSelectedDogs) => {
      const newSelectedDogs = new Set(prevSelectedDogs);
      if (newSelectedDogs.has(dog.id)) {
        newSelectedDogs.delete(dog.id); // Deselect if already selected
      } else {
        newSelectedDogs.add(dog.id); // Select if not selected
      }
      return newSelectedDogs;
    });

  }
  // console.log(likeID, 'likeId')

  const match = async (likeID) => {
    // console.log('inside match function')
    let foundDog = await dispatch(dogMatch(likeID));
    // console.log(foundDog.payload.match, 'foundDog')
    // console.log(details, 'details in match function')
    dogData = details.filter(dog => dog.id === foundDog.payload.match)
    console.log(dogData, 'dogData line 89')

    if(dogData) {

      setIsModalOpen(true)
    }
    // console.log(dogData, 'dogData')

  }
  let removeLike = async (id) => {
    await dispatch(removeLikeDog(id))
    setSelectedDogs((prevSelectedDogs) => {
      const newSelectedDogs = new Set(prevSelectedDogs);
      newSelectedDogs.delete(id);
      return newSelectedDogs;
    });

  }

  let matched = likeList.filter(dog => dog.id === matchedWithDog?.match)
  // console.log(matchedWithDog?.match, matched, likeList, 'matched line 111')

  return (
    <>
    <div className='selectedFavorites'>

    <div>Your selected favorites will show here, when you are done selecting, click</div><div className='matchButtonDiv'><button className='matchButton' onClick={()=>match(likeID)} disabled={likeList.length===0}><OpenModalButton
                buttonText={<div className='getMatch'>Match</div>}
                modalComponent={<Match />}/>
                </button></div><div> to get matched with one of your favorites:</div>

      </div>
    <div className='selectedDogsList'>
      {likeList.map((dog)=>
    <div key={dog.id} className='selectedDogsSet'>
      <div><img src={dog.img} className='dogImageSelected'/> </div>
      <div>{dog.name} {dog.age}</div>
      <div><button className='removeDogFromList' onClick={()=>removeLike(dog.id)}><img src={deleteImg} className="deletePic" alt='deleteimg'/></button></div>
     </div>
    )}</div>
    <div className='topRow'>
    <div className='totalFinds'>Total Finds: {total}</div>
    <div className='nexPrevButtons'>
    <div><button onClick={()=>{setPage(page-1);handlePrevious()}} disabled={!previousUrl || page === 0}>&lt; Previous</button></div>
    <div><button onClick={()=>{setPage(page+1);handleNext()}} disabled={!nextUrl || page === totalPage }>Next &gt;</button></div>

    {(details.length>0 && totalPage && size) && (
      <div className="pageInfo">page {page} of {totalPage} pages</div>
    )}
    </div>
    </div>

    {details.length>0 ? (
        <div className='resultDisplayed'>
          {details?.map(dog =>
            <button key={dog.id} className={`dogSet ${selectedDogs.has(dog.id) ? "selected" : ""}`} onClick={()=>likeDogs(dog)}>
                <div><img src={dog.img} className='dogImage'/> </div>
                <div>Name: {dog.name}</div>
                <div>Age: {dog.age}</div>
                <div>Breed: {dog.breed}</div>
             </button>
        )}
        </div>
    ):(
      <div>
      <div>There Are No Results... </div>
      <div className='waitingDogDiv'><img src={dogWaiting} className='waitingDogImg'/></div>
      </div>
    )}

    </>
  )
}

export default BreedsResult;
