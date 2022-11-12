import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import TheatreForm from "./TheatreForm";
import "../style/movie-form.scss";
import axios from "axios";

const MovieForm = (props) => {
  const {
    movieData: {
      id: movieId = 0,
      genre = "",
      name = "",
      language = "",
      cast = "",
      theatres = {},
      location: movieLocations = [],
    } = {},
    fetchData,
    addMode,
    setAddMode,
  } = props;
  const locationRef = useRef("");
  // const theatreRef = useRef("");

  const selectedTheathreDetails = useRef({});

  // const movieDataRef = useRef({});
  const [movieData, setMovieData] = useState({});
  const [locations, setLocations] = useState([]);
  const [allTheatres, setAllTheatres] = useState(theatres);
  const [theatreInfo, setTheatreInfo] = useState("");
  const [showTheatreModal, setShowTheatreModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showAddLocationBtn, setShowAddLocationBtn] = useState(false);
  const [showAddTheatreBtn, setShowAddTheatreBtn] = useState(false);
  const [showAddTheatreInput, setShowAddTheatreInput] = useState(false);
  const [allGenres, setAllGenres] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showError, setShowError] = useState({});

  useEffect(() => {
    setMovieData(props.movieData);
    setAllTheatres(theatres);
    setLocations(movieLocations);
  }, [props]);

  useEffect(() => {
    axios.get("http://localhost:4000/allGenres").then((res) => {
      setAllGenres(res.data);
    });
    axios.get("http://localhost:4000/allLocations").then((res) => {
      setAllLocations(res.data);
    });
  }, []);

  const handleClose = () => setShowTheatreModal(false);

  const closeModal = () => {
    props.setShow(false);
    fetchData();
    setAddMode(false);
  };

  const handleShow = (loc) => {
    selectedTheathreDetails.current = loc;
    setShowTheatreModal(true);
  };

  const handleLocations = () => {
    console.log(locations);

    setLocations((prev) => {
      if (
        prev.findIndex((locData) => locData.name === locationRef.current) === -1 // checking if selectetd location is already present
      ) {
        const newLocationObject = {
          id: prev.length + 1,
          name: locationRef.current,
        };
        const newLocs = [...prev, newLocationObject];
        setMovieData((prev) => {
          return { ...prev, location: newLocs };
        });
        return newLocs;
      }
      return prev;
    });
  };

  const clearLocation = (loc) => {
    setLocations((prev) => prev.filter((addedLoc) => !(addedLoc === loc)));
  };

  const clearTheatre = (theatreData) => {
    const selectedLocationTheatres = allTheatres[selectedLocation.id];
    const newTheatreData = selectedLocationTheatres.filter(
      (th) => !(th.name === theatreData.name)
    );
    setAllTheatres((prev) => {
      prev[selectedLocation.id] = newTheatreData;
      setMovieData((prevData) => {
        prevData.theatres = prev;
        return prevData;
      });
      return { ...prev };
    });
  };

  const handleTheatres = (data, locationId) => {
    const indexOfTheatre = movieData.theatres[locationId].findIndex((th) => {
      return th.name === data.name;
    });
    setMovieData((prev) => {
      prev.theatres[locationId][indexOfTheatre] = data;
      return { ...prev };
    });
  };

  const addTheatres = (locationId, name) => {
    setAllTheatres((prev) => {
      const clone = { ...prev };
      const locationData = clone[locationId];
      const theatreObj = { name: name };
      if (!locationData) {
        const theatreArray = [];
        theatreArray.push(theatreObj);
        clone[locationId] = theatreArray;
      } else {
        locationData.push(theatreObj);
        clone[locationId] = locationData;
      }
      setMovieData((prev) => {
        prev.theatres = clone;
        return { ...prev };
      });
      return clone;
    });

    setTheatreInfo("");
    setShowAddTheatreBtn(false);
  };

  const onLocationSelect = (locationDetail) => {
    setSelectedLocation(locationDetail);
    setShowAddTheatreInput(true);
  };

  const getLocationClass = (id) => {
    return id === selectedLocation.id
      ? "location-name location-name-selected"
      : "location-name";
  };

  const updateDb = (data, id) => {
    axios
      .post(`http://localhost:4000/updateMovie/${id}`, data)
      .then((res) => {
        console.log(res);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          closeModal();
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
        setShowError({ show: true, message: e.message });
        setTimeout(() => {
          setShowError({ show: false });
        }, 5000);
      });
  };

  const addToDb = (data) => {
    axios
      .post(`http://localhost:4000/addMovie`, data)
      .then((res) => {
        console.log(res);
        // setShowSuccessMessage(true);
        // setTimeout(() => {
        //   setShowSuccessMessage(false);
        //   closeModal();
        // }, 3000);
      })
      .catch((e) => {
        console.log(e);
        // setShowError({ show: true, message: e.message });
        // setTimeout(() => {
        //   setShowError({ show: false });
        // }, 5000);
      });
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
                <option value="">Open this select menu</option>
                {allGenres.map((genre) => {
                  return <option value={genre}>{genre}</option>;
                })}
              </Form.Select>
            </Form.Group>
            Locations: <br />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div style={{ display: "flex" }}>
                <Form.Select
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (e.target.value.length !== 0) {
                      locationRef.current = e.target.value;
                      setShowAddLocationBtn(true);
                    } else {
                      setShowAddLocationBtn(false);
                    }
                  }}
                >
                  <option value="">Select a Location</option>
                  {allLocations.map((location) => {
                    return (
                      <option value={location.name}>{location.name}</option>
                    );
                  })}
                </Form.Select>
              </div>
            </Form.Group>
            <Button
              className="add-locations"
              onClick={handleLocations}
              variant="primary"
              disabled={!showAddLocationBtn}
            >
              Add Location
            </Button>
            <br />
            <br />
            {locations.map((loc) => (
              <div
                onClick={() => onLocationSelect(loc)}
                className={getLocationClass(loc.id)}
              >
                {loc.name}
              </div>
            ))}
            <br />
            <br />
            {showAddTheatreInput ? (
              <>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Add Theatres</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setTheatreInfo(e.target.value);
                      if (e.target.value.length !== 0) {
                        setShowAddTheatreBtn(true);
                      } else {
                        setShowAddTheatreBtn(false);
                      }
                    }}
                    value={theatreInfo}
                  />
                  <br />
                  <Button
                    className="add-locations"
                    onClick={() =>
                      addTheatres(selectedLocation.id, theatreInfo)
                    }
                    variant="primary"
                    disabled={!showAddTheatreBtn}
                  >
                    Add Theatre
                  </Button>
                </Form.Group>
              </>
            ) : null}
            <h5>Theatre Details:</h5>
            {!allTheatres[selectedLocation.id] && (
              <p>Please select the locations to see the details</p>
            )}
            {allTheatres[selectedLocation.id] &&
              allTheatres[selectedLocation.id].length === 0 && (
                <p style={{ color: "red" }}>No Theatres</p>
              )}
            {allTheatres[selectedLocation.id] &&
              allTheatres[selectedLocation.id].map((theatreDetail) => {
                return (
                  <div style={{ display: "flex" }}>
                    <p style={{ marginRight: "20px" }}>{theatreDetail.name}</p>
                    <Button
                      style={{ marginRight: "10px" }}
                      size="sm"
                      onClick={() => handleShow(theatreDetail)}
                      variant="primary"
                    >
                      Add Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => clearTheatre(theatreDetail)}
                      variant="primary"
                    >
                      Clear Theatre
                    </Button>
                  </div>
                );
              })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {showSuccessMessage ? (
            <p style={{ color: "green", marginRight: "50px" }}>
              Saved Successfully
            </p>
          ) : null}
          {showError.show ? (
            <p style={{ color: "red", marginRight: "50px" }}>
              {showError.message}, Please try again !
            </p>
          ) : null}
          <Button
            variant="primary"
            onClick={() => {
              console.log("########", movieData);
              if (addMode) {
                console.log("add");
                addToDb(movieData);
              } else {
                console.log("edit");
                updateDb(movieData, movieId);
              }
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
