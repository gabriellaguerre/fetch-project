import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {searchDogForLocations, postSearchLocationDog, locationDogDetails, addLikeDog, getSearches, getLikeDogs, getDogDetails, postSearchDog, nextPrevList, dogMatch,removeLikeDog, getMatched,searchDog,locationSearchDogs, locationSearchNextList } from '../../redux/dogsSlice';
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

  const locationSearchForDog = useSelector(locationSearchDogs)
  const locationGetDogDetails = useSelector(locationDogDetails)

  const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';
  let total = searchResult.total;
  let nextUrl = searchResult.next;
  let previousUrl = searchResult.prev
  let list = searchResult.resultIds
  let updated;
  let mergedData;

  const [likeID, setLikeID] = useState([]);
  const [page, setPage] = useState(1)
  const [selectedDogs, setSelectedDogs] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedArray, setUpdatedArray] = useState([])
  const [mergedArray,  setMergedArray] = useState([])
 

  let searchByLocation = searchLocationsList.results
  let searchByLocationTotal = searchLocationsList.total
  // console.log(searchByLocation, searchByLocationTotal, 'searchByLocation and total line 27')
  // console.log(locationsList, 'locationsList line 31')
  // console.log(details, 'details line 32')
  // const urlFrontend = new URL(dogSearchUrl);
  console.log(locationSearchForDog, 'locationSearchForDog line 36')
  console.log(locationGetDogDetails, 'locationGetDogDetails line 37')
  console.log(searchLocationsList, 'searchLocationsList line 41')

 
 
 useEffect(()=> {
  if(locationSearchForDog && searchLocationsList) {
    const mergedLocationDogData = locationGetDogDetails.map(dog => {
      const locationData = searchLocationsList.results.find(
        location => String(location.zip_code) === String(dog.zip_code)
      );
      console.log(locationData, 'locationData line 59')
      return locationData ? {...dog, locationData} : null
    }).filter(dog => dog !== null)
    
    setMergedArray(prev => [...prev, mergedLocationDogData])
  }

  if(locationSearchForDog?.next) {
     let searchForDogLocationsResult =  dispatch(locationSearchNextList(locationSearchForDog.next))
     let getDogDetailsForTheSearch = searchForDogLocationsResult?.payload?.resultIds
          // console.log(getDogDetailsForTheSearch, 'line 228')
    
      dispatch(postSearchLocationDog(getDogDetailsForTheSearch))
  }


 }, [locationSearchForDog, searchLocationsList])
 
 
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

  }, [details, locationsList])

  

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

  console.log(mergedArray, 'mergedArray line 157')
  


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
