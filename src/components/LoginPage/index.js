import React, { useState } from "react";
import { login } from "../../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import './LoginPage.css';
import fetchin from '../../Assets/dog fetchin pic.png'


function LoginPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(name, email));
    if (data) {
      setErrors(data);
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
          {errors.map((error, idx) => (
            <li key={idx} style={{color:'red'}}>{error}</li>
          ))}
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
