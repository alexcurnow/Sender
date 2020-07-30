import React, { useContext, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { Button } from "reactstrap";

export const EditCommentForm = ({ comment, climbId, toggle }) => {
  const { updateComment } = useContext(CommentContext);
  const [updatedComment, setComment] = useState(comment);

  const handleControlledInputChange = (event) => {
    const newComment = Object.assign({}, updatedComment);
    newComment[event.target.name] = event.target.value;
    setComment(newComment);
  };

  const editComment = () => {
    updateComment(updatedComment, climbId).then(toggle);
  };

  return (
    <form className="editCommentForm">
      <fieldset>
        <div className="form-group">
          <label htmlFor="content">
            Comment:
            <input
              type="text"
              name="content"
              required
              autoFocus
              className="form-control"
              placeholder="Edit comment"
              defaultValue={comment.message}
              onChange={handleControlledInputChange}
            />
          </label>
        </div>
      </fieldset>
      <Button
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          editComment();
        }}
      >
        Save Updates
      </Button>
      <Button onClick={toggle}>Cancel</Button>
    </form>
  );
};
