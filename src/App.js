import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route,Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Main from "./components/Main";
import Breeds from "./components/Breeds";
import Locations from './components/Locations';
import {selectUser} from '../src/redux/usersSlice';

function App() {

  // const dispatch = useDispatch();

  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   dispatch(authenticate()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  const user = useSelector(selectUser);


  return (
    <>

          <Routes>
            <Route path="/" element = {<LoginPage />}/>
            <Route path="/main" element = {<Main user={user}/> }/>
            <Route path="/breeds" element = {<Breeds />} />
            <Route path="/locations" element = {<Locations />} />
            <Route path="*" element={<h1>404: Page not found</h1>} />
          </Routes>
      
    </>
  );
}

export default App;
