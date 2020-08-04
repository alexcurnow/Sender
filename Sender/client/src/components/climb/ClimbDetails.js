import { useParams, useHistory, Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { ClimbContext } from "../../providers/ClimbProvider";
import { CommentList } from "../comment/CommentList";
import { CommentContext } from "../../providers/CommentProvider";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import "./ClimbDetails.css";

export const ClimbDetails = () => {
  const { id } = useParams();
  const parsedId = parseInt(id);

  const history = useHistory();

  const { currentClimb, getClimbById } = useContext(ClimbContext);

  const { comments, getCommentsByClimbId } = useContext(CommentContext);

  useEffect(() => {
    getClimbById(parsedId);
    getCommentsByClimbId(parsedId);
  }, []);

  return (
    <>
      <Card className="m-4 climbDetailsCard">
        <p className="text-left px-2"></p>
        <CardImg top src={currentClimb.imageUrl} alt="climb image" />
        <CardBody>
          <p>
            <strong>{currentClimb.color}</strong>{" "}
            <strong>{currentClimb.grade.name}</strong>
          </p>
          <p>
            {" "}
            {currentClimb.gym} // {currentClimb.city},{" "}
            {currentClimb.state.acronym}
          </p>

          <p>Notes: {currentClimb.notes}</p>
        </CardBody>
        <div className="btns">
          <Button
            onClick={(e) => history.push(`/solution/${parsedId}`)}
            color="info"
          >
            Solve it!
          </Button>
          <Button
            color="success"
            id="backToClimbs"
            onClick={() => history.push("/")}
          >
            Back
          </Button>
        </div>
        <CommentList comments={comments} climbId={parseInt(id)} />
      </Card>
    </>
  );
};
