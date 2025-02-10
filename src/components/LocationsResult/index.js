import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {allLocations} from '../../redux/locationsSlice';
import './Table.css'
import MatchModal from '../Match';

function LocationsResult() {
  const dispatch = useDispatch();

  const locactionsList = useSelector(allLocations);


  const [likeID, setLikeID] = useState([]);
  const [matchedDog, setMatchedDog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
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
    <div>Total Finds: </div>
    <div className='nexPrevButtons'>
    <div><button>&lt; Previous</button></div>
    <div><button >Next &gt;</button></div>
    </div>
    <div><button onClick={()=>match(likeID)}>Match</button></div>
    </div>

    <div className='resultDisplayed'>
          {locactionsList?.map(location =>
            <button key={location.id} className='locationSet'>
                {/* <div><img src={dog.img} className='dogImage'/> </div> */}
                <div>City: {location.city}</div>
                <div>County: {location.county}</div>
                <div>State: {location.state}</div>
                <div>Zip Code: {location.zip_code}</div>
             </button>
        )}
    </div>
    </>
  )
}

export default LocationsResult;
