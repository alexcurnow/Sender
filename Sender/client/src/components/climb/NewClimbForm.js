import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ClimbContext } from "../../providers/ClimbProvider";
import { GradeContext } from "../../providers/GradeProvider";
import { StateContext } from "../../providers/StateProvider";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";

export const NewClimbForm = () => {
  const history = useHistory();
  const { addClimb } = useContext(ClimbContext);
  const { grades, getAllGrades } = useContext(GradeContext);
  const { states, getAllStates } = useContext(StateContext);

  useEffect(() => {
    getAllGrades();
    getAllStates();
  }, []);

  const [loading, setLoading] = useState(false);

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const [grade, setGrade] = useState();
  const [color, setColor] = useState();
  const [image, setImage] = useState();
  const [gym, setGym] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [notes, setNotes] = useState();

  const newClimb = {
    userProfileId: userProfile.id,
    gradeId: parseInt(grade),
    color: color,
    imageUrl: image,
    gym: gym,
    city: city,
    stateId: parseInt(state),
    notes: notes,
  };

  const submitForm = (e) => {
    e.preventDefault();
    addClimb(newClimb)
      .then(() => history.push("/"))
      .catch((err) => alert(`An error occured: ${err.message}`));
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sender");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/alexcurnow/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="grade">Grade</Label>
        <Input
          type="select"
          name="grade"
          id="gradeSelect"
          onChange={(e) => setGrade(e.target.value)}
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
          onChange={(e) => setColor(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="image">Upload Image</Label>
        <Input type="file" name="file" id="image" onChange={uploadImage} />
      </FormGroup>
      <FormGroup>
        <Label for="gym">Gym Name</Label>
        <Input
          type="text"
          name="gym"
          id="gym"
          onChange={(e) => setGym(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input
          type="text"
          name="city"
          id="city"
          onChange={(e) => setCity(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="state">State</Label>
        <Input
          type="select"
          name="state"
          id="stateSelect"
          onChange={(e) => setState(e.target.value)}
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
          onChange={(e) => setNotes(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        {loading ? <Spinner /> : <Button>Save New Climb</Button>}
      </FormGroup>
    </Form>
  );
};
