import React, { useCallback, useContext } from "react";
import { data } from "./Data";
import { useHistory } from "react-router-dom";
import TheatreListing from "./TheatreListing";
import { LocationContext } from "./Contexts/LocationContext";
import { Container, Button } from "react-bootstrap";

const MovieListing = () => {
  const history = useHistory();
  const { location } = useContext(LocationContext);
  const movieName = history.location.search.slice(1);
  const theatreData = data.find((listing) => listing.name === movieName)
    .theatres[location];

  return (
    <Container>
      <div className="movie-info">
        <h2>
          Name of movie: {movieName} at {location}
        </h2>
        {theatreData &&
          theatreData.map((data) => {
            return <TheatreListing data={data} />;
          })}
      </div>
      <Button variant="secondary" onClick={() => history.goBack()}>
        Go Back
      </Button>
    </Container>
  );
};

export default MovieListing;
