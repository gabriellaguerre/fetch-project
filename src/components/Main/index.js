import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {useNavigate} from 'react-router';
import { logout } from "../../redux/usersSlice";
import LoginPage from '../LoginPage';
import {breeds, getDogBreed, dogMatch, } from '../../redux/dogsSlice';


function Main() {
    const dispatch = useDispatch();

    // const user = useSelector(selectUser);
    const doggyBreeds = useSelector(getDogBreed)
    const navigate = useNavigate();

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
      console.log('in GetBreeds')
      dispatch(breeds());

    }
    console.log(selected, 'selected line 41')


    const search = () => {
      setSelected([]);
      if(breed && breedName) setSelected((prev)=>[...prev,breedName]);
      if(minimumAge && minAge) setSelected((prev)=>[...prev,minAge]);
      if(maximumAge && maxAge) setSelected((prev)=>[...prev,maxAge]);
      if(location && zipCode) setSelected((prev)=>[...prev,zipCode]);

      console.log(selected, 'In Search function')
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
    {/* {name ? (
      <>
         <h1> HEllo {name}</h1>
         <div><button onClick={getBreeds}>Get Breeds</button></div>
         <div><button onClick={logoutUser}>Logout</button></div>
      </>
    ): (
      <>
      <LoginPage />
      </>
    )} */}
     <div>Welcome to Fetch!! We have {doggyBreeds.length} breeds of dogs in our system</div>
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

     <div><button onClick={logoutUser}>Logout</button></div>

    </>
  );
}

export default Main;
