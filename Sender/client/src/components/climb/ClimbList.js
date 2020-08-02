import React, { useContext, useEffect, useState } from "react";
import { Climb } from "./Climb";
import debounce from "lodash.debounce";
import { ClimbContext } from "../../providers/ClimbProvider";
import "./Climb.css";

export const ClimbList = (props) => {
  const { climbs, searchClimbs, getAllClimbs } = useContext(ClimbContext);
  const [terms, setTerms] = useState(null);

  const debouncedSearchClimbs = debounce(searchClimbs, 500);

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
          <label htmlFor="searchTerms">Search:</label>
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
        {climbs.map((c) => (
          <div key={`climbCard${c.id}`} className="climbCard">
            <Climb key={c.id} climb={c} />
          </div>
        ))}
      </div>
    </>
  );
};

// import React, { useContext, useEffect } from "react";
// import { ClimbContext } from "../../providers/ClimbProvider";
// import { Climb } from "./Climb";
// import "./Climb.css";

// export const ClimbList = () => {
//   const { climbs, getAllClimbs } = useContext(ClimbContext);

//   useEffect(() => {
//     getAllClimbs();
//   }, []);

//   return (
//     <div className="climbList">
//       {climbs.map((c) => (
//         <div key={`climbCard${c.id}`} className="climbCard">
//           <Climb key={c.id} climb={c} />
//         </div>
//       ))}
//     </div>
//   );
// };
