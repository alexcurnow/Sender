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
      <fieldset>
        <div className="form-group">
          <label htmlFor="message" className="form-label"></label>
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
      <div className="btns">
        <Button
          color="primary"
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
        <Button color="success" onClick={() => toggleModal()}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};
