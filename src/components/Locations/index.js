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
import sortImg from '../../Assets/sort-by.png';


function Locations() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const locations = useSelector(postLocations);
    const findLocations = useSelector(searchLocations);



    const [selected, setSelected] = useState([]);

    const [breed, setBreed] = useState(false);
    const [breedAsc, setBreedAsc] = useState(false);
    const [breedDesc, setBreedDesc] = useState(false);

    const [name, setName] = useState(false);
    const [nameAsc, setNameAsc] = useState(false);
    const [nameDesc, setNameDesc] = useState(false);


    const [age, setAge] = useState(false);
    const [ageAsc, setAgeAsc] = useState(false);
    const [ageDesc, setAgeDesc] = useState(false);



    const[filters, setFilters] = useState(false);
    const [sort, setSort] = useState(false);

    const [minimumAge, setMinimumAge] = useState(false);
    const [minAge, setMinAge] = useState("");

    const [maximumAge, setMaximumAge] = useState(false);
    const [maxAge, setMaxAge] = useState("");

    const [locate, setLocate] = useState(false);
    const [zipCode, setZipCode] = useState("");

    const [size, setSize] = useState("")

    const [searching, setSearching] = useState("")
    const [menu, setMenu] = useState(false);


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
  let results = locations.filter((word)=>word.includes(capitalLetterWord))
  // console.log(searchResult, 'results obj')

   return (
    <>
     <Profile user={user}/>
     {/* <div className='instruction'>Type to search our available breeds, then click the + to add that breed to your search list</div> */}
     <div className='searchAndFilter'>

      {/* <div className='gridArea1-1'> */}

        <div className='inputDiv'>
      <input
         className='inputBox'
         type="text"
         value={searching}
         placeholder="Enter a zip code and press +"
         onFocus={() => setMenu(true)}
         onChange={(e) => setSearching(e.target.value)}
         /> </div>


        <div className='searchDiv'>
          <button className='addButton' ><img src={plusImg} className="searchPic"/></button>
          {/* <button className='searchButton' onClick={()=>{search(searching);setMenu(false)}}><img src={searchImg} className="searchPic"/></button> */}
            </div>
            {/* </div> */}

        <div className='gridArea1-2'><button className='filterButton' onClick={()=>setFilters(!filters)}><img src={filterImg} className="filterPic"/>Filters</button>

        <div className='size'>Locations per page:
          <input
              className='sizeInput'
              type="number"
              value={size}
              // placeholder="Enter a maximum age"
              onChange={(e) => setSize(e.target.value)}/></div>



              </div>

       <div className='gridArea2-1'>

        </div>

        <div className='gridArea2-2'>
        {filters &&  (
        <>
        <div className='filters'>
       <div className="filter-option">
        <label className='checkbox'>
          <input
          type="checkbox"
          value={minimumAge}
          onChange={()=>setMinimumAge(!minimumAge)}
          />Minimum Age: </label>
          {minimumAge && (
        <input
            className="filter-input"
            type="number"
            value={minAge}
            // placeholder="Enter a minimum age"
            onChange={(e) => setMinAge(e.target.value)}/>
          )}
        </div>

      <div className="filter-option">
        <label>
          <input
          type="checkbox"
          value={maximumAge}
          onChange={()=>setMaximumAge(!maximumAge)}
          />Maximum Age: </label>
          {maximumAge && (
        <input
            className="filter-input"
            type="number"
            value={maxAge}
            // placeholder="Enter a maximum age"
            onChange={(e) => setMaxAge(e.target.value)}/>
          )}
       </div>

      <div className="filter-option">
        <label>
          <input
          type="checkbox"
          value={locate}
          onChange={()=>setLocate(!locate)}
          />Zip Code: </label>
          {locate && (
          <input
            className="location-input"
            type="number"
            value={zipCode}
            // placeholder="Enter a zip code"
            onChange={(e) => setZipCode(e.target.value)}/>
          )}
       </div>
       </div>

        <div className='locationChoices'>Breeds selected:
          {selected.map((places, index) =>(
            <div key={index} className='chosenLocations'>{places}
            <button className='removeButton' ><img src={deleteImg} className="deletePic"/></button>
            </div>

          ))}
          </div>
           </>
            )}
        </div>
        <div className='search2'><button className='search2Button' onClick={()=>{search(searching);setMenu(false)}}>SEARCH<img src={searchImg} className="searchPic"/></button></div>
         <div className='table'><Table /></div>
            </div>
      </>
  );
}

export default Locations;
