import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDogs, searchDogForLocations, postSearchLocationDog, locationDogDetails, addLikeDog, getSearches, getLikeDogs, getDogDetails, postSearchDog, nextPrevList, dogMatch, removeLikeDog, getMatched, searchDog, locationSearchDogs, locationSearchNextList } from '../../redux/dogsSlice';
import { searchLocations, allLocations, postLocations, postSearchLocations, geoBoundingData } from '../../redux/locationsSlice'
import OpenModalButton from '../OpenModalButton';
import Match from '../Match';
import './BreedsResult.css'
import dogWaiting from '../../assets/dogwaiting-pic.png'
import deleteImg from '../../assets/x.png';


function BreedsResult({ size, sizeChange, totalPage, zipcodesearch, allLocationsSearch }) {
  const dispatch = useDispatch();
  console.log(size, sizeChange, 'size sizeChange in breedresult line 14')
  const details = useSelector(getDogDetails);
  const searchResult = useSelector(getSearches)
  const likeList = useSelector(getLikeDogs)
  const locationsList = useSelector(allLocations);
  const searchLocationsList = useSelector(searchLocations)
  const matchedWithDog = useSelector(getMatched)


  const locationSearchForDog = useSelector(locationSearchDogs)
  const locationGetDogDetails = useSelector(locationDogDetails)

  const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';
  let total = searchResult?.total;
  let nextUrl = searchResult?.next;
  let previousUrl = searchResult?.prev
  let list = searchResult?.resultIds
  let mergedData;


  const [likeID, setLikeID] = useState([]);
  const [page, setPage] = useState(1)
  const [selectedDogs, setSelectedDogs] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedArray, setUpdatedArray] = useState([])
  const [mergedArray, setMergedArray] = useState([])
  const [locationsArray, setLocationsArray] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [isPrevDisabled, setIsPrevDisabled] = useState(false)
  const [isNextDisabled, setIsNextDisabled] = useState(false)
  const [viewingArray, setViewingArray] = useState([])
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(size)



  let searchByLocation = searchLocationsList.results
  let searchByLocationTotal = searchLocationsList.total

  let from1;
  let to1;


  useEffect(() => {

    if (locationsList && zipcodesearch) {
      mergedData = details.map(dog => {
        const locationData = locationsList?.find(location => location?.zip_code === dog.zip_code);
        return locationData ? { ...dog, locationData } : null
      }).filter(dog => dog !== null)
    }

    setUpdatedArray(mergedData)


  }, [details, locationsList, zipcodesearch])

  useEffect(() => {

    if (searchLocationsList.length > 0 && allLocationsSearch) {
      mergedData = details.map(dog => {
        const locationData = searchLocationsList?.find(location => location?.zip_code === dog.zip_code)
        return locationData ? { ...dog, locationData } : null
      }).filter(dog => dog !== null)
      console.log(mergedData, 'mergedData line 88')
      setMergedArray(mergedData)

      let newArray = mergedData.slice(from, to)
      setUpdatedArray(newArray)
      setViewingArray(newArray)
      setPage(1)
      setIsPrevDisabled(true)
    }
  }, [details, searchLocationsList, allLocationsSearch])

  let dogData;

  useEffect(() => {
    if (totalPage === Infinity || totalPage < 0) totalPage = 0
    if (sizeChange) {
      setPage(1)
      setTo(Number(size))
    }
  }, [totalPage, sizeChange])


  const handleNext = async () => {

    if (allLocationsSearch || zipcodesearch) {
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

    } else {

      let getNextList = await dispatch(nextPrevList(nextUrl));
      // console.log(nextUrl, 'nextUrl line 94')
      let dogData = await dispatch(postSearchDog(getNextList?.payload?.resultIds))
      // console.log(dogData, 'dogData line 77')
      let zipCodes = dogData.payload.map(dog => dog.zip_code)
      // console.log(zipCodes, 'zipCodes')
      let getZipCodes = await dispatch(postLocations(zipCodes))
      // console.log(getZipCodes, 'getZipCodes line 81')
    }


  }

  const handlePrevious = async () => {


    if (allLocationsSearch || zipcodesearch) {
      from1 = from - size
      to1 = to - size

      if (to <= 0) {

        let newArray = mergedArray.slice(to1, from1)
        setUpdatedArray(newArray)
        setFrom(size)
        setTo(from+size)
        setIsPrevDisabled(true)
        setIsNextDisabled(false)
        return
      }

        let newArray = mergedArray.slice(from1, to1)
        setUpdatedArray(newArray)

        setFrom(from1)
        setTo(to1)

    } else {

      let getPrevList = await dispatch(nextPrevList(previousUrl));
      let dogData = await dispatch(postSearchDog(getPrevList.payload.resultIds))
      let zipCodes = dogData.payload.map(dog => dog.zip_code)
      let getZipCodes = await dispatch(postLocations(zipCodes))
    }
  }


  const likeDogs = async (dog) => {
    console.log(dog, 'like dogs line168')
    if (!likeID.includes(dog.id)) {
      setLikeID((prev) => [...prev, dog.id])
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
    console.log(dogData, 'dogData line 189')

    if (dogData) {
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

        <div>Your selected favorites will show here, when you are done selecting, click</div><div className='matchButtonDiv'><button className='matchButton' onClick={() => match(likeID)} disabled={likeList.length === 0}><OpenModalButton
          buttonText={<div className='getMatch'>Match</div>}
          modalComponent={<Match />} />
        </button></div><div> to get matched with one of your favorites:</div>

      </div>
      <div className='selectedDogsList'>
        {likeList.map((dog) =>
          <div key={dog.id} className='selectedDogsSet'>
            <div><img src={dog.img} className='dogImageSelected' /> </div>
            <div>{dog.name} {dog.age}</div>
            <div><button className='removeDogFromList' onClick={() => removeLike(dog.id)}><img src={deleteImg} className="deletePic" alt='deleteimg' /></button></div>
          </div>
        )}
      </div>

      <div className='topRow'>
        <div className='totalFinds'>Total Finds: {total}</div>
        <div className='nexPrevButtons'>
          {(allLocationsSearch || zipcodesearch) ? (
            <>
              <div><button onClick={() => { setPage(page - 1); handlePrevious() }} disabled={isPrevDisabled || page === 1}>&lt; Previous</button></div>
              <div><button onClick={() => { setPage(page + 1); handleNext() }} disabled={isNextDisabled || page === totalPage}>Next &gt;</button></div></>
          ) : (
            <>
              <div><button onClick={() => { setPage(page - 1); handlePrevious() }} disabled={!previousUrl || page === 0}>&lt; Previous</button></div>
              <div><button onClick={() => { setPage(page + 1); handleNext() }} disabled={(!nextUrl || list.length === 0) || page === totalPage}>Next &gt;</button></div></>
          )}


          {(details.length > 0 && totalPage && size) && (
            <div className="pageInfo">page {page} of {totalPage} pages</div>
          )}
        </div>
      </div>

      {details.length > 0 ? (
        <div className='resultDisplayed'>
          {updatedArray?.map(dog =>
            <button key={dog?.id} className={`dogSet ${selectedDogs.has(dog?.id) ? "selected" : ""}`} onClick={() => likeDogs(dog)}>
              <div>{dog?.breed}</div>
              <div><img src={dog?.img} className='dogImage' /> </div>
              <div>Name: {dog?.name}</div>
              <div>Age: {dog?.age}</div>
              {dog?.locationData && (
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
      ) : (
        <div>
          <div>There Are No Results... </div>
          <div className='waitingDogDiv'><img src={dogWaiting} className='waitingDogImg' /></div>
        </div>
      )}

    </>
  )
}

export default BreedsResult;
