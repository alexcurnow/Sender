import React from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import "./CurrentUserProfile.css";

export const CurrentUserProfile = () => {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
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
      </CardBody>
    </Card>
  );
};
