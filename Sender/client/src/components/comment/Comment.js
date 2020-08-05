import React from "react";
import "./Comment.css";

export const Comment = ({ c, toggleEdit, toggleDelete, setComment }) => {
  const [date, time] = c.dateCreated.split("T");

  const currentUser = JSON.parse(localStorage.getItem("userProfile"));

  return c.userProfileId === currentUser.id ? (
    <>
      <div className="p-3 my-2">
        <div className="userProfileComment">
          <img
            className="profileImg"
            src={c.userProfile.imageLocation}
            alt="user profile"
          />
          <span>{c.userProfile.displayName}</span>
        </div>
        <div>{c.message}</div>
        <p className="editDeleteContainer">
          <span>
            <a
              className="editComment"
              onClick={() => {
                setComment(c);
                toggleEdit();
              }}
            >
              edit
            </a>
          </span>
          <span>
            <a
              className="deleteComment"
              onClick={() => {
                setComment(c);
                toggleDelete();
              }}
            >
              delete
            </a>
          </span>
        </p>
      </div>
    </>
  ) : (
    <div className="p-3 my-2 rounded">
      <img
        className="profileImg"
        src={c.userProfile.imageLocation}
        alt="user profile"
      />
      <span>{c.userProfile.displayName}</span>
      <p>{c.message}</p>
    </div>
  );
};
