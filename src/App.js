import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./components/LoginPage";

function App() {

  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector(state => state.session.user);


  return (
    <>
      {isLoaded && (
          <Switch>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route exact path="/">
                {(user) ? <Redirect to="/" /> : <LoginPage />}
            </Route>
            <Route>
              <h1>404: Page not found</h1>
            </Route>
          </Switch>
        )};
    </>
  );
}

export default App;
