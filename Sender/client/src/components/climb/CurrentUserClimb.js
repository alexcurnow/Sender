import React, { useContext, useState } from "react";
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

export const CurrentUserClimb = ({ climb }) => {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const { deleteClimb } = useContext(ClimbContext);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

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
            Uploaded by <em>{climb.userProfile.displayName}</em>
            <div>{climb.gym}</div>
            <div>
              {climb.city}, {climb.state.acronym}
            </div>
            Notes: {climb.notes}
          </CardSubtitle>
          <Link to={`/betabuilder/${climb.id}`}>
            <Button>Build the Beta!</Button>
          </Link>
          <Button color="info" onClick={toggleEditModal}>
            Edit
          </Button>
          <Button color="danger" onClick={toggleDeleteModal}>
            Delete
          </Button>
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
