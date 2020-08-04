import React, { useContext, useEffect, useState } from "react";
import { Climb } from "./Climb";
import debounce from "lodash.debounce";
import { ClimbContext } from "../../providers/ClimbProvider";
import "./Climb.css";

export const ClimbList = (props) => {
  const { climbs, searchClimbs, getAllClimbs } = useContext(ClimbContext);
  const [terms, setTerms] = useState(null);

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const debouncedSearchClimbs = debounce(searchClimbs, 500);

  const filteredClimbs = climbs.filter(
    (c) => c.userProfileId !== userProfile.id
  );

  const handleChange = (e) => {
    debouncedSearchClimbs(e.target.value);
  };

  useEffect(() => {
    if (!terms) {
      getAllClimbs();
    } else {
      searchClimbs(terms);
    }
  }, [terms]);

  return (
    <>
      <fieldset className="searchbar">
        <div className="form-group">
          <label htmlFor="searchTerms">Search Climbs</label>
          <input
            onChange={handleChange}
            type="text"
            id="searchTerms"
            required
            autoFocus
            className="form-control"
          />
        </div>
      </fieldset>

      <div className="climbList">
        {" "}
        {filteredClimbs.map((c) => {
          return (
            <div key={`climbCard${c.id}`} className="climbCard">
              <Climb key={c.id} climb={c} />
            </div>
          );
        })}
      </div>
    </>
  );
};
