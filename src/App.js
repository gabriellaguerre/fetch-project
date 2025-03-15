import React from "react";
import { Route,Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Breeds from "./components/Breeds";


function App() {


  return (
    <>

          <Routes>
            <Route path="/" element = {<LoginPage />}/>
            <Route path="/main" element = {<Breeds /> }/>
            <Route path="*" element={<h1>404: Page not found</h1>} />
          </Routes>

    </>
  );
}

export default App;
