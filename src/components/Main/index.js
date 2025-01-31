import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {useNavigate} from 'react-router';
import { logout } from "../../redux/usersSlice";
// import LoginPage from '../LoginPage';
import Profile from '../Profile';
import Table from "../Table";
import {breeds, getDogBreed, getSearches, searchDog, dogMatch, } from '../../redux/dogsSlice';
import './Main.css';
import searchImg from '../../Assets/search.png'


function Main() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useSelector(selectUser);
    const doggyBreeds = useSelector(getDogBreed)
    const searchResult = useSelector(getSearches)
    const user = "asfd";


    const [selected, setSelected] = useState([]);
    const [breed, setBreed] = useState(true);
    const [breedName, setBreedName] = useState("")

    const[filters, setFilters] = useState(false);

    const [minimumAge, setMinimumAge] = useState(false);
    const [minAge, setMinAge] = useState("");

    const [maximumAge, setMaximumAge] = useState(false);
    const [maxAge, setMaxAge] = useState("");

    const [location, setLocation] = useState(false);
    const [zipCode, setZipCode] = useState("");

    const [size, setSize] = useState("")

    const [searching, setSearching] = useState("")
    const [menu, setMenu] = useState(false);


    let capitalLetterWord = searching?.[0]?.toUpperCase() + searching.substring(1)
    
   

  useEffect(() => {
    dispatch(breeds());
  }, [dispatch]);

  const search = (searching) => {

    setBreedName(searching)
    let searchParams = {};
    searchParams.size = size ? size : '5';

    if(breed && breedName.length>0) searchParams.breed = searching;
    // if(sortOrder) searchParams.sort = sortOrder;
    
    console.log(searchParams, 'searchParams')
    dispatch(searchDog(searchParams));
    }


      let results = doggyBreeds.filter((word)=>word.includes(capitalLetterWord))
      console.log(searchResult, 'results obj')



   return (
    <>
   
         <Profile user={user}/>

        <div className="firstMessage">We have {doggyBreeds?.length || "0"} breeds of dogs ready to be matched!</div>
        
     <div className='searchAndFilter'>
      <div className='gridArea1-1'>
        <div className='inputDiv'>
      <input
         className='inputBox'
         type="text"
         value={searching}
         placeholder="Type to search our available breeds"
         onFocus={() => setMenu(true)}
         onChange={(e) => setSearching(e.target.value)}
         /> </div>


        <div className='searchDiv'> <button className='searchButton' onClick={()=>{search(searching);setMenu(false)}}><img src={searchImg} className="searchPic"/></button></div></div>

        <div className='gridArea1-2'><button className='filterButton' onClick={()=>setFilters(!filters)}>Filters</button>
        <div className='size'>Size
          <input 
              className='sizeInput'
              type="number"
              value={size}
              // placeholder="Enter a maximum age"
              onChange={(e) => setSize(e.target.value)}/></div></div>

       <div className='gridArea2-1'>
           {searching && results.length>0 && menu? (
          <div className="results">
           {results.map((word, index)=> (
          <ul key={index} className='resultList' onClick={()=>{setSearching(word);setMenu(false)}}>{word}</ul>
               ))}
          </div>
         ):null}
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
          />Minimum Age</label>
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
          />Maximum Age</label>
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
          value={location}
          onChange={()=>setLocation(!location)}
          />Zip Code</label>
          {location && (
          <input
            className="location-input"
            type="number"
            value={zipCode}
            // placeholder="Enter a zip code"
            onChange={(e) => setZipCode(e.target.value)}/>
          )}
       </div>
       </div>
        </>
        )}
        </div>
      </div>
     
        {/* <div className='table'><Table searchResult={searchResult}/></div> */}
      </>
       
  );
}

export default Main;

