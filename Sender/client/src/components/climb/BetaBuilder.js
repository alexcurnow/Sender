import React, { useContext, useEffect, useState, useRef } from "react";
import { ClimbContext } from "../../providers/ClimbProvider";
import { useParams } from "react-router-dom";
import "./BetaBuilder.css";

export const BetaBuilder = () => {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const { currentClimb, getClimbById } = useContext(ClimbContext);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    getClimbById(parsedId);

    const canvas = canvasRef.current;
    canvas.style.height = "1000px";
    canvas.style.width = "800px";
    // canvas.style.border = "1px solid black";

    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;
    // ctx.imageSmoothingEnabled = false;

    const img = imageRef.current;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <img
        className="hidden"
        ref={imageRef}
        src={currentClimb.imageUrl}
        alt="climbing problem"
      />
    </>
  );
};
