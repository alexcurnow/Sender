import React, { useContext, useEffect, useState } from "react";
import { ClimbContext } from "../../providers/ClimbProvider";
import { CurrentUserClimb } from "./CurrentUserClimb";
import "./Climb.css";

export const CurrentUserClimbList = () => {
  const { currentUserClimbs, getByUserProfileId } = useContext(ClimbContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const [userProfileId, setUserProfileId] = useState();

  useEffect(() => {
    if (userProfileId) {
      debugger;
      getByUserProfileId(userProfileId);
    } else {
      getByUserProfileId(userProfile.id);
    }
  }, []);

  return (
    <div className="climbList">
      {currentUserClimbs.map((c) => (
        <div className="climbCard">
          <CurrentUserClimb
            key={c.id}
            climb={c}
            userProfileId={userProfile.id}
            setUserProfileId={setUserProfileId}
          />
        </div>
      ))}
    </div>
  );
};
