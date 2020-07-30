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

  return (
    <>
      <div className="p-3 my-2 rounded">
        <Toast>
          <ToastHeader>
            <img
              className="profileImg"
              src={c.userProfile.imageLocation}
              alt="user profile image"
            />
            <span>{c.userProfile.displayName}</span>
          </ToastHeader>
          <ToastBody>{c.message}</ToastBody>
        </Toast>
      </div>
      <Button
        color="primary"
        onClick={() => {
          setComment(c);
          toggleEdit();
        }}
      >
        Edit
      </Button>
      <Button
        color="danger"
        onClick={() => {
          setComment(c);
          toggleDelete();
        }}
      >
        Delete
      </Button>
    </>
  );
};
