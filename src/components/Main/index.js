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
    const [breed, setBreed] = useState("");
    const [name, setName] = useState("");
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    
    
  useEffect(() => {
    dispatch(breeds());
  }, [dispatch]);
    
    const getBreeds = () => {
      console.log('in GetBreeds')
      dispatch(breeds());
      
    }

    const search = (searchOption) => {
      console.log(searchOption, 'in search function')
    }

    const handleSelection = (e) => {
      const {value, checked} = e.target
    }

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
      <button onClick={getBreeds}>Get Breeds</button>
     </div>
     <label>Search by:</label>
     <label><input 
          type="checkbox"
          value="name"
          onChange={handleSelection}
          /> Name</label>
      
          <option value="" disabled>Please choose an option</option>
          <option value="name">Name</option>
          <option value="min-age">Min Age</option>
          <option value="max-age">Max Age</option>
          <option value="zip-code">Zip Code</option>
             
      <button onClick={search(searchOption)}>Search</button>
     
     <div><button onClick={logoutUser}>Logout</button></div>

    </>
  );
}

export default Main;
