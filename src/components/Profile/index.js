import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router';
import { logout } from "../../redux/usersSlice";
import profile from '../../assets/puppy_profile_pic.png';
import './Profile.css';

function Profile({user}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ulRef = useRef();
    const thisLocation = useLocation();

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = (e) => {
      e.stopPropagation(); // Prevent event bubbling to avoid triggering the `closeMenu` on document
      setShowMenu((prev) => !prev); // Toggle menu visibility
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
        <button className='profileButton' onClick={openMenu}> <img src={profile} className='profilePic' alt="dog-pic-profile" ></img> </button>
        <ul className={ulClassName} ref={ulRef}>
        {user && (
          <>
         <div className='menu'>
         <div className='userName'> Hello {user}!</div>

         <div className='breedSearchLink'>
          <Link to="/breeds" className={thisLocation.pathname === "/breeds" ? "disabled-link" : ""}>
          Search By Breed</Link></div>

         <div className='locationSearchLink'>
          <Link to="/locations" className={thisLocation.pathname === "/locations" ? "disabled-link" : ""}>
          Search By Location</Link></div>

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
