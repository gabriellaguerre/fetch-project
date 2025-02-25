import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addLikeDog, getSearches, getLikeDogs, getDogDetails, postSearchDog, nextPrevList, dogMatch,removeLikeDog, getMatched,searchDog } from '../../redux/dogsSlice';
import {searchLocations, allLocations, geoBoundingData} from '../../redux/locationsSlice'
import OpenModalButton from '../OpenModalButton';
import Match from '../Match';
import './BreedsResult.css'
import dogWaiting from '../../assets/dogwaiting-pic.png'
import deleteImg from '../../assets/x.png';


function BreedsResult({size, sizeChange, totalPage, chooseCity, city}) {
  const dispatch = useDispatch();

  const details = useSelector(getDogDetails);
  const searchResult = useSelector(getSearches)
  const likeList = useSelector(getLikeDogs)
  const locationsList = useSelector(allLocations);
  const searchLocationsList = useSelector(searchLocations)
  const matchedWithDog = useSelector(getMatched)

  const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';
  let total = searchResult.total;
  let nextUrl = searchResult.next;
  let previousUrl = searchResult.prev
  let list = searchResult.resultIds
  let updated;
  let mergedData;

  let searchByLocation = searchLocationsList.results
  let searchByLocationTotal = searchLocationsList.total
  // console.log(searchByLocation, searchByLocationTotal, 'searchByLocation and total line 27')
  // console.log(locationsList, 'locationsList line 31')
  // console.log(details, 'details line 32')
  // const urlFrontend = new URL(dogSearchUrl);


  useEffect(()=> {


      mergedData = details.map(dog => {
      const locationData = locationsList.find(location => location.zip_code === dog.zip_code);
      if(locationData) {
        updated = {... dog, locationData}
        return updated
      } else {
        updated = dog
        return updated
      }
    })
    setUpdatedArray(mergedData)

  }, [details, locationsList, city])

  const [likeID, setLikeID] = useState([]);
  const [page, setPage] = useState(1)
  const [selectedDogs, setSelectedDogs] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedArray, setUpdatedArray] = useState([])

  let dogData;

  useEffect(()=> {
    if(totalPage === Infinity || totalPage<0) totalPage = 0
    if(sizeChange) setPage(1)
  }, [totalPage, sizeChange])


    const handleNext = async () => {
      let getNextList = await dispatch(nextPrevList(nextUrl));
      let dogs2 = await dispatch(postSearchDog(getNextList.payload.resultIds))
    }

    const handlePrevious = async () => {

      let getPrevList = await dispatch(nextPrevList(previousUrl));
      let dogs2 = await dispatch(postSearchDog(getPrevList.payload.resultIds))
  }


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

  const match = async (likeID) => {

    let foundDog = await dispatch(dogMatch(likeID));
    dogData = details.filter(dog => dog.id === foundDog.payload.match)
    console.log(dogData, 'dogData line 89')

    if(dogData) {
      setIsModalOpen(true)
    }
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
         )}
    </div>

    <div className='topRow'>
    <div className='totalFinds'>Total Finds: {total}</div>
    <div className='nexPrevButtons'>
    <div><button onClick={()=>{setPage(page-1);handlePrevious()}} disabled={!previousUrl || page === 0}>&lt; Previous</button></div>
    <div><button onClick={()=>{setPage(page+1);handleNext()}} disabled={(!nextUrl || list.length === 0) || page === totalPage }>Next &gt;</button></div>

    {(details.length>0 && totalPage && size) && (
      <div className="pageInfo">page {page} of {totalPage} pages</div>
    )}
    </div>
    </div>

    {details.length>0 ? (
        <div className='resultDisplayed'>
          {updatedArray?.map(dog =>
            <button key={dog?.id} className={`dogSet ${selectedDogs.has(dog?.id) ? "selected" : ""}`} onClick={()=>likeDogs(dog)}>
                <div>{dog?.breed}</div>
                <div><img src={dog?.img} className='dogImage'/> </div>
                <div>Name: {dog?.name}</div>
                <div>Age: {dog?.age}</div>
                {dog.locationData && (
                  <>
                  <div>City: {dog?.locationData?.city}</div>
                  <div>State: {dog?.locationData?.state}</div>
                  <div>County: {dog?.locationData?.county}</div>
                  </>
                )}
                <div>Zip Code: {dog?.zip_code}</div>


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
