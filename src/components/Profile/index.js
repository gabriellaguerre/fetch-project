import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import { logout } from "../../redux/usersSlice";
import profile from '../../assets/puppy_profile_pic.png';
import './Profile.css';

function Profile({user}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ulRef = useRef();


    const [showMenu, setShowMenu] = useState(false);

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
