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


    // console.log(searchResult, 'search result')
    // console.log(doggyBreeds, 'doggybreeds')

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
    
   
   return (
    <>
    {user ? (
      <>
         <Profile user={user}/>
        
        <div className="firstMessage">We have {doggyBreeds?.length || "0"} breeds of dogs ready to be matched!</div>
     
     <div>Search and pick your breed from our full list of breeds:
     <select
          name='breeds'
          id='breed-select'
          value={breedName}
          onChange={(e)=>setBreedName(e.target.value)}          
      >
          <option value="" disabled>select a breed</option>
          {doggyBreeds.map((breedName, index)=>
            <option key={index} value={breedName}>{breedName}</option>)}
        
      </select>   
     </div>


     <div><button onClick={()=>setFilters(!filters)}>Filters</button></div>
       {filters &&  ( 
        <>  
       <div>
        <label>
          <input
          type="checkbox"
          value={minimumAge}
          onChange={()=>setMinimumAge(!minimumAge)}
          />Min Age</label>
          {minimumAge && (
        <input
            type="number"
            value={minAge}
            placeholder="Enter a minimum age"
            onChange={(e) => setMinAge(e.target.value)}/>          
          )}
          </div>

      <div>
        <label>
          <input
          type="checkbox"
          value={maximumAge}
          onChange={()=>setMaximumAge(!maximumAge)}
          />Max Age</label>
          {maximumAge && (
        <input
            type="number"
            value={maxAge}
            placeholder="Enter a maximum age"
            onChange={(e) => setMaxAge(e.target.value)}/>
          )}
          </div>

      <div>
        <label>
          <input
          type="checkbox"
          value={location}
          onChange={()=>setLocation(!location)}
          />Zip Code</label>
          {location && (
          <input
            type="number"
            value={zipCode}
            placeholder="Enter a zip code"
            onChange={(e) => setZipCode(e.target.value)}/>

          )}
          
          </div>
           </>)} 
     <div> <button onClick={search}>Search</button></div>
      </>
    ): (
      <>
      <LoginPage />
      </>
    )}
    </>
  );
}

export default Main;
