import React, { useContext, useEffect, useState } from "react";
import { ClimbContext } from "../../providers/ClimbProvider";
import { useParams } from "react-router-dom";

export const BetaBuilder = () => {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const { currentClimb, climbs, getAllClimbs, getClimbById } = useContext(
    ClimbContext
  );

  useEffect(() => {
    getAllClimbs();
    getClimbById(parsedId);
  }, []);

  console.log(climbs);
  console.log(currentClimb);

  const jsx = <img src={currentClimb.imageUrl} />;

  return <>{jsx}</>;
};
