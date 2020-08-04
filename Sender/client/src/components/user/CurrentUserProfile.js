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
    <div className="userProfile">
      <img
        className="userProfileImg"
        width="100%"
        src={userProfile.imageLocation}
        alt="User Profile"
      />
      <div className="userProfileInfo">
        <p>{userProfile.displayName}</p>
        <p>Climbs Solved: {userClimbsSolved.length}</p>
        <p>Climbs Uploaded: {currentUserClimbs.length}</p>
      </div>
    </div>
  );
};
