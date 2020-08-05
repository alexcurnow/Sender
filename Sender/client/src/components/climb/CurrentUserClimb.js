import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
} from "reactstrap";
import { ClimbContext } from "../../providers/ClimbProvider";
import { Link } from "react-router-dom";
import { EditClimbForm } from "./EditClimbForm";
import "./CurrentUserClimb.css";
import { MoveContext } from "../../providers/MoveProvider";

export const CurrentUserClimb = ({ climb }) => {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  const { deleteClimb } = useContext(ClimbContext);
  const { moves, getAllMoves } = useContext(MoveContext);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    getAllMoves();
  }, []);

  const anyMatchingMove = moves.find((m) => m.climbId === climb.id);

  return (
    <>
      <Card className="m-4">
        <CardImg top width="100%" src={climb.imageUrl} alt={climb.grade.name} />
        <CardBody>
          <CardTitle>
            <Link to={`/climbs/${climb.id}`}>
              <span>{climb.color}</span> <span>{climb.grade.name}</span>
            </Link>
          </CardTitle>
          <CardSubtitle>
            <div>{climb.gym}</div>
            <div>
              {climb.city}, {climb.state.acronym}
            </div>
          </CardSubtitle>
          <div className="betaBuilderBtn">
            {anyMatchingMove ? (
              <Button color="primary">Beta Uploaded</Button>
            ) : (
              <Link to={`/betabuilder/${climb.id}`}>
                <Button color="info">Build the Beta</Button>
              </Link>
            )}
          </div>
          <div className="currentUserClimbBtns">
            <Button
              style={{ marginRight: "auto" }}
              color="success"
              onClick={toggleEditModal}
            >
              Edit
            </Button>
            <Button
              style={{ marginLeft: "auto" }}
              color="danger"
              onClick={toggleDeleteModal}
            >
              Delete
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={deleteModal}>
        <div>
          Are you sure you want to delete this climb?
          <br />
          <br />
          <Button
            color="danger"
            onClick={(e) => {
              e.preventDefault();
              deleteClimb(climb.id, userProfile.id);
            }}
          >
            Yes, delete
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            No, go back
          </Button>
        </div>
      </Modal>

      <Modal isOpen={editModal}>
        <EditClimbForm
          climb={climb}
          userId={userProfile.id}
          toggleEdit={toggleEditModal}
        />
      </Modal>
    </>
  );
};
