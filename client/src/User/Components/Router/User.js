import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Register from "../../Pages/Register/register";
import Login from "../../Pages/Login/Login";
import { AdminAuthContext } from "../../../Admin/Components/Context/AuthContext";

import { LoggedOutAdminRouter, LoggedInAdminRouter } from "../../../Admin/Components/Router/Admin";
import Team from "../../Pages/Teams/Team";
import Header from "../Header/Header";
import Leagues from "../../Pages/Leagues/Leagues";
import Draft from "../../Pages/Draft/Draft";
import DraftById from "../../Pages/Draft/DraftById";
import FAQ from "../../Pages/FAQ/FAQ"
import About from "../../Pages/About/About"
import Rules from "../../Pages/Rules/Rules"
import Standing from "../../Pages/Standings/Standing";


//return two function 
//when user is logged out
export function LoggedOutUserRouter() {
  const adminContext = useContext(AdminAuthContext);

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/admin">
          {adminContext.isLoggedIn ? <LoggedInAdminRouter /> : <LoggedOutAdminRouter />}
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/standing" exact>
          <Standing />
        </Route>
        <Route path="/draft" exact>
          <Draft />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/faq" exact>
          <FAQ />
        </Route>
        <Route path="/rule" exact>
          <Rules />
        </Route>
        <Route path="/draft/:id" exact>
          <DraftById />
        </Route>
        <Route path="/error" exact>
          <div className="error-404">
            <h1>Not Found</h1>
          </div>
        </Route>
        <Redirect to="/error" />
      </Switch>
    </div>
  );
}

//when user is logged in
export function LoggedInUserRouter() {
  const adminContext = useContext(AdminAuthContext);

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/admin">
          {adminContext.isLoggedIn ? <LoggedInAdminRouter /> : <LoggedOutAdminRouter />}
        </Route>
        <Route path="/error" exact>
          <Header />
          <div className="error-404">

            <h1>Not Found</h1>
          </div>
        </Route>
        <Route path="/team" exact>
          <Team />
        </Route>
        <Route path="/standing" exact>
          <Standing />
        </Route>
        <Route path="/league" exact>
          <Leagues />
        </Route>
        <Route path="/draft" exact>
          <Draft />
        </Route>
        <Route path="/draft/:id" exact>
          <DraftById />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/faq" exact>
          <FAQ />
        </Route>
        <Route path="/rule" exact>
          <Rules />
        </Route>
        <Redirect to="/error" />
      </Switch>
    </div>
  );
}
