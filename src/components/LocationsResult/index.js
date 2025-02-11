import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {allLocations, searchLocations, googleMapsApiKey} from '../../redux/locationsSlice';
import { location, setLocation } from '../../redux/mapsSlice';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import OpenModalButton from '../OpenModalButton';
import MatchModal from '../Match';
import './LocationsResult.css'



function LocationsResult() {

  const dispatch = useDispatch();

  const locationsList = useSelector(allLocations);
  const allSearchLocations = useSelector(searchLocations)
//   dispatch(setLocation({ lat: 34.0522, lng: -118.2437 }))
  console.log(allSearchLocations.results, 'allSearchLocation')
  const map = useSelector(location)

  const mapContainerStyle = {
  width: "200px",
  height: "200px",
};

  const [likeID, setLikeID] = useState([]);


//   const handleNext = async () => {
//         console.log(nextUrl, 'next')
//         await dispatch(nextList(nextUrl));
//         let dogs2 = await dispatch(postSearchDog(list))
//         console.log(dogs2, 'dogs')
//     }

//     const handlePrevious = async () => {
//       console.log(previousUrl, 'next')
//       await dispatch(nextList(previousUrl));
//       let dogs2 = await dispatch(postSearchDog(list))
//       console.log(dogs2, 'dogs')
//   }

//   const likeDogs = (id) => {
//     console.log(id, 'id')
//     if(!likeID.includes(id)) {
//        setLikeID((prev)=> [...prev, id])
//     }

//   }

//   const match = async (likeID) => {
//     console.log('inside match function')
//     let foundDog = await dispatch(dogMatch(likeID));
//     console.log(foundDog.payload.match, 'foundDog')
//     console.log(details, 'details in match function')
//     let dogData = details.filter(dog => dog.id === foundDog.payload.match)

//     if(dogData) {
//       console.log('inside if statement with dogdata')
//       setMatchedDog(dogData);
//       setIsModalOpen(true)
//     }
//     console.log(dogData, 'dogData')

//   }

  return (
    <>
    <div className='topRow'>
    {allSearchLocations.total ? (
      <div>Total Finds: {allSearchLocations.total}</div>
    ):(
      <div></div>
    )}

    <div className='nexPrevButtons'>
    <div><button>&lt; Previous</button></div>
    <div><button >Next &gt;</button></div>
    </div>
    {/* <div><button><OpenModalButton
                    buttonText=<div className='match'>Match</div>
                    modalComponent={<MatchModal />}
                    /></button></div> */}
    </div>
    {/* <div><Maps /></div> */}
    {locationsList && (
       <div className='resultDisplayed'>
          {locationsList?.map(location =>
            <button key={location.id} className='locationSet'>
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                     <GoogleMap mapContainerStyle={mapContainerStyle} center={{lat: location.latitude, lng: location.longitude}} zoom={10}>
                         <Marker position={{lat: location.latitude, lng: location.longitude}} />
                     </GoogleMap>
              </LoadScript>
                <div>City: {location.city}</div>
                <div>County: {location.county}</div>
                <div>State: {location.state}</div>
                <div>Zip Code: {location.zip_code}</div>
             </button>
        )}
     </div>
      )
   }
     {allSearchLocations.results && (
     <div className='resultDisplayed'>
          {allSearchLocations.results?.map(location =>
            <button key={location.id} className='locationSet'>
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                     <GoogleMap mapContainerStyle={mapContainerStyle} center={{lat: location.latitude, lng: location.longitude}} zoom={10}>
                         <Marker position={{lat: location.latitude, lng: location.longitude}} />
                     </GoogleMap>
              </LoadScript>
                <div>City: {location.city}</div>
                <div>County: {location.county}</div>
                <div>State: {location.state}</div>
                <div>Zip Code: {location.zip_code}</div>
             </button>
        )}
    </div>

     )}
    </>
  )
}

export default LocationsResult;
