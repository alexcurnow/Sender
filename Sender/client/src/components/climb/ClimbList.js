import React, { useContext, useEffect, useState } from "react";
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
        <Climb key={c.id} climb={c} />
      ))}
    </div>
  );
};
