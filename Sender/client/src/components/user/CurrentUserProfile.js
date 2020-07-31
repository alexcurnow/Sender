import React, { useContext, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import "./CurrentUserProfile.css";
import { UserClimbSolvedContext } from "../../providers/UserClimbSolvedProvider";
import { ClimbContext } from "../../providers/ClimbProvider";

export const CurrentUserProfile = () => {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const { userClimbsSolved, getUserClimbsSolvedByUserProfileId } = useContext(
    UserClimbSolvedContext
  );

  const { currentUserClimbs, getByUserProfileId } = useContext(ClimbContext);

  useEffect(() => {
    getUserClimbsSolvedByUserProfileId(userProfile.id);
    getByUserProfileId(userProfile.id);
  }, []);

  return (
    <Card className="userProfile">
      <CardImg
        className="userProfileImg"
        top
        width="100%"
        src={userProfile.imageLocation}
        alt="User Profile Picture"
      />
      <CardBody>
        <CardTitle>{userProfile.displayName}</CardTitle>
        <CardSubtitle>Climbs Solved: {userClimbsSolved.length}</CardSubtitle>
        <CardSubtitle>Climbs Uploaded: {currentUserClimbs.length}</CardSubtitle>
      </CardBody>
    </Card>
  );
};
