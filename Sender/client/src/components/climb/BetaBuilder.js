import React, { useContext, useEffect, useState, useRef } from "react";
import { ClimbContext } from "../../providers/ClimbProvider";
import { useParams, useHistory } from "react-router-dom";
import "./BetaBuilder.css";
import { LimbContext } from "../../providers/LimbProvider";
import {
  Modal,
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { LimbSelect } from "../limb/LimbSelect";
import { MoveContext } from "../../providers/MoveProvider";

export const BetaBuilder = () => {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const history = useHistory();

  const { currentClimb, getClimbById } = useContext(ClimbContext);
  const { limbs, getAllLimbs } = useContext(LimbContext);
  const { addMove } = useContext(MoveContext);

  const [limb, setLimb] = useState();
  const [sequenceNum, setSequenceNum] = useState(0);
  const [movesList, setMovesList] = useState([]);

  const [limbModal, setLimbModal] = useState(false);

  const toggleLimbModal = () => setLimbModal(!limbModal);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [r, setR] = useState(20);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    getClimbById(parsedId);
    getAllLimbs();

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;

    const img = imageRef.current;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const getCoords = (e) => {
    setSequenceNum(sequenceNum + 1);
    setX(e.nativeEvent.offsetX);
    setY(e.nativeEvent.offsetY);
    setR(20);
  };

  const newMove = {
    climbId: parsedId,
    limbId: parseInt(limb),
    sequenceNumber: sequenceNum,
    xcoord: x,
    ycoord: y,
    radius: r,
  };

  const uploadMovesList = (movesList) => {
    movesList.forEach((move) => addMove(move));
    history.push("/");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <>
      <h1>Build your beta</h1>

      <Modal isOpen={limbModal} toggle={toggleLimbModal}>
        <LimbSelect
          limbs={limbs}
          setLimb={setLimb}
          toggleLimbModal={toggleLimbModal}
          setMovesList={setMovesList}
          newMove={newMove}
          movesList={movesList}
        />
      </Modal>
      <h3>Instructions</h3>
      <div className="instructionCanvasContainer">
        <div className="instructions">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>What do I do?</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                Click the holds in the order you did the climb.
              </DropdownItem>
              <DropdownItem>
                Try to click precisely where you touched each hold.
              </DropdownItem>
              <DropdownItem>
                Select which hand or foot went on the hold you clicked.
              </DropdownItem>
              <DropdownItem>
                Once you've added all the moves, click the <b>Upload Beta</b>
              </DropdownItem>
              <DropdownItem>
                button and you're all set! You'll be taken back to your
                dashboard
              </DropdownItem>
              <DropdownItem>
                where you can see your climb among the other user climbs.
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="canvas">
          <canvas
            onClick={(e) => {
              getCoords(e);
              toggleLimbModal();
            }}
            ref={canvasRef}
          ></canvas>
          <img
            className="hidden"
            ref={imageRef}
            src={currentClimb.imageUrl}
            alt="climbing problem"
          />
          <Button
            className="submitBeta"
            onClick={(e) => {
              uploadMovesList(movesList);
            }}
          >
            Upload Beta
          </Button>
        </div>
      </div>
    </>
  );
};
