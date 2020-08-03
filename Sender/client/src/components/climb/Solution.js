import React, { useEffect, useContext, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ClimbContext } from "../../providers/ClimbProvider";
import "./Solution.css";
import { MoveContext } from "../../providers/MoveProvider";
import { UserClimbSolvedContext } from "../../providers/UserClimbSolvedProvider";

export const Solution = () => {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const history = useHistory();

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const [clickCount, setClickCount] = useState(1);

  const { currentClimb, getClimbById } = useContext(ClimbContext);
  const { moves, getMovesByClimbId } = useContext(MoveContext);
  const { addUserClimbSolved } = useContext(UserClimbSolvedContext);

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

      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
  }, []);

  const drawCircle = (e) => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const r = 20;

    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI * 2, false);
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  const newUserClimbSolved = {
    userProfileId: userProfile.id,
    climbId: parsedId,
  };

  const alertComplete = (moves) => {
    const finalMove = moves.slice(-1)[0];
    alert(
      `Congrats, you found the final move for this climb: a ${finalMove.limb.name} hold! Now go send another one!`
    );
  };

  const answerChecker = (e) => {
    if (clickCount !== moves.length) {
      for (const move of moves) {
        if (
          e.nativeEvent.offsetX >= move.xcoord - 20 &&
          e.nativeEvent.offsetX <= move.xcoord + 20 &&
          e.nativeEvent.offsetY >= move.ycoord - 20 &&
          e.nativeEvent.offsetY <= move.ycoord + 20
        ) {
          alert(
            `You found move ${move.sequenceNumber} of ${moves.length}! Looks like it's a ${move.limb.name} hold!`
          );
          drawCircle(e);
          setClickCount(clickCount + 1);
          return;
        }
      }
      for (const move of moves) {
        if (
          e.nativeEvent.offsetX >= move.xcoord - 20 &&
          e.nativeEvent.offsetX <= move.xcoord + 20 &&
          e.nativeEvent.offsetY >= move.ycoord - 20 &&
          e.nativeEvent.offsetY <= move.ycoord + 20
        ) {
          break;
        } else if (
          e.nativeEvent.offsetX < move.xcoord - 20 ||
          e.nativeEvent.offsetY < move.ycoord - 20
        ) {
          alert("Mmm, not quite...");
          break;
        } else if (
          e.nativeEvent.offsetX > move.xcoord + 20 ||
          e.nativeEvent.offsetY > move.ycoord + 20
        ) {
          alert("Mmm, not quite...");
          break;
        }
      }
    } else if (clickCount === moves.length) {
      alertComplete(moves);
      addUserClimbSolved(newUserClimbSolved, userProfile.id).then(
        history.push("/")
      );
    }
  };

  return (
    <>
      <div className="movesListContainer">
        <ul>
          {moves.map((m) => (
            <li key={`moveList-${m.id}`} className="invisible">
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
