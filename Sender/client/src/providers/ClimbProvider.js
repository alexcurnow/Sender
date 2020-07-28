import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ClimbContext = createContext();

export const ClimbProvider = (props) => {
  const [climbs, setClimbs] = useState([]);
  const [currentUserClimbs, setCurrentUserClimbs] = useState([]);

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

  const getByUserProfileId = (id) =>
    getToken().then((token) =>
      fetch(`/api/climb/getbyuser/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setCurrentUserClimbs)
    );

  return (
    <ClimbContext.Provider
      value={{
        climbs,
        currentUserClimbs,
        getAllClimbs,
        getByUserProfileId,
        setClimbs,
      }}
    >
      {props.children}
    </ClimbContext.Provider>
  );
};
