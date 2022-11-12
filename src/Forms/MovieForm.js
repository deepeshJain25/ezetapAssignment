import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import TheatreForm from "./TheatreForm";
import "../style/movie-form.scss";

const MovieForm = (props) => {
  console.log("props !!", props);
  const {
    movieData: {
      genre = "",
      name = "",
      language = "",
      cast = "",
      theatres = {},
      location: movieLocations = [],
    } = {},
  } = props;
  console.log("Movie Data --", props);
  const locationRef = useRef("");
  const selectedTheathreDetails = useRef({});

  // const movieDataRef = useRef({});

  const [movieData, setMovieData] = useState({});
  const [locations, setLocations] = useState(movieLocations);
  const [selectedTheatres, setSelectedTheatres] = useState(theatres);

  const [showTheatreModal, setShowTheatreModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});

  console.log('!@#$%^&*');

  useEffect(() => {
    setMovieData((prev) => {
      return { ...prev, locations: locations };
    });
  }, [locations]);

  useEffect(() => {
    setSelectedTheatres(theatres);
  }, [theatres]);

  useEffect(() => {
    setMovieData(props.movieData);
  }, [props.movieData])

  const handleClose = () => setShowTheatreModal(false);

  const closeModal = () => {
    props.setShow(false);
  };

  const handleShow = (loc) => {
    selectedTheathreDetails.current = loc;
    setShowTheatreModal(true);
  };

  const handleLocations = () => {
    setLocations((prev) => {
      console.log(prev);
      const newLocationObject = {
        id: prev.length + 100,
        name: locationRef.current,
      };
      const newLocs = [...prev, newLocationObject];
      return newLocs;
    });
  };

  const clearLocation = (loc) => {
    setLocations((prev) => prev.filter((addedLoc) => !(addedLoc === loc)));
  };

  const handleTheatres = (updatedTheathreDetail) => {
    console.log('Final #######', updatedTheathreDetail);
  };

  const onLocationSelect = (locationDetail) => {
    console.log("Inside onlocationselect", locationDetail);
    setSelectedLocation(locationDetail);
  };

  const getLocationClass = (id) => {
    return id === selectedLocation.id
      ? "location-name location-name-selected"
      : "location-name";
  };

  return (
    <div>
      <Modal show={props.show} onHide={closeModal} backdrop="static" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name of Movie</Form.Label>
              <Form.Control
                defaultValue={name || ""}
                onChange={(e) => {
                  setMovieData((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
                value={movieData.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Language</Form.Label>
              <Form.Control
                defaultValue={language || ""}
                onChange={(e) => {
                  setMovieData((prev) => {
                    return { ...prev, language: e.target.value };
                  });
                }}
                value={movieData.language}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cast (Add names separated by Commas)</Form.Label>
              <Form.Control
                defaultValue={cast || ""}
                onChange={(e) => {
                  setMovieData((prev) => {
                    return { ...prev, cast: e.target.value };
                  });
                }}
                value={movieData.cast}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                defaultValue={genre || "1"}
                onChange={(e) => {
                  setMovieData((prev) => {
                    return { ...prev, genre: e.target.value };
                  });
                }}
              >
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            Locations: <br />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div style={{ display: "flex" }}>
                <Form.Select
                  onChange={(e) => {
                    locationRef.current = e.target.value;
                    console.log("Selected Location", e.target.value);
                  }}
                >
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Chennai">Chennai</option>
                </Form.Select>
              </div>
            </Form.Group>
            <Button
              className="add-locations"
              onClick={handleLocations}
              variant="secondary"
            >
              Add Location
            </Button>
            <br />
            <br />
            {console.log("Locations ------>", locations)}
            {movieLocations.map((loc) => (
              <div
                onClick={() => onLocationSelect(loc)}
                className={getLocationClass(loc.id)}
              >
                {loc.name}
              </div>
            ))}
            <br />
            <h6>Theathre Details:</h6>
            <br />
            {console.log("theatres=======> ", selectedTheatres)}
            {!selectedTheatres[selectedLocation.id] && (
              <p>Please select the locations to see the details</p>
            )}
            {selectedTheatres[selectedLocation.id] &&
              selectedTheatres[selectedLocation.id].map((theatreDetail) => {
                return (
                  <div style={{ display: "flex" }}>
                    <p style={{ marginRight: "10px" }}>{theatreDetail.name}</p>
                    <Button
                      style={{ marginRight: "10px" }}
                      size="sm"
                      onClick={() => handleShow(theatreDetail)}
                      variant="secondary"
                    >
                      Edit Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => clearLocation(theatreDetail)}
                      variant="secondary"
                    >
                      Clear Location
                    </Button>
                  </div>
                );
              })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              console.log('########', movieData);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <TheatreForm
        showTheatreModal={showTheatreModal}
        handleClose={handleClose}
        location={selectedLocation}
        theatresDetails={selectedTheathreDetails.current}
        handleTheatres={handleTheatres}
      />
    </div>
  );
};

export default MovieForm;
