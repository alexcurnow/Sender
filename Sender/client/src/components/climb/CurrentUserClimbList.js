import React, { useContext, useEffect } from "react";
import { ClimbContext } from "../../providers/ClimbProvider";
import { CurrentUserClimb } from "./CurrentUserClimb";

export const CurrentUserClimbList = () => {
  const { currentUserClimbs, getByUserProfileId } = useContext(ClimbContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getByUserProfileId(userProfile.id);
  }, []);

  return (
    <div className="climbList">
      {currentUserClimbs.map((c) => (
        <CurrentUserClimb key={c.id} climb={c} />
      ))}
    </div>
  );
};
