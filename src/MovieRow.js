import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LocationContext } from "./Contexts/LocationContext";

const MovieRow = (props) => {
  const history = useHistory();

  const { setLocation } = useContext(LocationContext);
  const showMovie = () => {
    history.push(`/movie?${props.name}`);
  };

  let castString = "";
  props.cast.forEach((cast) => {
    castString = cast + ", " + castString;
  });

  return (
    <tr>
      <td>{props.name}</td>
      <td>{castString}</td>
      <td>{props.lang}</td>
      <td>{props.genre}</td>
      <td>
        <select onChange={(e) => setLocation(e.target.value)}>
          {props.locations.map((loc) => (
            <option>{loc}</option>
          ))}
        </select>
      </td>
      <td>
        <button onClick={showMovie}>View Details</button>
        <button onClick={() => props.handleEdit(props)}>Edit Details</button>
      </td>
    </tr>
  );
};

export default MovieRow;
