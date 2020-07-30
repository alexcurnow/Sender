import React, { useEffect, useContext, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ClimbContext } from "../../providers/ClimbProvider";
import "./Solution.css";
import { MoveContext } from "../../providers/MoveProvider";

export const Solution = () => {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const history = useHistory();

  const { currentClimb, getClimbById } = useContext(ClimbContext);
  const { moves, getMovesByClimbId } = useContext(MoveContext);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    getClimbById(parsedId);
    getMovesByClimbId(parsedId);

    const canvas = canvasRef.current;
    canvas.style.height = "1000px";
    canvas.style.width = "800px";

    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;

    const img = imageRef.current;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const answerChecker = (e) => {
    moves.forEach((move) => {
      if (
        e.nativeEvent.offsetX >= move.xcoord - 20 &&
        e.nativeEvent.offsetX <= move.xcoord + 20 &&
        e.nativeEvent.offsetY >= move.ycoord - 20 &&
        e.nativeEvent.offsetY <= move.ycoord + 20
      )
        alert(
          `You found move ${move.sequenceNumber} of ${moves.length}! Looks like it's a ${move.limb.name} hold!`
        );
    });
  };

  return (
    <>
      <div className="movesListContainer">
        <ul>
          {moves.map((m) => (
            <li className="invisible">
              {m.sequenceNumber}) {m.limb.name} hold
            </li>
          ))}
        </ul>
      </div>
      <div className="solutionContainer">
        <h1>Send it!</h1>
        <canvas
          onClick={(e) => {
            answerChecker(e);
          }}
          ref={canvasRef}
        ></canvas>
        <img
          className="hidden"
          ref={imageRef}
          src={currentClimb.imageUrl}
          alt="climbing problem"
        />
      </div>
    </>
  );
};
