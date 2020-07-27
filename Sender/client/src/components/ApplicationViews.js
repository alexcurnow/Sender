import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function ApplicationViews() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? (
            <div>
              <p>Hello, Welcome to Sender</p>
              <p onClick={logout}>Logout</p>
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
