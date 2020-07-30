import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export const LimbSelect = ({
  limbs,
  setLimb,
  toggleLimbModal,
  setMovesList,
  newMove,
  movesList,
}) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setMovesList((movesList) => [...movesList, newMove]);
        toggleLimbModal();
      }}
    >
      <FormGroup>
        <Label for="limbs">Limbs</Label>
        <Input
          type="select"
          name="limbs"
          id="limbSelect"
          onChange={(e) => {
            setLimb(e.target.value);
          }}
        >
          <option key="limb-0" value="0">
            Select a limb
          </option>
          {limbs.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};
