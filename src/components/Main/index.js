import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {useNavigate} from 'react-router';
import { logout } from "../../redux/usersSlice";
import OpenModalButton from '../OpenModalButton';
import Profile from '../Profile';
import Breeds from '../Breeds';
import Table from "../Table";
import {breeds, getDogBreed, getSearches, searchDog, getDogDetails, postSearchDog, dogMatch } from '../../redux/dogsSlice';
import './Main.css';
import breedImg from '../../Assets/breed_pic-main.png'
import locationImg from '../../Assets/location_pic-main.png'


function Main() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(breeds());
    }, [dispatch]);

   const user = useSelector(selectUser);
   const doggyBreeds = useSelector(getDogBreed)

   const goToBreeds = () => {
    navigate('/breeds');
   }

   const goToLocations = () => {
    navigate('/locations');
   }


   return (
    <>

         <Profile user={user}/>

        <div className="firstMessage">We have {doggyBreeds?.length || "0"}  breeds of dogs ready to be matched!</div>
        <div className='searchButtons'>
        <div className='breedButtonDiv'><button className='breedButton' onClick={goToBreeds}><img src={breedImg} className="breedPic"/>Search By Breed </button></div>
        <div className='locationButtonDiv'><button className='locationButton' onClick={goToLocations}><img src={locationImg} className="locationPic"/>Search By Location</button></div>
        </div>

      </>

  );
}

export default Main;
