import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { LocationContext } from "./Contexts/LocationContext";
import { Input } from "reactstrap";

const MovieRow = ({ movieDetail, handleEdit }) => {
  const history = useHistory();
  const {
    name = "",
    cast = [],
    genre = "",
    language = "",
    locations = [],
  } = movieDetail;
  const [showButton, setShowButton] = useState(false);
  const [rowLocation, setRowLocation] = useState("");

  const { setLocation } = useContext(LocationContext);

  const showMovie = () => {
    history.push(`/movie?${name}`);
  };

  let castString = "";
  cast.forEach((cast) => {
    castString = cast + ", " + castString;
  });

  useEffect(() => {
    if (rowLocation !== "") {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
    setLocation(rowLocation);
  }, [rowLocation]);

  return (
    <tr>
      <td>{name}</td>
      <td>{castString}</td>
      <td>{language}</td>
      <td>{genre}</td>
      <td>
        <Input
          type="select"
          onChange={(e) => {
            setRowLocation(e.target.value);
          }}
        >
          <option value={""}>Select a Location</option>
          {locations.map((loc) => (
            <option value={loc}>{loc}</option>
          ))}
        </Input>
      </td>
      <td>
        <Button
          onClick={showMovie}
          style={{ marginRight: "12px", padding: "10px 22px" }}
          disabled={!showButton}
        >
          View Details
        </Button>
        <Button
          onClick={() => handleEdit(name)}
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
