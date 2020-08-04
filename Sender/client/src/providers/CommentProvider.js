import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = createContext();

export const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getCommentsByClimbId = (id) =>
    getToken().then((token) =>
      fetch(`/api/comment/getbyclimb/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setComments)
    );

  const addComment = (comment, climbId) =>
    getToken().then((token) =>
      fetch("/api/comment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }).then(() => {
        getCommentsByClimbId(climbId);
      })
    );

  const deleteComment = (id, climbId) =>
    getToken().then((token) =>
      fetch(`/api/comment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          getCommentsByClimbId(climbId);
        } else {
          throw new Error("Unauthorized");
        }
      })
    );

  const updateComment = (comment, climbId) => {
    return getToken().then((token) =>
      fetch(`/api/comment/${comment.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }).then((resp) => {
        if (resp.ok) {
          getCommentsByClimbId(climbId);
        } else {
          throw new Error("Unauthorized");
        }
      })
    );
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        getCommentsByClimbId,
        addComment,
        deleteComment,
        updateComment,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
