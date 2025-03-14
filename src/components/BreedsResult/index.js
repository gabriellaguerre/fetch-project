import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addLikeDog, getSearches, getLikeDogs, getDogDetails, postSearchDog2, nextPrevList, dogMatch, removeLikeDog} from '../../redux/dogsSlice';
import { searchLocations, allLocations, postLocations } from '../../redux/locationsSlice'
import OpenModalButton from '../OpenModalButton';
// import { motion } from "framer-motion";
import Match from '../Match';
import './BreedsResult.css'
import dogWaiting from '../../assets/dogwaitingpic-pickme.png'
import deleteImg from '../../assets/x.png';


function BreedsResult({ size, sizeChange, totalPage: totalPageProp, breedZipCodeSearch, allLocationsSearch, clearAllPressed, loading }) {
  const dispatch = useDispatch();

  const details = useSelector(getDogDetails);
  const searchResult = useSelector(getSearches)
  const likeList = useSelector(getLikeDogs)
  const locationsList = useSelector(allLocations);
  const searchLocationsList = useSelector(searchLocations)

  const [totalPage, setTotalPage] = useState(totalPageProp)
  const [page, setPage] = useState(1)
  const [selectedDogs, setSelectedDogs] = useState(new Set());
  const [updatedArray, setUpdatedArray] = useState([])
  const [mergedArray, setMergedArray] = useState([])
  const [isPrevDisabled, setIsPrevDisabled] = useState(false)
  const [isNextDisabled, setIsNextDisabled] = useState(false)
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(size)
  // const [loading, setLoading] = useState(false)

  let total;
  let nextUrl = searchResult?.next;
  let previousUrl = searchResult?.prev
  let list = searchResult?.resultIds
  // console.log(page, 'page line 36')
  
  // console.log(loading, 'loading line 38')
  // console.log(updatedArray, 'updatedArray line 39')
  let from1;
  let to1;
 
  //If doing a Search By Location, then the total is determined by the created array, else get the total from the server
  if (allLocationsSearch) {
    total = mergedArray.length
    totalPageProp = Math.ceil(total / size)
  } else {
    total = searchResult?.total;
  }

 
  //If the user clicks on the ClearAll button, then reset the page to 1 
  useEffect(()=> {
    if(clearAllPressed) setPage(1)
  }, [clearAllPressed])

  //Checking if the user is Searching By BREED 
  useEffect(() => {
    // setLoading(true)
    if (locationsList && breedZipCodeSearch) {
      
      const mergedData = details.map(dog => {
        const locationData = locationsList?.find(location => location?.zip_code === dog.zip_code);
        return locationData ? { ...dog, locationData } : null
      }).filter(dog => dog !== null)

      setUpdatedArray(mergedData)
      
    }
    
  }, [details, locationsList, breedZipCodeSearch])

  //Checking if the user is Searching By LOCATION
  useEffect(() => {
    // setLoading(true)
    if (searchLocationsList.length > 0 && allLocationsSearch) {
      
      const mergedData = details.map(dog => {
        const locationData = searchLocationsList?.find(location => location?.zip_code === dog.zip_code)
        return locationData ? { ...dog, locationData } : null
      }).filter(dog => dog !== null)

      setMergedArray(mergedData)

      let newArray = mergedData.slice(from, to)
      setUpdatedArray(newArray)
      
    }
  }, [details, searchLocationsList, allLocationsSearch, from, to])

  
  //Setting the Total Page when the user is changing the Size and to avoid the word Infinity to be displayed
  useEffect(()=> {
    if(loading) setPage(1)
    if (totalPageProp === Infinity || totalPageProp < 0) setTotalPage(0)
  }, [totalPageProp, loading])

  //If the user has changed the Size, update the array, page, to and from parameters
  useEffect(() => {
    if (sizeChange) {
      let newArray = mergedArray.slice(0, Number(size))
      setUpdatedArray(newArray)
      setPage(1)
      setTo(Number(size))
      setFrom(0)
      
    }

  }, [totalPage,sizeChange, mergedArray, size])


  //Handles the Next button and depends on if the user is Searching By BREED or By LOCATION
  const handleNext = async () => {

    //The user is Searching By Location and the results displayed are managed with the complete array of data
    if (allLocationsSearch) {
      let from1 = from + size
      let to1 = to + size
      setIsPrevDisabled(true)

      if (to < total) {
        let newArray = mergedArray.slice(from1, to1)
        setIsPrevDisabled(false)
        setUpdatedArray(newArray)
        setFrom(from1)
        setTo(to1)
        return
      }
      let newArray = mergedArray.slice(Number(from))
      from1 = mergedArray.length - newArray.length
      to1 = from1 - size
      setFrom(from1)
      setTo(to1)
      setIsPrevDisabled(false)
      setUpdatedArray(newArray)
    }

    //The user is Searching By BREED and the results displayed are managed by the server
    if (breedZipCodeSearch) {
      let getNextList = await dispatch(nextPrevList(nextUrl));
      let dogData = await dispatch(postSearchDog2(getNextList?.payload?.resultIds))
      let zipCodes = dogData.payload.map(dog => dog.zip_code)
      await dispatch(postLocations(zipCodes))
    }
  }

  const handlePrevious = async () => {

     //The user is Searching By Location and the results displayed are managed with the complete array of data
    if (allLocationsSearch) {
      from1 = from - size
      to1 = to - size

      if (to <= 0) {

        let newArray = mergedArray.slice(to1, from1)
        setUpdatedArray(newArray)
        setFrom(size)
        setTo(from + size)
        setIsPrevDisabled(true)
        setIsNextDisabled(false)
        return
      }

      let newArray = mergedArray.slice(from1, to1)
      setUpdatedArray(newArray)

      setFrom(from1)
      setTo(to1)

    }

     //The user is Searching By BREED and the results displayed are managed by the server
    if (breedZipCodeSearch) {
      let getPrevList = await dispatch(nextPrevList(previousUrl));
      let dogData = await dispatch(postSearchDog2(getPrevList.payload.resultIds))
      let zipCodes = dogData.payload.map(dog => dog.zip_code)
      await dispatch(postLocations(zipCodes))
    }
  }

  //Creates the list of favorite dogs that will be used for the match
  const likeDogs = async (dog) => {
    const isLiked = likeList.some(likedDog => likedDog.id === dog.id);
    if (!isLiked) {
      await dispatch(addLikeDog(dog));
    } else {
      await dispatch(removeLikeDog(dog.id));
    }

    setSelectedDogs((prevSelectedDogs) => {
      const newSelectedDogs = new Set(prevSelectedDogs);
      if (!isLiked) {
        newSelectedDogs.add(dog.id);
      } else {
        newSelectedDogs.delete(dog.id);
      }
      return newSelectedDogs;
    });
  }

  //Removes a favorite dog from the favorites list
  let removeLike = async (id) => {
    await dispatch(removeLikeDog(id))

    setSelectedDogs((prevSelectedDogs) => {
      const newSelectedDogs = new Set(prevSelectedDogs);
      newSelectedDogs.delete(id);
      return newSelectedDogs;
    });
  }

  //Sends the list of Dog Ids from the likeList to the server to get a match
  const match = async () => {
    let likeIDs = likeList.map(dog => dog.id)
    await dispatch(dogMatch(likeIDs));
  }

  return (
    <>
      <div className='selectedFavorites'>

        <div>Your selected favorites will show here, when you are done selecting, click</div><div className='matchButtonDiv'>
          <button className='matchButton' onClick={() => match()} disabled={likeList.length === 0}>
            <OpenModalButton
              buttonText={<div>Match</div>}
              modalComponent={<Match />} />
          </button></div><div> to get matched with one of your favorites:</div>

      </div>
      <div className='selectedDogsList'>
        {likeList.map((dog) =>
          <div key={dog.id} className='selectedDogsSet'>
             <div>{dog.breed}</div>
            <div><img src={dog.img} className='dogImageSelected' alt='dogImageSelected' /> </div>
            <div>{dog.name}</div>
            <div><button className='removeDogFromList' onClick={() => removeLike(dog.id)}><img src={deleteImg} className="deletePic_breedsresult" alt='deleteimg' /></button></div>
          </div>
        )}
      </div>
      {loading ? (
         <div className="loadingMessage">FETCHING<span className="dotOne">.</span>
         <span className="dotTwo">.</span>
         <span className="dotThree">.</span></div> 
      ):(
      <>
      <div className='topRow'>
        <div className='totalFinds'>Total Finds: {total}</div>
        <div className='nexPrevButtons'>
          {(allLocationsSearch) ? (
            <>
              <button className='prevButton' onClick={() => { setPage(page - 1); handlePrevious() }} disabled={isPrevDisabled || page === 1}>&lt; Previous</button>
              <button className='nextButton' onClick={() => { setPage(page + 1); handleNext() }} disabled={isNextDisabled || page === totalPageProp}>Next &gt;</button></>
          ) : (
            <>
              <button className='prevButton' onClick={() => { setPage(page - 1); handlePrevious() }} disabled={!previousUrl || page === 0}>&lt; Previous</button>
              <button className='nextButton' onClick={() => { setPage(page + 1); handleNext() }} disabled={(!nextUrl || list?.length === 0) || page === totalPageProp}>Next &gt;</button></>
          )}


          {(details.length > 0 && totalPageProp && size) && (
            <div className="pageInfo">page {page} of {totalPageProp} pages</div>
          )}
        </div>
      </div>

      {details.length > 0 ? (
        <>
        <div className='resultDisplayed'>
          {updatedArray?.map(dog =>
            <button key={dog?.id} className={`dogSet ${selectedDogs.has(dog?.id) ? "selected" : ""}`} onClick={() => likeDogs(dog)}>
              <div className='dogBreed-BR'>{dog?.breed}</div>
              <div className='dogImg-BR'><img src={dog?.img} className='dogImage' alt='dogImage'/> </div>
              <div className='dogNameAge-BR'>{dog?.name} {dog?.age} yrs</div>

              {dog?.locationData && (
                <>
                  <div className='dogLocationData-BR'>{dog?.locationData?.city}, {dog?.locationData?.state} {dog?.locationData?.zip_code}</div>

                  <div className='dogCounty-BR'>{dog?.locationData?.county} County</div>
                </>
              )}
            </button>
          )}
        </div>
        <div className='certified'>This site is certified Paw Approved</div>
        </>
      ) : (
        <>
        <div className='emptyData'>
        
         <div className='noResults'>There Are No Results... </div>
       
          <div className='waitingDogDiv'><img src={dogWaiting} className='waitingDogImg' alt='waitingDogImg'/></div>
        </div>
        <div className='certified'>This site is certified Paw Approved</div>
        </>
      )}
   </>
    )}
    </>

  )
}

export default BreedsResult;
