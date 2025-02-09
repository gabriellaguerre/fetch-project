import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {postLocations, searchLocations} from '../../redux/locationsSlice'
import Profile from '../Profile';
import Table from "../Table";
import './Locations.css';
import searchImg from '../../Assets/search.png';
import plusImg from '../../Assets/orange-plus.png'
import filterImg from '../../Assets/filter-pic.png'
import deleteImg from '../../Assets/trash-can.png';



function Locations() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const locations = useSelector(postLocations);
    const findLocations = useSelector(searchLocations);



    const [selected, setSelected] = useState([]);

    const[filters, setFilters] = useState(false);

    const [chooseCity, setChooseCity] = useState(false);
    const [city, setCity] = useState("");

    const [chooseState, setChooseState] = useState(false);
    const [state, setState] = useState("");

    const [chooseGeoBoundingBox, setChooseGeoBoundingBox] = useState(false);
    const [topLat, setTopLat] = useState({});
    const [topLon, setTopLon] = useState({});

    const [leftLat, setLeftLat] = useState({});
    const [leftLon, setLeftLon] = useState({});

    const [bottomLat, setBottomLat] = useState({});
    const [bottomLon, setBottomLon] = useState({});

    const [rightLat, setRightLat] = useState({});
    const [rightLon, setRightLon] = useState({});

    const [bottomLeftLat, setBottomLeftLat] = useState({});
    const [bottomLeftLon, setBottomLeftLon] = useState({});

    const [bottomRightLat, setBottomRightLat] = useState({});
    const [bottomRightLon, setBottomRightLon] = useState({});

    const [topLeftLat, setTopLeftLat] = useState({});
    const [topLeftLon, setTopLeftLon] = useState({});

    const [topRightLat, setTopRightLat] = useState({});
    const [topRightLon, setTopRightLon] = useState({});

    const [size, setSize] = useState("")

    const [searching, setSearching] = useState("")
    const [menu, setMenu] = useState(false);
    const [error, setError] = useState("")


    let capitalLetterWord = searching?.[0]?.toUpperCase() + searching.substring(1)


  const search = async () => {
    // const urlFrontend = new URL(dogSearchUrl);
    // let searchParams = {};

    // searchParams.breeds = selected;
    // searchParams.breeds.forEach(breed => urlFrontend.searchParams.append('breeds', breed));

    // searchParams.size = size ? size : '5';
    // urlFrontend.searchParams.append('size', searchParams.size)


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
  console.log(selected, 'after adding location')

  let removeLocation = (places) => {
    let newArray = selected.filter((place) => place != places);
    console.log(newArray, 'newArray')
    setSelected(newArray)
  }

  let results = locations.filter((word)=>word.includes(capitalLetterWord))
  // console.log(searchResult, 'results obj')

  const errorClassName = 'locationError' + (error ? "": "hidden")
  console.log(errorClassName, 'errorclass name')

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
            className="filter-input"
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
          value={chooseState}
          onChange={()=>setChooseState(!chooseState)}
          />State: </label>
          {chooseState && (
        <input
            className="filter-input"
            type="text"
            value={state}
            // placeholder="Enter a maximum age"
            onChange={(e) => setState(e.target.value)}/>
          )}
       </div>

      <div className="filter-option">
        <label>
          <input
          type="checkbox"
          value={chooseGeoBoundingBox}
          onChange={()=>setChooseGeoBoundingBox(!chooseGeoBoundingBox)}
          />Geo-Bounding Box: </label>
          {chooseGeoBoundingBox && (
            <>
            <div>top:
          <input
            className="location-input"
            type="number"
            value={topLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={topLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLon(e.target.value)}/>
            </div>

            <div>left:
          <input
            className="location-input"
            type="number"
            value={leftLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setLeftLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={leftLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setLeftLon(e.target.value)}/>
            </div>

            <div>bottom:
          <input
            className="location-input"
            type="number"
            value={bottomLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={bottomLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLon(e.target.value)}/>
            </div>

            <div>right:
          <input
            className="location-input"
            type="number"
            value={rightLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setRightLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={rightLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setRightLon(e.target.value)}/>
            </div>

            <div>bottom_left:
          <input
            className="location-input"
            type="number"
            value={bottomLeftLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLeftLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={bottomLeftLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLeftLon(e.target.value)}/>
            </div>

            <div>bottom_right:
          <input
            className="location-input"
            type="number"
            value={bottomRightLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomRightLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={bottomRightLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomRightLon(e.target.value)}/>
            </div>

            <div>top_left:
          <input
            className="location-input"
            type="number"
            value={topLeftLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLeftLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={topLeftLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLeftLon(e.target.value)}/>
            </div>

            <div>top_right:
          <input
            className="location-input"
            type="number"
            value={topRightLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopRightLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={topRightLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopRightLon(e.target.value)}/>
            </div>
            </>
        )}
        </div>
        </div>
        )}
          </div>
        </div>
        <div>
         <div className='search2'><button className='search2Button' onClick={()=>{search(searching);setMenu(false)}}>SEARCH<img src={searchImg} className="searchPic"/></button></div>
         <div className='table'><Table /></div>
            </div>


     </>
  );
}

export default Locations;
