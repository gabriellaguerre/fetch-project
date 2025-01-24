import React, { useState } from "react";
import { login } from "../../redux/usersSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router';
import './LoginPage.css';
import fetchin from '../../Assets/dog_fetchin_pic.png'


function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [NameError, setNameError] = useState("");
  const [Eerror, setEError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login({name, email}));
    if (data.payload) {
      navigate('/main', { state: { name } });
      navigate('/main');
    }

    // if (!name) {
    //   let error = "Please enter a name"
    //   setNameError(error);
    // }

    // if (!email) {
    //   let error = "Please enter an email"
    //   setEError(error);
    // }



  }



  return (
    <>

 <form onSubmit={handleSubmit}>

      <div className='loginPic'>
      <img src={fetchin} className='dogpic' alt="dog-pic" ></img>
      </div>
      <div className='loginText'>Welcome to Fetch! Please Log In</div>
        <div className='errorsLogin'>
         {/* {error} */}
        </div>
        <div className='nameInput'>
          Name:{' '}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className='errorsLogin'>{NameError}</span>
        </div>
        <div className='emailInput'>
          Email:{' '}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
            <span className='errorsLogin'>{Eerror}</span>
        </div>
        <div className='loginButton'>
        <button id='submitLogin' type="submit">Log In</button>
    </div>
    </form>

    </>
  );
}

export default LoginPage;
