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
      <Card className="m-4">
        <p className="text-left px-2"></p>
        <CardImg top src={currentClimb.imageUrl} alt="climb image" />
        <CardBody>
          <p>
            <strong>{currentClimb.grade.name}</strong>
          </p>
          <p> {currentClimb.gym}</p>
          <p>
            {currentClimb.city}, {currentClimb.state.acronym}
          </p>
        </CardBody>
        <div className="btns">
          <Link className="solveLink" to={`/solution/${parsedId}`}>
            <Button color="primary">Solve it!</Button>
            <Button id="backToClimbs" onClick={() => history.push("/")}>
              Back
            </Button>
          </Link>
        </div>
        <CommentList comments={comments} climbId={parseInt(id)} />
      </Card>
    </>
  );
};
