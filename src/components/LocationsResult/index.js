import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {allLocations, searchLocations, postSearchLocations} from '../../redux/locationsSlice';
import { location, setLocation } from '../../redux/mapsSlice';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import OpenModalButton from '../OpenModalButton';
import Map from '../Map';
import './LocationsResult.css'



function LocationsResult({data}) {

  const dispatch = useDispatch();

  const locationsList = useSelector(allLocations);
  const allSearchLocations = useSelector(searchLocations)

  const [page, setPage] = useState(1)
 
  let total =  allSearchLocations.total || 0;
  let pages = Math.ceil(total/Number(data.size)) || 1
  let size = Number(data.size);
  
  let searchLocationArray = allSearchLocations.results
  console.log(searchLocationArray, 'searchLocationArray')
 
  // useEffect(()=>{
  //    if(searchLocationArray?.length < size) {
  //      setPage(page-1)
  //      console.log(page, 'page in useEffect')
  //      data.from = page*size
  //      dispatch(postSearchLocations(data))
  // }
  // }, [searchLocationArray, size, data, page])
 


  const nextPage = async () => {
    console.log(page, "page in next function")

    data.from = page*size
    setPage(page+1)
 
   console.log(data, 'data after page change line 33')
  
   const checkArray = await dispatch(postSearchLocations(data))
   console.log(checkArray?.payload.results.length < size, 'checkArray in nextPage function')

   if(checkArray?.payload.results.length < size) {
    console.log(page, "page line 51")
    setPage(page)
    data.from = page*size
   }
  
  }

  const prevPage = async () => {
    console.log(page, 'page in prevPage function')
    // setPage(page-1)
    // let size = Number(data.size)
    // console.log(size, page, 'size, page in prevPage function')
    
    console.log(data, 'data after page change line 57')
    // await dispatch(postSearchLocations(data))
   }



  return (
    <>
    <div className='topRowLocation'>
    {allSearchLocations.total ? (
      <>
      <div>Total Finds: {allSearchLocations.total}</div>
     
      <div className='nexPrevButtons'>
      <div><button onClick={prevPage} disabled={page === 1}> &lt; Previous</button></div>
      <div><button onClick={nextPage} disabled={page === pages}>Next &gt;</button></div>
      <div>page {page} of {pages} pages</div>
      </div>
      </>
    ):(
      <div><button>CLEAR ALL</button></div>
    )}
    </div>

    {locationsList && (
       <div className='resultDisplayed'>
          {locationsList?.map(location =>
            <div key={location?.id} className='locationSet'>
              <button className='openMapModalButton'><OpenModalButton
                    buttonText=<div className='getMap'>See Map</div>
                    modalComponent={<Map location={location} />}
                    /></button>
                <div>City: {location?.city}</div>
                <div>County: {location?.county}</div>
                <div>State: {location?.state}</div>
                <div>Zip Code: {location?.zip_code}</div>

             </div>
        )}
     </div>
      )
   }
     {allSearchLocations.results && (
     <div className='resultDisplayed'>
           {allSearchLocations.results?.map(location =>
            <div key={location.id} className='locationSet'>
               <button className='openMapModalButton'><OpenModalButton
                    buttonText=<div className='getMap'>See Map</div>
                    modalComponent={<Map location={location} />}
                    /></button>
                <div>City: {location.city}</div>
                <div>County: {location.county}</div>
                <div>State: {location.state}</div>
                <div>Zip Code: {location.zip_code}</div>
             </div>
        )}
    </div>

     )}
    </>
  )
}

export default LocationsResult;
