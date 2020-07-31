import React, { useEffect, useContext, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ClimbContext } from "../../providers/ClimbProvider";
import "./Solution.css";
import { MoveContext } from "../../providers/MoveProvider";

export const Solution = () => {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const history = useHistory();

  const [clickCount, setClickCount] = useState(1);

  const { currentClimb, getClimbById } = useContext(ClimbContext);
  const { moves, getMovesByClimbId } = useContext(MoveContext);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    getClimbById(parsedId);
    getMovesByClimbId(parsedId);

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;

    const img = imageRef.current;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.style.height = "1000px";
      canvas.style.width = "800px";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  // const drawCircle = (e) => {
  //   const canvas = canvasRef.current;

  //   const ctx = canvas.getContext("2d");
  //   contextRef.current = ctx;

  //   const x = e.nativeEvent.offsetX;
  //   const y = e.nativeEvent.offsetY;
  //   const r = 50;

  //   ctx.beginPath();
  //   ctx.arc(x, y, r, Math.PI * 2, false);
  //   ctx.strokeStyle = "blue";
  //   ctx.stroke();
  // };

  const alertComplete = (moves) => {
    const finalMove = moves.slice(-1)[0];
    alert(
      `Congrats, you found the final move for this climb: a ${finalMove.limb.name} hold! Now go send another one!`
    );
  };

  const answerChecker = (e) => {
    if (clickCount !== moves.length) {
      moves.forEach((move) => {
        if (
          e.nativeEvent.offsetX >= move.xcoord - 20 &&
          e.nativeEvent.offsetX <= move.xcoord + 20 &&
          e.nativeEvent.offsetY >= move.ycoord - 20 &&
          e.nativeEvent.offsetY <= move.ycoord + 20
        ) {
          alert(
            `You found move ${move.sequenceNumber} of ${moves.length}! Looks like it's a ${move.limb.name} hold!`
          );
          setClickCount(clickCount + 1);
        }
      });
    } else if (clickCount === moves.length) {
      alertComplete(moves);
      history.push("/");
    }
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
            // drawCircle(e);
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
