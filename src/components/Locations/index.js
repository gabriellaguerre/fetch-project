import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {postLocations, geoBoundingData, postSearchLocations} from '../../redux/locationsSlice'
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
    console.log(bodyParams, 'bodyParams in line 23')
    // const locations = useSelector(allLocations);
    // const findLocations = useSelector(searchLocations);

    // console.log(locations, 'from the useSelector')

    const [selected, setSelected] = useState([]);

    const[filters, setFilters] = useState(false);

    const [chooseCity, setChooseCity] = useState(false);
    const [city, setCity] = useState("");

    const [chooseStates, setChooseStates] = useState(false);
    const [states, setStates] = useState([]);

    const [chooseGeoBoundingBox, setChooseGeoBoundingBox] = useState(false);
    // const [topLat, setTopLat] = useState("");
    // const [topLon, setTopLon] = useState("");

    // const [leftLat, setLeftLat] = useState("");
    // const [leftLon, setLeftLon] = useState("");

    // const [bottomLat, setBottomLat] = useState("");
    // const [bottomLon, setBottomLon] = useState("");

    // const [rightLat, setRightLat] = useState("");
    // const [rightLon, setRightLon] = useState("");

    // const [bottomLeftLat, setBottomLeftLat] = useState("");
    // const [bottomLeftLon, setBottomLeftLon] =useState("");

    // const [bottomRightLat, setBottomRightLat] = useState("");
    // const [bottomRightLon, setBottomRightLon] = useState("");

    // const [topLeftLat, setTopLeftLat] = useState("");
    // const [topLeftLon, setTopLeftLon] = useState("");

    // const [topRightLat, setTopRightLat] = useState("");
    // const [topRightLon, setTopRightLon] = useState("");

    const [size, setSize] = useState("")

    const [searching, setSearching] = useState("")
    const [menu, setMenu] = useState(false);
    const [error, setError] = useState("")


    let capitalLetterWord = searching?.[0]?.toUpperCase() + searching.substring(1)


  const searchZipCodes = async () => {
    await dispatch(postLocations(selected))
  }

  const searchForLocations = () => {
    console.log('inside searchForLocations function')
    // let bodyParams = {}

    // if(chooseCity && city) bodyParams.city = city
    // if(chooseStates && states) bodyParams.states = [states]
    // if(chooseGeoBoundingBox && topLat && leftLat && bottomLat && rightLat){
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

    // if(chooseGeoBoundingBox && bottomRightLat && topLeftLat){
    //   bodyParams.geoBoundingBox = {
    //     bottom_right: {lat: bottomRightLat, lon: bottomRightLon},
    //     top_left: {lat: topRightLat, lon: topRightLon},
    //   }

    // }
    // bodyParams.size = size ? size : '5';

    // console.log(bodyParams, 'bodyParams')
    // dispatch(postSearchLocations(bodyParams))
 }


  let addState = (selectedLocation) => {
    console.log(selectedLocation, 'selectedLocation')

    if(chooseStates && selectedLocation.length > 2) {
      setError('Enter a two-letter state/territory abbreviations ')

    }

    if(!selected.includes(selectedLocation) && selectedLocation.length === 2) {
        setSelected(prevSelected => {const updatedSelection = [...prevSelected,selectedLocation];
        setError("")
        return updatedSelection;

      })
      }
  }


  let removeLocation = (places) => {
    let newArray = selected.filter((place) => place != places);
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
  // let results = locations.filter((word)=>word.includes(capitalLetterWord))
  // console.log(searchResult, 'results obj')


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
        <div className='searchDiv'><button className='addButton' disabled={filters} onClick={()=>{addLocation(searching);setSearching("")}}><img src={plusImg} className="searchPic"/></button></div>
        </div>



        <div className='gridArea1-2-Location'>
          <button className='filterButton' onClick={()=>{setFilters(!filters);setError("");setSelected([])}}><img src={filterImg} className="filterPic"/>Filters</button>

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
               <button className='removeButton' onClick={()=>removeLocation(places)}><img src={deleteImg} className="deletePic"/></button>
               </div>
             ))}
             </div>
          ):(

          <div className='locationChoices'>Zip Codes selected:
          {selected.map((places, index) =>(
            <div key={index} className='chosenLocations'>{places}
            <button className='removeButton' onClick={()=>removeLocation(places)}><img src={deleteImg} className="deletePic"/></button>
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
            <span className='searchSpan'><button className='addStateButton' disabled={chooseCity} onClick={()=>{addState(states);setStates("")}}><img src={plusImg} className="searchStatePic"/></button></span>
            {/* <span className='stateInstruction'>Use abbreviated States</span> */}
            </>
          )}
       </div>

      <div className="filter-option">
      <div><button className='openModalButton'><OpenModalButton
                    buttonText=<div className='geoBoundingBox'>Geo-Bounding Box</div>
                    modalComponent={<GeoBoundingBox />}
                    /></button></div>

        </div>
        </div>
        )}
          </div>
        </div>
       
          {filters ? (
            <div className='search2'><button className='search2Button' onClick={()=>{searchForLocations();setMenu(false)}}>SEARCH<img src={searchImg} className="searchPic"/></button></div>
          ):(
            <div className='search2'><button className='search2Button' onClick={()=>{searchZipCodes();setMenu(false)}}>SEARCH<img src={searchImg} className="searchPic"/></button></div>
          ) }

         <div className='table'><LocationsResult /></div>
           


     </>
  );
}

export default Locations;
