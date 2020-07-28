import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const GradeContext = createContext();

export const GradeProvider = (props) => {
  const [grades, setGrades] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllGrades = () =>
    getToken().then((token) =>
      fetch("/api/grade", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setGrades)
    );

  return (
    <GradeContext.Provider
      value={{
        grades,
        getAllGrades,
      }}
    >
      {props.children}
    </GradeContext.Provider>
  );
};
