import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allLocations, searchLocations, postSearchLocations } from '../../redux/locationsSlice';
import { location, setLocation } from '../../redux/mapsSlice';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import OpenModalButton from '../OpenModalButton';
import Map from '../Map';
import './LocationsResult.css'



function LocationsResult({ data }) {

  const dispatch = useDispatch();

  const locationsList = useSelector(allLocations);
  const allSearchLocations = useSelector(searchLocations)

  const [page, setPage] = useState(0)
  const [contentPage, setContentPage] = useState(1)

  let newPage;
  let total = allSearchLocations?.total ? allSearchLocations.total : 0;
  let pages = Math.ceil(total / Number(data.size)) || 1
  let size = Number(data.size);

  let searchLocationArray = allSearchLocations.results
  console.log(searchLocationArray, 'searchLocationArray')

   const nextPage = async () => {

    if(page === -1) {
      newPage = 1
    } else {
       newPage = page + 1
    }


      data.from = newPage * size

      const checkArray = await dispatch(postSearchLocations(data))


      if (checkArray?.payload.results.length < size) {
        newPage -= 1
        setPage(newPage)
        data.from = newPage * size

      }
      setPage(newPage)
  }

  const prevPage = async () => {

    let newPage = page - 1

    data.from = newPage * size

    if (page === 0) {
      let newPage = page
      setPage(newPage)
      data.from = newPage*size
    }
    setPage(newPage)
    await dispatch(postSearchLocations(data))
  }



  return (
    <>
      <div className='topRowLocation'>
        {allSearchLocations?.total ? (
          <>
            <div>Total Finds: {allSearchLocations.total}</div>

            <div className='nexPrevButtons'>
              <div><button onClick={() => { prevPage(); setContentPage(contentPage - 1) }} disabled={contentPage === 1}> &lt; Previous</button></div>
              <div><button onClick={() => { nextPage(); setContentPage(contentPage + 1) }} disabled={contentPage === pages}>Next &gt;</button></div>
              <div>page {contentPage} of {pages} pages</div>
            </div>
          </>
        ) : (
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
      )}

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
