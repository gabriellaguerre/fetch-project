import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllDogs, searchDogForLocations, postSearchLocationDog, locationDogDetails, addLikeDog, getSearches, getLikeDogs, getDogDetails, postSearchDog, nextPrevList, dogMatch,removeLikeDog, getMatched,searchDog,locationSearchDogs, locationSearchNextList } from '../../redux/dogsSlice';
import {searchLocations, allLocations, postLocations, geoBoundingData} from '../../redux/locationsSlice'
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
  const [locationsArray, setLocationsArray] = useState([])

  // console.log(details, 'details line 41')
  // console.log(locationsList, 'location list line 42')
  let searchByLocation = searchLocationsList.results
  let searchByLocationTotal = searchLocationsList.total



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
      let dogData = await dispatch(postSearchDog(getNextList.payload.resultIds))
      let zipCodes = dogData.payload.map(dog=>dog.zip_code)     
      let getZipCodes = await dispatch(postLocations(zipCodes))
    }

    const handlePrevious = async () => {
      let getPrevList = await dispatch(nextPrevList(previousUrl));
      let dogData = await dispatch(postSearchDog(getPrevList.payload.resultIds))
      let zipCodes = dogData.payload.map(dog=>dog.zip_code)     
      let getZipCodes = await dispatch(postLocations(zipCodes))
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

  // const getAllDogs = async (from = 0, size = 100, accumulatedResults = []) => {
  //      if(from === 1000) {
  //          return
  //       }
  //      try {
  //       // const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';
  //       const urlFrontend2 = new URL('https://frontend-take-home-service.fetch.com/dogs/search?');
  //       let searchParams = {}

  //       console.log(urlFrontend2, 'line 158')

  //       searchParams.size = size;
  //       searchParams.from = from

  //       urlFrontend2.searchParams.append('size', searchParams.size)
  //       urlFrontend2.searchParams.append('from', searchParams.from)

  //       console.log(urlFrontend2, searchParams, 'line 164')

  //       let searchForDogLocationsResult = await dispatch(searchDogForLocations(urlFrontend2))
  //       let getDogDetailsForTheSearch = searchForDogLocationsResult.payload.resultIds

  //       let dogDetails = await dispatch(postSearchLocationDog(getDogDetailsForTheSearch))
  //       // console.log(dogDetails, 'dogDetails line 176')

  //       let newResults = [...accumulatedResults, ...dogDetails.payload];

  //       if(searchForDogLocationsResult.payload?.next) {
  //         return getAllDogs(from+size, size, newResults)
  //       }

       
  //       console.log(newResults, 'newResults line 185')


  //      } catch (error) {
  //       console.error("Error fetching dogs:", error);
  //      } 
          
  //   }

  //   useEffect(()=> {
  //     getAllDogs();
  //   },[])
    

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
