import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const MoveContext = createContext();

export const MoveProvider = (props) => {
  const [moves, setMoves] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getMovesByClimbId = (id) => {
    debugger;
    return getToken().then((token) =>
      fetch(`api/move/getbyclimb/${id}`, {
        method: "GET",
        header: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setMoves)
    );
  };

  return (
    <MoveContext.Provider
      value={{
        moves,
        getMovesByClimbId,
      }}
    >
      {props.children}
    </MoveContext.Provider>
  );
};
