import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { NewCommentForm } from "./NewCommentForm";
import { CommentContext } from "../../providers/CommentProvider";
import { EditCommentForm } from "./EditCommentForm";
import { Comment } from "./Comment";

export const CommentList = ({ comments, climbId }) => {
  const [toggleNewComment, setNewComment] = useState(false);
  const { deleteComment } = useContext(CommentContext);

  const [comment, setComment] = useState({});

  const toggleNewCommentForm = () => setNewComment(!toggleNewComment);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((c) => (
        <Comment
          key={c.id}
          toggleEdit={toggleEdit}
          toggleDelete={toggleDelete}
          setComment={setComment}
          c={c}
        />
      ))}
      <Modal isOpen={editModal}>
        <ModalHeader toggle={toggleEdit}>Edit your comment</ModalHeader>
        <ModalBody>
          <EditCommentForm
            comment={comment}
            climbId={climbId}
            toggle={toggleEdit}
          />
        </ModalBody>
      </Modal>

      <Modal isOpen={deleteModal}>
        <div>
          Are you sure you want to delete this comment?
          <br />
          <br />
          <Button
            color="danger"
            onClick={(e) => {
              e.preventDefault();
              deleteComment(comment.id, climbId);
              toggleDelete();
            }}
          >
            Yes, delete
          </Button>
          <Button color="secondary" onClick={toggleDelete}>
            No, go back
          </Button>
        </div>
      </Modal>
      <Button
        color="primary"
        onClick={toggleNewCommentForm}
        style={{ margin: 10 }}
      >
        New Comment
      </Button>
      <Modal isOpen={toggleNewComment} toggle={toggleNewCommentForm}>
        <ModalHeader toggle={toggleNewCommentForm}>
          Add a new comment
        </ModalHeader>
        <ModalBody>
          <NewCommentForm
            toggleModal={toggleNewCommentForm}
            climbId={climbId}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
