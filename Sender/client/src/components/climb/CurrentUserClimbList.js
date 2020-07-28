import React, { useContext, useEffect } from "react";
import { ClimbContext } from "../../providers/ClimbProvider";
import { Climb } from "./Climb";

export const CurrentUserClimbList = () => {
  const { currentUserClimbs, getByUserProfileId } = useContext(ClimbContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getByUserProfileId(userProfile.id);
  }, []);

  return (
    <div className="climbList">
      {currentUserClimbs.map((c) => (
        <Climb key={c.id} climb={c} />
      ))}
    </div>
  );
};
