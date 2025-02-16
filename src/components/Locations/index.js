import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {postLocations, geoBoundingData, postSearchLocations, clearLocations, clearLocationsSearch, clearGeoBounding} from '../../redux/locationsSlice'
import OpenModalButton from '../OpenModalButton';
import Profile from '../Profile';
import Table from "../Table";
import './Locations.css';
import searchImg from '../../Assets/search.png';
import plusImg from '../../Assets/orange-plus.png'
import filterImg from '../../Assets/filter-pic.png'
import deleteImg from '../../Assets/x.png';
import LocationsResult from "../LocationsResult";
import GeoBoundingBox from "../GeoBoundingBox";




function Locations() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const bodyParams = useSelector(geoBoundingData);
    // console.log(Object.keys(bodyParams.geoBoundingBox), 'obj keys bodyParams in line 23')
    // const locations = useSelector(allLocations);
    // const findLocations = useSelector(searchLocations);

    console.log(bodyParams.geoBoundingBox, 'bodyParams line 27')
    let geoChoices = bodyParams.geoBoundingBox ? Object.keys(bodyParams.geoBoundingBox) : [];
    const [selected, setSelected] = useState([]);

    const[filters, setFilters] = useState(false);

    const [chooseCity, setChooseCity] = useState(false);
    const [city, setCity] = useState("");

    const [chooseStates, setChooseStates] = useState(false);
    const [states, setStates] = useState([]);

    const [chooseGeoBoundingBox, setChooseGeoBoundingBox] = useState(false);
    // const [geoChoices, setGeoChoices] = useState(Object.keys(bodyParams?.geoBoundingBox || {}));


    const [size, setSize] = useState("")
    const [from, setFrom] = useState("")
    const [data, setData] = useState({})
    const [searching, setSearching] = useState("")
    const [menu, setMenu] = useState(false);
    const [error, setError] = useState("")


    let capitalLetterWord = searching?.[0]?.toUpperCase() + searching.substring(1)
    console.log(geoChoices, 'geoChoices')

  const searchZipCodes = async () => {
    await dispatch(clearGeoBounding())
    await dispatch(clearLocationsSearch())
    await dispatch(postLocations(selected))
  }

  const searchForLocations = async () => {
    console.log('inside searchForLocations function')
    let params = {}

    // console.log((chooseStates), selected, 'selected line 82')

    if(chooseCity && city) params.city = city
    if(chooseStates || selected.length > 0) params.states = selected
    // if(topLat && leftLat && bottomLat && rightLat){
    //   bodyParams.geoBoundingBox = {
    //     top: {lat: topLat, lon: topLon},
    //     left: {lat: leftLat, lon: leftLon},
    //     bottom: {lat: bottomLat, lon: bottomLon},
    //     right: {lat: rightLat, lon: rightLon},
    //   }
    // }

    //   if(chooseGeoBoundingBox && bottomLeftLat && topRightLat){
    //     bodyParams.geoBoundingBox = {
    //       bottom_left: {lat: bottomLeftLat, lon: bottomLeftLon},
    //       top_right: {lat: topRightLat, lon: topRightLon},
    //     }
    // }

    if(chooseGeoBoundingBox){
      params.geoBoundingBox = {
        bottom_right: {lat: bodyParams.geoBoundingBox.bottom_right.lat, lon: bodyParams.geoBoundingBox.bottom_right.lon},
        top_left: {lat: bodyParams.geoBoundingBox.top_left.lat, lon: bodyParams.geoBoundingBox.top_left.lon},
      }


    }
    params.size = size ? size : '5';
    params.from = from ? from : '0';

    console.log(params, 'params')
    setData(params)
    await dispatch(clearLocations())
    await dispatch(postSearchLocations(params))
 }

  // console.log(choice1, 'choice1')

  let addState = (selectedLocation) => {
    console.log(selectedLocation.toUpperCase(), 'selectedLocation')
    let allCapsState = selectedLocation.toUpperCase()

    if(chooseStates && selectedLocation.length > 2) {
      setError('Enter a two-letter state/territory abbreviations ')

    }

    if(!selected.includes(selectedLocation) && selectedLocation.length === 2) {
        setSelected(prevSelected => {const updatedSelection = [...prevSelected, allCapsState];
        setError("")
        return updatedSelection;

      })
      }
  }


  let removeLocation = (places) => {
    let newArray = selected.filter((place) => place !== places);
    console.log(newArray, 'newArray')
    setSelected(newArray)
  }

  let addLocation = (selectedLocation) => {
    console.log(selectedLocation, 'selectedLocation')

    if(selectedLocation.length < 5 || selectedLocation.length > 5) {
      setError("Enter a valid zip code")
    }

    if(selected.includes(selectedLocation)) {
      setError("This zip code is already in your list")
    }


    if(!selected.includes(selectedLocation) && selectedLocation.length === 5) {
        setSelected(prevSelected => {const updatedSelection = [...prevSelected,selectedLocation];
        setError("")
        return updatedSelection;

      })
      // console.log(selected, 'after adding location')

    }


  }

  const deleteGeoChoices = async ()=>{
    setChooseGeoBoundingBox(false)
    await dispatch(clearGeoBounding())
  }


  const errorClassName = 'locationError' + (error ? "": "hidden")


   return (
    <>
     <Profile user={user}/>
     <div className={errorClassName}>{error}</div>
     <div className='searchAndFilter'>

      <div className='gridArea1-1-Location'>

        <div className='inputDiv'>
      <input
         className='inputBoxLocation'
         disabled={filters}
         type="number"
         value={searching}
         placeholder="Enter a zip code and press +"
         onFocus={() => setMenu(true)}
         onChange={(e) => {setSearching(e.target.value);setError("")}}
         /> </div>
        <div className='searchDiv'><button className='addButton' disabled={filters} onClick={()=>{addLocation(searching);setSearching("")}}><img src={plusImg} className="searchPic" alt='plusimg'/></button></div>
        </div>



        <div className='gridArea1-2-Location'>
          <button className='filterButton' onClick={()=>{setFilters(!filters);setError("");setSelected([])}}><img src={filterImg} className="filterPic" alt='filterimg'/>Filters</button>

        <div className='size'>Locations per page:
          <input
              className='sizeInput'
              type="number"
              value={size}
              // placeholder="Enter a maximum age"
              onChange={(e) => setSize(e.target.value)}/></div>

              </div>

          <div className='gridArea2-1-Location'>
          {filters ? (
             <div className='locationChoices'>States selected:
             {selected.map((places, index) =>(
               <div key={index} className='chosenLocations'>{places}
               <button className='removeButton' onClick={()=>removeLocation(places)}><img src={deleteImg} className="deletePic" alt='deleteimg'/></button>
               </div>
             ))}
             </div>
          ):(

          <div className='locationChoices'>Zip Codes selected:
          {selected.map((places, index) =>(
            <div key={index} className='chosenLocations'>{places}
            <button className='removeButton' onClick={()=>removeLocation(places)}><img src={deleteImg} className="deletePic" alt='plusimg'/></button>
            </div>
          ))}
          </div>
          )}
          </div>

       <div className='gridArea2-2-Location'>
        {filters &&  (
        <div className='filters'>
       <div className="filter-option">
        <label className='checkbox'>
          <input
          type="checkbox"
          value={chooseCity}
          onChange={()=>setChooseCity(!chooseCity)}
          />City: </label>
          {chooseCity && (
        <input
            className="filter-input-city"
            type="text"
            value={city}
            // placeholder="Enter a minimum age"
            onChange={(e) => setCity(e.target.value)}/>
          )}

        </div>

      <div className="filter-option-state">
        <label>
          <input
          type="checkbox"
          value={chooseStates}
          onChange={()=>setChooseStates(!chooseStates)}
          />State: </label>
          {chooseStates && (
          <>
        <input
            className="filter-input-state"
            type="text"
            value={states}
            // placeholder="Enter a maximum age"
            onFocus={() => setMenu(true)}
            onChange={(e) => setStates(e.target.value)}/>
            <span className='searchSpan'><button className='addStateButton' disabled={chooseCity} onClick={()=>{addState(states);setStates("")}}><img src={plusImg} className="searchStatePic" alt='plusimg'/></button></span>

            </>
          )}
       </div>

      <div className="filter-option">
      <div><button className='openModalButton' onClick={()=>setChooseGeoBoundingBox(true)}><OpenModalButton
                    buttonText={<div className='geoBoundingBox'>Geo-Bounding Box</div>}
                    modalComponent={<GeoBoundingBox />}
                    /></button></div>
      {geoChoices.length>0 ?  (
        <>
      {geoChoices?.map((choice, index) => (
          <div key={index} className='geoChoice' id={'s'+ index}>{choice}</div>
      ))}
      <div className='editGeoDiv'><button className='editGeoChoiceButton'>
                    <OpenModalButton
                    buttonText={<div className='geoBoundingBox'>edit</div>}
                    modalComponent={<GeoBoundingBox parameters={bodyParams}/>} /></button></div>
      <div className='deleteGeoDiv'><button className='deleteGeoChoiceButton'onClick={deleteGeoChoices}>delete</button></div>
      </>
         ) : (
          null
         )}
       </div>


        </div>
        )}
          </div>
        </div>

          {filters ? (
            <div className='search2'><button className='search2Button' onClick={()=>{searchForLocations();setMenu(false)}}>SEARCH<img src={searchImg} className="searchPic" alt='searchimg'/></button></div>
          ):(
            <div className='search2'><button className='search2Button' onClick={()=>{searchZipCodes();setMenu(false)}}>SEARCH<img src={searchImg} className="searchPic" alt='searchimg'/></button></div>
          ) }

         <div className='table'><LocationsResult data={data}/></div>



     </>
  );
}

export default Locations;
