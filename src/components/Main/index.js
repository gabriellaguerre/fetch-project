import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {useNavigate} from 'react-router';
import { logout } from "../../redux/usersSlice";
import LoginPage from '../LoginPage';


function Main() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const name = user.name;
    console.log(name,'name')


    const logoutUser = () => {
      dispatch(logout());
      navigate('/');
    }
  
  return (
    <>
    {name ? (
      <>
         <h1> HEllo {name}</h1>
          <button onClick={logoutUser}>Logout</button>
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
