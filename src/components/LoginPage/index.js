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
  const [errors, setErrors] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login({name, email}));
    if (data.payload) {
      navigate('/main', { state: { name } });
    }

  }



  return (
    <>

 <form onSubmit={handleSubmit}>

      <div>
      <img src={fetchin} alt="ivy-pic" width="130" height="100"></img>
      </div>
      <div>Log In</div>
        <div className='errorsLogin'>
        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx} style={{color:'red'}}>{error}</li>
          ))} */}
        </ul>
        </div>
        <div className='name'>
          name:{' '}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='email'>
          email:{' '}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='buttons'>
        <span className='submitLogin'><button id='submitLogin' type="submit">Log In</button></span>
    </div>
    </form>

    </>
  );
}

export default LoginPage;
