import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import TheatreForm from "./TheatreForm";

const MovieForm = (props) => {
  const locationRef = useRef("");
  const theatreLocRef = useRef("");

  const movieDataRef = useRef({
    // name: props.movieData.name || "",
    // cast: props.movieData.cast || "",
    // language: props.movieData.language || "",
    // genre: props.movieData.genre || "",
    // locations: props.movieData.locations || [],
  });

  const [movieData, setMovieData] = useState({
    // name: props.movieData.name || "",
    // cast: props.movieData.cast || "",
    // language: props.movieData.language || "",
    // genre: props.movieData.genre || "",
    // locations: props.movieData.locations || [],
  });
  const [locations, setLocations] = useState([]);
  const [showTheatreModal, setShowTheatreModal] = useState(false);

  // useEffect(() => {
  //   console.log(props.populateData);
  //   if (props.populateData) {
  //     setMovieData({
  //       name: props.movieData.name,
  //       cast: props.movieData.cast,
  //       language: props.movieData.language,
  //       genre: props.movieData.genre,
  //       locations: props.movieData.locations,
  //     });
  //   }
  // }, []);
  useEffect(() => {
    setMovieData((prev) => {
      return { ...prev, locations: locations };
    });
  }, [locations]);

  const handleClose = () => setShowTheatreModal(false);

  // console.log(props.movieData);

  const closeModal = () => {
    props.setShow(false);
    setLocations([]);
  };

  const handleShow = (loc) => {
    theatreLocRef.current = loc;
    setShowTheatreModal(true);
  };

  const handleLocations = () => {
    setLocations((prev) => {
      const addedLocs = [...prev, locationRef.current];
      movieDataRef.current.locations = addedLocs;
      return addedLocs;
    });
  };

  const clearLocation = (loc) => {
    setLocations((prev) => prev.filter((addedLoc) => !(addedLoc === loc)));
  };

  const handleTheatres = (data, location) => {
    if (Array.isArray(movieData.theatres[location])) {
      movieData.theatres[location].push(data);
    } else {
      movieData.theatres[location] = [];
      movieData.theatres[location].push(data);
    }
    console.log(movieData);
  };

  return (
    <div>
      <Modal show={props.show} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name of Movie</Form.Label>
              <Form.Control
                onChange={(e) => {
                  // movieDataRef.current.name = e.target.value;
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
                onChange={(e) => {
                  // movieDataRef.current.genre = e.target.value;
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Locations</Form.Label>
              <div style={{ display: "flex" }}>
                <Form.Select
                  onChange={(e) => {
                    locationRef.current = e.target.value;
                  }}
                >
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Button onClick={handleLocations} variant="secondary">
                  Add
                </Button>
              </div>
              {locations.map((loc) => {
                return (
                  <div style={{ display: "flex" }}>
                    <p>{loc}</p>
                    <Button
                      size="sm"
                      onClick={() => handleShow(loc)}
                      variant="secondary"
                    >
                      Add Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => clearLocation(loc)}
                      variant="secondary"
                    >
                      Clear Location
                    </Button>
                  </div>
                );
              })}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              console.log(movieData);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <TheatreForm
        showTheatreModal={showTheatreModal}
        handleClose={handleClose}
        location={theatreLocRef.current}
        handleTheatres={handleTheatres}
      />
    </div>
  );
};

export default MovieForm;
