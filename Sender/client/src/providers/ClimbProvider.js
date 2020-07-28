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

  const addClimb = (climb) => {
    return getToken().then((token) =>
      fetch("/api/climb", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(climb),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );
  };

  return (
    <ClimbContext.Provider
      value={{
        climbs,
        currentUserClimbs,
        getAllClimbs,
        getByUserProfileId,
        setClimbs,
        addClimb,
      }}
    >
      {props.children}
    </ClimbContext.Provider>
  );
};
