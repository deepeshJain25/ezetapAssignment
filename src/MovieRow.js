import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { LocationContext } from "./Contexts/LocationContext";
import { Input } from "reactstrap";

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
        <Input type="select" onChange={(e) => setLocation(e.target.value)}>
          {props.locations.map((loc) => (
            <option>{loc}</option>
          ))}
        </Input>
      </td>
      <td>
        <Button
          onClick={showMovie}
          style={{ marginRight: "12px", padding: "10px 22px" }}
        >
          View Details
        </Button>
        <Button
          onClick={() => props.handleEdit(props.name)}
          variant="info"
          style={{ marginRight: "12px", padding: "10px 22px" }}
        >
          Edit Details
        </Button>
      </td>
    </tr>
  );
};

export default MovieRow;
