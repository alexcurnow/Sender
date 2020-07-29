import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const LimbContext = createContext();

export const LimbProvider = (props) => {
  const [limbs, setLimbs] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllLimbs = () => {
    return getToken().then((token) =>
      fetch(`/api/limb`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setLimbs)
    );
  };

  return (
    <LimbContext.Provider
      value={{
        limbs,
        getAllLimbs,
      }}
    >
      {props.children}
    </LimbContext.Provider>
  );
};
