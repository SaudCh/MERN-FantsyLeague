import React from "react";
import { Redirect } from "react-router-dom";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Users from "../../Pages/Users/Users";
import SideBar from "../SideBar/SideBar";
import "../Css/admin-sidebar.css";
import Players from "../../Pages/Players/Player";
import Teams from "../../Pages/Team/teams";
import Squad from "../../Pages/Squad/Squad";

//contain two routers 

//if user is not log in
export function LoggedOutAdminRouter() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/login`} exact>
        <Login />
      </Route>
      <Redirect to={`${path}/login`} />
    </Switch>
  );
}

//if user us logged in
export function LoggedInAdminRouter() {
  let { path } = useRouteMatch();

  return (
    <div>
      <SideBar />
      <div className="adm-header"></div>
      <div className="ad-home bg-light">
        <Switch>
          <Route exact path={path}>
            <Home />
          </Route>
          <Route exact path={`${path}/users`}>
            <Users />
          </Route>
          <Route exact path={`${path}/teams`}>
            <Teams />
          </Route>
          <Route exact path={`${path}/players`}>
            <Players />
          </Route>
          <Route exact path={`${path}/squad`}>
            <Squad />
          </Route>
          <Route path={`${path}/error`} exact>
            <div className="error-404">
              <h1>404 Not Found</h1>
            </div>
          </Route>

          <Redirect to={`${path}/error`} />
        </Switch>
      </div>
    </div>
  );
}
