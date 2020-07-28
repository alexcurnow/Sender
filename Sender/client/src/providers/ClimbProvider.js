import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ClimbContext = createContext();

export const ClimbProvider = (props) => {
  const [climbs, setClimbs] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllClimbs = () =>
    getToken().then((token) =>
      fetch("/api/climb", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setClimbs)
    );

  return (
    <ClimbContext.Provider
      value={{
        climbs,
        getAllClimbs,
        setClimbs,
      }}
    >
      {props.children}
    </ClimbContext.Provider>
  );
};
