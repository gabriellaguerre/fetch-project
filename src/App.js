import React from "react";
import { useSelector } from "react-redux";
import { Route,Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Breeds from "./components/Breeds";
import {selectUser} from '../src/redux/usersSlice';

function App() {

  const user = useSelector(selectUser);


  return (
    <>

          <Routes>
            <Route path="/" element = {<LoginPage />}/>
            <Route path="/main" element = {<Breeds user={user}/> }/>
            <Route path="*" element={<h1>404: Page not found</h1>} />
          </Routes>
      
    </>
  );
}

export default App;
