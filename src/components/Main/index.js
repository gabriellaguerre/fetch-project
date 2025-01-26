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
    const user = "asd";


    console.log(searchResult, 'search result')

    const [selected, setSelected] = useState([]);
    const [breed, setBreed] = useState(false);
    const [breedName, setBreedName] = useState("")

    const [minimumAge, setMinimumAge] = useState(false);
    const [minAge, setMinAge] = useState("");

    const [maximumAge, setMaximumAge] = useState(false);
    const [maxAge, setMaxAge] = useState("");

    const [location, setLocation] = useState(false);
    const [zipCode, setZipCode] = useState("");



  useEffect(() => {
    dispatch(breeds());
  }, [dispatch]);

    const getBreeds = () => {
          dispatch(breeds());
    }


    console.log(selected, 'selected line 41')

    const search = (selected) => {
      // console.log(selected, 'selected')
      let selectedParams = [];

      if(breed && breedName) selectedParams = [...selectedParams,breedName];
      // if(minimumAge && minAge) selectedParams = [...selectedParams,minAge];
      // if(maximumAge && maxAge) selectedParams = [...selectedParams,maxAge];
      // if(location && zipCode) selectedParams = [...selectedParams,zipCode];

      setSelected(selectedParams);
      dispatch(searchDog(selectedParams));

    }

    // const handleSelection = (e) => {
    //   const {value, checked} = e.target
    // }

    const logoutUser = () => {
      dispatch(logout());
      navigate('/');
    }



  return (
    <>
    {user ? (
      <>

         {/* <div> Hello {user}!</div>
         <div><button onClick={logoutUser}>Logout</button></div> */}
         <Profile user={user}/>
        

         <div>We have {doggyBreeds?.length || "0"} breeds of dogs in our system</div>
     <div>How would like to search?</div>
     <div>See our full list of breeds
      <button onClick={getBreeds}>Get Breeds</button></div>
     <div><label>Search by:</label></div>

      <div><label><input
          type="checkbox"
          value={breed}
          onChange={()=>{setBreed(!breed)}}
          />Breed</label><input
            type="text"
            value={breedName}
            placeholder="Enter a breed name"
            onChange={(e) => {setBreedName(e.target.value)}}/>
            </div>

       <div><label><input
          type="checkbox"
          value={minimumAge}
          onChange={()=>setMinimumAge(!minimumAge)}
          />Min Age</label>
          <input
            type="number"
            value={minAge}
            placeholder="Enter a minimum age"
            onChange={(e) => setMinAge(e.target.value)}/>
            </div>

      <div><label><input
          type="checkbox"
          value={maximumAge}
          onChange={()=>setMaximumAge(!maximumAge)}
          />Max Age</label>
          <input
            type="number"
            value={maxAge}
            placeholder="Enter a maximum age"
            onChange={(e) => setMaxAge(e.target.value)}/></div>

      <div><label><input
          type="checkbox"
          value={location}
          onChange={()=>setLocation(!location)}
          />Zip Code</label>
          <input
            type="number"
            value={zipCode}
            placeholder="Enter a zip code"
            onChange={(e) => setZipCode(e.target.value)}/>
          </div>

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
