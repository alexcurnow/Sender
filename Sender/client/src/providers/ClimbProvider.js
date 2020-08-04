import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ClimbContext = createContext();

export const ClimbProvider = (props) => {
  const [climbs, setClimbs] = useState([]);
  const [currentUserClimbs, setCurrentUserClimbs] = useState([]);
  const [currentClimb, setCurrentClimb] = useState({
    grade: {},
    state: {},
    userProfile: {},
  });

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

  const getClimbById = (id) => {
    return getToken().then((token) =>
      fetch(`/api/climb/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setCurrentClimb)
    );
  };

  const getByUserProfileId = (id) => {
    return getToken().then((token) =>
      fetch(`/api/climb/getbyuser/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setCurrentUserClimbs)
    );
  };

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

  const deleteClimb = (id, userId) =>
    getToken().then((token) =>
      fetch(`/api/climb/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          getByUserProfileId(userId);
        } else {
          throw new Error("Unauthorized");
        }
      })
    );

  const updateClimb = (climb, userId) => {
    return getToken().then((token) =>
      fetch(`/api/climb/${climb.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(climb),
      }).then((resp) => {
        if (resp.ok) {
          getByUserProfileId(userId);
        } else {
          throw new Error("Unauthorized");
        }
      })
    );
  };

  const searchClimbs = (searchTerm) => {
    return getToken().then((token) =>
      fetch(`/api/climb/search?q=${searchTerm}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setClimbs)
    );
  };

  return (
    <ClimbContext.Provider
      value={{
        climbs,
        currentUserClimbs,
        currentClimb,
        getAllClimbs,
        getByUserProfileId,
        setClimbs,
        addClimb,
        getClimbById,
        deleteClimb,
        updateClimb,
        searchClimbs,
      }}
    >
      {props.children}
    </ClimbContext.Provider>
  );
};
