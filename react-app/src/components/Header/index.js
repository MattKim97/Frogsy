import Logo from "./logo"
import Navigation from '../Navigation'
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import SignupFormPage from "../SignupFormPage";
import LoginFormPage from "../LoginFormPage";
import { authenticate } from "../../store/session";
import './Header.css'
import CartLogo from "./cart_logo";

export default function Header() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
<div className='HeaderStyle'>
      <Logo/>
      <div className='RightSection'>
        <CartLogo/>
        <Navigation isLoaded={isLoaded} />
      </div>
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </div>
  )
}
