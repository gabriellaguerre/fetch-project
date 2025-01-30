import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {useNavigate} from 'react-router';
import { logout } from "../../redux/usersSlice";
import LoginPage from '../LoginPage';
import Profile from '../Profile';

import {breeds, getDogBreed, getSearches, searchDog, dogMatch, } from '../../redux/dogsSlice';
import './Main.css';


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

    const [searching, setSearching] = useState("")
    const [menu, setMenu] = useState(true);

    // console.log(searching, 'searching')
   
    let capitalLetterWord = searching?.[0]?.toUpperCase() + searching.substring(1)
    console.log(capitalLetterWord,'word')
    console.log(menu, 'menu')

  useEffect(() => {
    dispatch(breeds());
  }, [dispatch]);

  const search = () => {
      // console.log(breed, breedName, breed && breedName.length>0, 'breedName in search')
      let selectedParams = [];

      if(breed && breedName.length>0) selectedParams = [...selectedParams,breedName];
      // if(minimumAge && minAge) selectedParams = [...selectedParams,minAge];
      // if(maximumAge && maxAge) selectedParams = [...selectedParams,maxAge];
      // if(location && zipCode) selectedParams = [...selectedParams,zipCode];

      if(selectedParams.length>0){
        // console.log('selectedparams')
        setSelected(selectedParams);
        dispatch(searchDog(selectedParams));
      }
     

    }

    
      let results = doggyBreeds.filter((word)=>word.includes(capitalLetterWord))
      console.log(results, 'results array')
   
    
   
   return (
    <>
    {user ? (
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
         placeholder="Search breeds"
         onChange={(e) => {setSearching(e.target.value);setMenu(!menu)}}
         /> </div>
         
      
      <div className='searchDiv'> <button className='searchButton' onClick={search}>Search</button></div></div>

     <div className='gridArea1-2'><button className='filterButton' onClick={()=>setFilters(!filters)}>Filters</button></div>  
           


       <div className='gridArea2-1'>
           {searching && results.length>0 ? (
          <div className="results">
           {results.map((word, index)=> (
          <ul key={index} className='resultList' onClick={()=>{setSearching(word);setMenu(!menu)}}>{word}</ul>
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
          />Min Age</label>
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
          />Max Age</label>
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
            className="filter-input"
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
      </>
    ): (
      
      <LoginPage />
      
    )}
    </>
  );
}

export default Main;
