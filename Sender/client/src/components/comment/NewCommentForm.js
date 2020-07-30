import React, { useContext, useRef } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { Button, Form } from "reactstrap";

export const NewCommentForm = ({ climbId, toggleModal }) => {
  const { addComment } = useContext(CommentContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const message = useRef();

  const createComment = () => {
    addComment(
      {
        climbId: parseInt(climbId),
        userProfileId: userProfile.id,
        message: message.current.value,
      },
      climbId
    );
  };

  return (
    <Form className="commentForm">
      <h3>Add a New Comment</h3>
      <fieldset>
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <input
            type="text"
            name="message"
            required
            className="form-control"
            placeholder="type comment here..."
            ref={message}
            id="commentMessage"
          />
        </div>
      </fieldset>
      <Button
        type="submit"
        className="btn btn-primary"
        onClick={(evt) => {
          evt.preventDefault();
          createComment();
          toggleModal();
        }}
      >
        Save New Comment
      </Button>
      <Button onClick={() => toggleModal()}>Cancel</Button>
    </Form>
  );
};
