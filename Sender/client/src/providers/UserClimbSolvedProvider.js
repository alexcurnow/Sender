import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const UserClimbSolvedContext = createContext();

export const UserClimbSolvedProvider = (props) => {
  const [userClimbsSolved, setUserClimbsSolved] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getUserClimbsSolvedByUserProfileId = (id) => {
    return getToken().then((token) =>
      fetch(`/api/userclimbsolved/getbyuserprofile/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setUserClimbsSolved)
    );
  };

  const addUserClimbSolved = (userClimbSolved) => {
    return getToken().then((token) =>
      fetch("/api/userclimbsolved", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userClimbSolved),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );
  };

  return (
    <UserClimbSolvedContext.Provider
      value={{
        userClimbsSolved,
        addUserClimbSolved,
        getUserClimbsSolvedByUserProfileId,
      }}
    >
      {props.children}
    </UserClimbSolvedContext.Provider>
  );
};
