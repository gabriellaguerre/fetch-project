import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {useNavigate} from 'react-router';
import { logout } from "../../redux/usersSlice";
import profile from '../../Assets/puppy_profile_pic.png';
import './Profile.css';

function Profile({user}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ulRef = useRef();

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

      useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
      const closeMenu = () => setShowMenu(false);

     const logoutUser = () => {
          dispatch(logout());
          navigate('/');
        }

    return (
        <>
        <div className='profile'>
        <button className='profileButton'><img src={profile} className='profilePic' alt="dog-pic-profile" ></img></button>
        <ul className={ulClassName} ref={ulRef}>
        {/* {user && (
          <>
         <div> Hello {user}!</div>
         <div><button onClick={logoutUser}>Logout</button></div>
         </>
           )} */}
        </ul>
        </div>
       </>
        )
}
export default Profile;
