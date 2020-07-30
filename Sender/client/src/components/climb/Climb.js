import React, { useContext, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { CommentList } from "../comment/CommentList";
import { CommentContext } from "../../providers/CommentProvider";

export const Climb = ({ climb }) => {
  return (
    <Card className="m-4">
      <CardImg top width="100%" src={climb.imageUrl} alt={climb.grade.name} />
      <CardBody>
        <CardTitle>
          <Link to={`/climbs/${climb.id}`}>
            <span>{climb.color}</span>
            <span>{climb.grade.name}</span>
          </Link>
        </CardTitle>
        <CardSubtitle>
          Uploaded by <em>{climb.userProfile.displayName}</em>
          <div>{climb.gym}</div>
          <div>
            {climb.city}, {climb.state.acronym}
          </div>
        </CardSubtitle>
        <CardText>Notes: {climb.notes}</CardText>
        <Link to={`solution/${climb.id}`}>
          <Button>Solve it!</Button>
        </Link>
      </CardBody>
    </Card>
  );
};
