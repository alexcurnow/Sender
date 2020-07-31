import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

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
          {climb.city}, {climb.state.acronym}
        </CardSubtitle>
        <Link to={`solution/${climb.id}`}>
          <Button>Solve it!</Button>
        </Link>
      </CardBody>
    </Card>
  );
};
