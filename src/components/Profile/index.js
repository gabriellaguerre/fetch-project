import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import { logout } from "../../redux/usersSlice";
import { getDogBreed, breeds} from '../../redux/dogsSlice';
import profile from '../../assets/puppy_profile_pic.png';
import './Profile.css';

function Profile({user}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ulRef = useRef();

    const doggyBreeds = useSelector(getDogBreed)
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        dispatch(breeds());
      }, [dispatch]);

    // console.log(doggyBreeds, 'doggyBreeds')

    const openMenu = (e) => {
      e.stopPropagation();
      setShowMenu((prev) => !prev);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
        if (ulRef.current && !ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener("click", closeMenu);
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


      const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


      const logoutUser = () => {
          dispatch(logout());
          navigate('/');
        }

    return (
        <>
        <div className='profile'>
         <div className='welcomeMessage'>Welcome! We have {doggyBreeds.length} breeds to choose from !!</div>
        <button className='profileButton' onClick={openMenu}> <img src={profile} className='profilePic' alt="dog-pic-profile" ></img> </button>
        <ul className={ulClassName} ref={ulRef}>
        {user && (
          <>
         <div className='menu'>
         <div className='userName'> Hello {user}!</div>

         <div className='buttonDiv'><button className='logoutButton' onClick={logoutUser}>Logout</button></div>
         </div>
         </>
           )}
        </ul>
        </div>
       </>
        )
}
export default Profile;
