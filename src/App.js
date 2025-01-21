import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, redirect, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";

function App() {

  // const dispatch = useDispatch();

  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   dispatch(authenticate()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  // const user = useSelector(state => state.session.user);


  return (
    <>
      {/* {isLoaded && ( */}
          <Routes>
            <Route path="/login"> <LoginPage /> </Route>
            <Route exact path="/"> (user) ? render={()=> <redirect to="/" />} : <LoginPage /> </Route>
            <Route> <h1>404: Page not found</h1> </Route>
          </Routes>
        {/* )}; */}
    </>
  );
}

export default App;
