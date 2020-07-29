import React, { useContext, useEffect, useState, useRef } from "react";
import { ClimbContext } from "../../providers/ClimbProvider";
import { useParams } from "react-router-dom";
import "./BetaBuilder.css";
import { LimbContext } from "../../providers/LimbProvider";
import { Modal, Button } from "reactstrap";
import { LimbSelect } from "../limb/LimbSelect";

export const BetaBuilder = () => {
  const { id } = useParams();
  const parsedId = parseInt(id);

  const { currentClimb, getClimbById } = useContext(ClimbContext);
  const { limbs, getAllLimbs } = useContext(LimbContext);
  const [limb, setLimb] = useState();
  const [sequenceNum, setSequenceNum] = useState(0);

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
    rcoord: r,
  };

  return (
    <>
      <Modal isOpen={limbModal}>
        <LimbSelect
          limbs={limbs}
          setLimb={setLimb}
          toggleLimbModal={toggleLimbModal}
        />
      </Modal>
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
      <Button onClick={(e) => console.log(newMove)}>Upload Beta</Button>
    </>
  );
};
