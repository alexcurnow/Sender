import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const MoveContext = createContext();

export const MoveProvider = (props) => {
  const [moves, setMoves] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllMoves = () => {
    return getToken().then((token) =>
      fetch(`/api/move`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setMoves)
    );
  };

  const getMovesByClimbId = (id) => {
    return getToken().then((token) =>
      fetch(`/api/move/getbyclimb/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setMoves)
    );
  };

  const addMove = (move) => {
    return getToken().then((token) =>
      fetch("/api/move", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(move),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );
  };

  return (
    <MoveContext.Provider
      value={{
        moves,
        addMove,
        getMovesByClimbId,
        getAllMoves,
      }}
    >
      {props.children}
    </MoveContext.Provider>
  );
};
