import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [states, setStates] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllStates = () =>
    getToken().then((token) =>
      fetch("/api/state", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setStates)
    );

  return (
    <StateContext.Provider
      value={{
        states,
        getAllStates,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};
