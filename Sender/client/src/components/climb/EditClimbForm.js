import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ClimbContext } from "../../providers/ClimbProvider";
import { GradeContext } from "../../providers/GradeProvider";
import { StateContext } from "../../providers/StateProvider";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";

export const EditClimbForm = (props) => {
  // const history = useHistory();

  const { updateClimb } = useContext(ClimbContext);
  const { grades, getAllGrades } = useContext(GradeContext);
  const { states, getAllStates } = useContext(StateContext);

  const [updatedClimb, setClimb] = useState(props.climb);

  const handleControlledInputChange = (event) => {
    const newClimb = Object.assign({}, updatedClimb);
    newClimb[event.target.name] = event.target.value;
    setClimb(newClimb);
  };

  useEffect(() => {
    getAllGrades();
    getAllStates();
  }, []);

  const editClimb = () => {
    updateClimb(updatedClimb, props.userId).then(props.toggleEdit);
    // .then(history.push("/userclimbs"));
  };

  return (
    <>
      <Form>
        <h1>Edit this climb</h1>
        <FormGroup>
          <Label for="grade">Grade</Label>
          <Input
            type="select"
            name="grade"
            id="gradeSelect"
            defaultValue={props.climb.gradeId}
            onChange={handleControlledInputChange}
          >
            {grades.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="color">Color of Route</Label>
          <Input
            type="text"
            name="color"
            id="color"
            defaultValue={props.climb.color}
            onChange={handleControlledInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="gym">Gym Name</Label>
          <Input
            type="text"
            name="gym"
            id="gym"
            defaultValue={props.climb.gym}
            onChange={handleControlledInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input
            type="text"
            name="city"
            id="city"
            defaultValue={props.climb.city}
            onChange={handleControlledInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="state">State</Label>
          <Input
            type="select"
            name="state"
            id="stateSelect"
            defaultValue={props.climb.stateId}
            onChange={handleControlledInputChange}
          >
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="notes">Notes and Hints</Label>
          <Input
            type="textarea"
            name="notes"
            id="notes"
            defaultValue={props.climb.notes}
            onChange={handleControlledInputChange}
          />
        </FormGroup>
        <Button
          onClick={(e) => {
            e.preventDefault();
            editClimb();
          }}
        >
          Save Climb
        </Button>
      </Form>
    </>
  );
};
