import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {allLocations, postLocations, postSearchLocations} from '../../redux/locationsSlice'
import OpenModalButton from '../OpenModalButton';
import Profile from '../Profile';
import Table from "../Table";
import './Locations.css';
import searchImg from '../../Assets/search.png';
import plusImg from '../../Assets/orange-plus.png'
import filterImg from '../../Assets/filter-pic.png'
import deleteImg from '../../Assets/trash-can.png';
import LocationsResult from "../LocationsResult";
import GeoBoundingBox from "../GeoBoundingBox";




function Locations() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

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


  const search = async () => {

    await dispatch(postLocations(selected))
    // if(location && zipCode) {
    //   searchParams.zipCodes = [zipCode];
    //   searchParams.zipCodes.forEach(zipCode => urlFrontend.searchParams.append('zipCodes', zipCode));
    // }

    // if(minimumAge && minAge) {
    //   searchParams.ageMin = minAge;
    //   urlFrontend.searchParams.append('ageMin', searchParams.ageMin)
    // }
    // if(maximumAge && maxAge) {
    //   searchParams.ageMax = maxAge;
    //   urlFrontend.searchParams.append('ageMax', searchParams.ageMax)
    // }

    // if(breed && breedAsc) {
    //   searchParams.sort = 'breed:asc'
    //   urlFrontend.searchParams.append('sort', searchParams.sort)
    // }
    // if(breed && breedDesc) {
    //   searchParams.sort = 'breed:desc'
    //   urlFrontend.searchParams.append('sort', searchParams.sort)
    // }

    //  if(name && nameAsc) {
    //   searchParams.sort = 'name:asc'
    //   urlFrontend.searchParams.append('sort', searchParams.sort)
    //  }
    //  if(name && nameDesc) {
    //   searchParams.sort = 'name:desc'
    //   urlFrontend.searchParams.append('sort', searchParams.sort)
    //  }

    //  if(age && ageAsc) {
    //   searchParams.sort = 'age:asc'
    //   urlFrontend.searchParams.append('sort', searchParams.sort)
    //  }
    //  if(age && ageDesc) {
    //   searchParams.sort = 'age:desc'
    //   urlFrontend.searchParams.append('sort', searchParams.sort)
    //  }

  }

  const searchForLocations = () => {
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


  let addLocation = (selectedLocation) => {
    console.log(selectedLocation, 'selectedLocation')

    if(selectedLocation.length < 5 || selectedLocation > 5) {
      setError('Enter a valid Zip Code')

    }

    if(!selected.includes(selectedLocation) && selectedLocation.length === 5) {
      setSelected(prevSelected => {const updatedSelection = [...prevSelected,selectedLocation];
        setError("")
        return updatedSelection;

      })
      // console.log(selected, 'after adding location')

    }


  }


  let removeLocation = (places) => {
    let newArray = selected.filter((place) => place != places);
    console.log(newArray, 'newArray')
    setSelected(newArray)
  }

  // let results = locations.filter((word)=>word.includes(capitalLetterWord))
  // console.log(searchResult, 'results obj')

  const errorClassName = 'locationError' + (error ? "": "hidden")


   return (
    <>
     <Profile user={user}/>
     <div className={errorClassName}>{error}</div>
     <div className='searchAndFilter'>

      <div className='gridArea1-1'>

        <div className='inputDiv'>
      <input
         className='inputBoxLocation'
         type="number"
         value={searching}
         placeholder="Enter a zip code and press +"
         onFocus={() => setMenu(true)}
         onChange={(e) => {setSearching(e.target.value);setError("")}}
         /> </div>


        <div className='searchDiv'><button className='addButton' onClick={()=>{addLocation(searching);setSearching("")}}><img src={plusImg} className="searchPic"/></button></div>

        </div>



        <div className='gridArea1-2'>
          <button className='filterButton' onClick={()=>setFilters(!filters)}><img src={filterImg} className="filterPic"/>Filters</button>

        <div className='size'>Locations per page:
          <input
              className='sizeInput'
              type="number"
              value={size}
              // placeholder="Enter a maximum age"
              onChange={(e) => setSize(e.target.value)}/></div>

              </div>

          <div className='gridArea2-1'>
          <div className='locationChoices'>Zip Code choices:
          {selected.map((places, index) =>(
            <div key={index} className='chosenLocations'>{places}
            <button className='removeButton' onClick={()=>removeLocation(places)}><img src={deleteImg} className="deletePic"/></button>
            </div>
          ))}
          </div>
          </div>

       <div className='gridArea2-2'>
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

      <div className="filter-option">
        <label>
          <input
          type="checkbox"
          value={chooseStates}
          onChange={()=>setChooseStates(!chooseStates)}
          />State: </label>
          {chooseStates && (
        <input
            className="filter-input"
            type="text"
            value={states}
            // placeholder="Enter a maximum age"
            onChange={(e) => setStates(e.target.value)}/>
          )}
       </div>

      <div className="filter-option">
      <div><button><OpenModalButton
                    buttonText=<div className='geoBoundingBox'>Geo-Bounding Box</div>
                    modalComponent={<GeoBoundingBox/>}
                    /></button></div>
        
        </div>
        </div>
        )}
          </div>
        </div>
        <div>
          {(chooseCity || chooseStates || chooseGeoBoundingBox) ? (
            <div className='search2'><button className='search2Button' onClick={()=>{searchForLocations();setMenu(false)}}>SEARCH<img src={searchImg} className="searchPic"/></button></div>
          ):(
            <div className='search2'><button className='search2Button' onClick={()=>{search();setMenu(false)}}>SEARCH<img src={searchImg} className="searchPic"/></button></div>
          ) }

         <div className='table'><LocationsResult /></div>
            </div>


     </>
  );
}

export default Locations;
