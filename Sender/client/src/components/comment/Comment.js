import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import "./Comment.css";

export const Comment = ({ c, toggleEdit, toggleDelete, setComment }) => {
  const [date, time] = c.dateCreated.split("T");

  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
  // const userId = parseInt(currentUser.id);

  return c.userProfileId === currentUser.id ? (
    <>
      <div className="p-3 my-2 rounded">
        <Toast>
          <ToastHeader>
            <img
              className="profileImg"
              src={c.userProfile.imageLocation}
              alt="user profile"
            />
            <span>{c.userProfile.displayName}</span>
          </ToastHeader>
          <ToastBody>
            {c.message}
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
          </ToastBody>
        </Toast>
      </div>
    </>
  ) : (
    <div className="p-3 my-2 rounded">
      <Toast>
        <ToastHeader>
          <img
            className="profileImg"
            src={c.userProfile.imageLocation}
            alt="user profile"
          />
          <span>{c.userProfile.displayName}</span>
        </ToastHeader>
        <ToastBody>{c.message}</ToastBody>
      </Toast>
    </div>
  );
};
