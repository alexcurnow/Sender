import React, { useState, useContext } from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { NewCommentForm } from "./NewCommentForm";
import { CommentContext } from "../../providers/CommentProvider";
import { EditCommentForm } from "./EditCommentForm";
import { Comment } from "./Comment";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export const CommentList = ({ comments, climbId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleNewComment, setNewComment] = useState(false);
  const { deleteComment } = useContext(CommentContext);

  const [comment, setComment] = useState({});

  const toggle = () => setIsOpen(!isOpen);
  const toggleNewCommentForm = () => setNewComment(!toggleNewComment);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        Comments
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
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
              <EditCommentForm
                comment={comment}
                climbId={climbId}
                toggle={toggleEdit}
              />
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
          </CardBody>
        </Card>
        <Button
          color="primary"
          onClick={toggleNewCommentForm}
          style={{ marginBottom: "1rem" }}
        >
          Add a New Comment
        </Button>
        <Modal isOpen={toggleNewComment} toggle={toggleNewCommentForm}>
          <ModalHeader toggle={toggleNewCommentForm}></ModalHeader>
          <ModalBody>
            <NewCommentForm
              toggleModal={toggleNewCommentForm}
              climbId={climbId}
            />
          </ModalBody>
        </Modal>
      </Collapse>
    </div>
  );
};
