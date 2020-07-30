import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { ClimbList } from "./climb/ClimbList";
import "./ApplicationViews.css";
import { CurrentUserProfile } from "./user/CurrentUserProfile";
import { CurrentUserClimbList } from "./climb/CurrentUserClimbList";
import { NewClimbForm } from "./climb/NewClimbForm";
import { BetaBuilder } from "./climb/BetaBuilder";
import { Solution } from "./climb/Solution";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? (
            <div className="dashboardContainer">
              <div className="currentUserProfileContainer">
                <CurrentUserProfile />
              </div>
              <ClimbList />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/userclimbs">
          {isLoggedIn ? (
            <div className="currentUserClimbs">
              <CurrentUserClimbList />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/uploadClimb">
          {isLoggedIn ? (
            <div className="newClimbFormContainer">
              <NewClimbForm />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/betabuilder/:id">
          {isLoggedIn ? (
            <div className="betaBuilderContainer">
              <BetaBuilder />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/solution/:id">
          {isLoggedIn ? (
            <div className="solutionMainContainer">
              <Solution />
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
