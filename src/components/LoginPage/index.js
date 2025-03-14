import React, { useState } from "react";
import { login } from "../../redux/usersSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router';
import './LoginPage.css';
import fetchin from '../../assets/dog_fetchin_pic.png'


function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

 

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    if (!name) {
      setError("Please enter a name"); //Checking if a name was entered
      return
    }

//Verifying if email entered is standard
    const emailVerification = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
    if(!emailVerification.test(email)){
      setError("Please enter a valid email")
      return
    } 

    const data = await dispatch(login({name, email}));

    if (data.payload) {
        navigate('/main', { state: { name } });
    }
 }

  //**********************Login Without Entering a name and email */

  // const demoLogin = async () => {
  //    const data = await dispatch(login({name, email}));

  //   if (data.payload) {
  //     navigate('/main', { state: { name } });

  //   }
  // }
//******************************************************************************** */

  const errorClassName = 'errorsLogin' + (error ? "": "hidden") //toggle errors messages

  return (
    <div className='loginPage'>

    <form onSubmit={handleSubmit}>

      <div className='loginPic'>
      <img src={fetchin} className='dogpic' alt="dog-pic" ></img>
      </div>

      <div className='loginText'>Welcome to Fetch!</div>
      <div className={errorClassName}>{error}</div>
       
        <div className='nameInput'>
          Name:{' '}
          <input
            type="text"
            value={name}
            onChange={(e) => {setName(e.target.value);setError("")}}
          />

        </div>
        <div className='emailInput'>
          Email:{' '}
          <input
            type="text"
            value={email}
            onChange={(e) => {setEmail(e.target.value);setError("")}}
          />

        </div>
        <div className='loginButton'>
        <button id='submitLogin' type="submit">Log In</button>
        {/* <button id='submitLogin'onClick={demoLogin}>Demo</button> */}
    </div>
    </form>

    </div>
  );
}

export default LoginPage;
