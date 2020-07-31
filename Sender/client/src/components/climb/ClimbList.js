import React, { useContext, useEffect } from "react";
import { ClimbContext } from "../../providers/ClimbProvider";
import { Climb } from "./Climb";
import "./Climb.css";

export const ClimbList = () => {
  const { climbs, getAllClimbs } = useContext(ClimbContext);

  useEffect(() => {
    getAllClimbs();
  }, []);

  return (
    <div className="climbList">
      {climbs.map((c) => (
        <div key={`climbCard${c.id}`} className="climbCard">
          <Climb key={c.id} climb={c} />
        </div>
      ))}
    </div>
  );
};
