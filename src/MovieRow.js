import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { LocationContext } from "./Contexts/LocationContext";
import { Input } from "reactstrap";

const MovieRow = ({movieDetail, handleEdit}) => {
  const history = useHistory();
  console.log('Movie Detail', movieDetail);
  const {name = '', cast = [], genre = '', language = '', locations = []} = movieDetail
  const { setLocation } = useContext(LocationContext);
  const showMovie = () => {
    history.push(`/movie?${ name}`);
  };

  let castString = "";
   cast.forEach((cast) => {
    castString = cast + ", " + castString;
  });

  return (
    <tr>
      <td>{name}</td>
      <td>{castString}</td>
      <td>{language}</td>
      <td>{genre}</td>
      <td>
        <Input type="select" onChange={(e) => setLocation(e.target.value)}>
          { locations.map((loc) => (
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
