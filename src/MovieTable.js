import React, { useContext, useEffect, useState, useRef } from "react";
import { data } from "./Data";
import MovieRow from "./MovieRow";
import Filters from "./FilterAndSort";
import MovieForm from "./Forms/MovieForm";
import { Table, Button } from "react-bootstrap";
import { LocationContext } from "./Contexts/LocationContext";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { MovieDataContext } from "./Contexts/MovieDataContext";

const MovieTable = () => {
  const [filters, setFilters] = useState({
    lang: "",
    loc: "",
    genre: "",
    sort: "",
  });

  const [tableData, setTableData] = useState([]);

  const [allData, setAllData] = useState([]);

  const [movieDetails, setMovieDetails] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [isAddMode, setIsAddMode] = useState(false);

  const formToShow = useRef("");

  const { setLocation } = useContext(LocationContext);
  const { allAPIData, setAllAPIData } = useContext(MovieDataContext);

  useEffect(() => {
    setLocation("");
    fetchData();
  }, []);

  useEffect(() => {
    console.log("all data", allAPIData);
  }, [allAPIData]);

  useEffect(() => {
    const modifiedData = allData.filter((movieData) => {
      const isLang = !filters.lang || movieData.language === filters.lang;
      const isLoc =
        !filters.loc ||
        movieData.location.findIndex(
          (dataLoc) => dataLoc.name === filters.loc
        ) !== -1;
      const isGenre = !filters.genre || movieData.genre === filters.genre;
      console.log("is loc", isLoc);
      return isLang && isLoc && isGenre;
    });
    if (filters.sort === "Language") {
      modifiedData.sort((a, b) => {
        const langA = a.language.toUpperCase();
        const langB = b.language.toUpperCase();
        if (langA < langB) {
          return -1;
        }
        if (langA > langB) {
          return 1;
        }
        return 0;
      });
    } else if (filters.sort === "Name") {
      modifiedData.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    setTableData(modifiedData);
  }, [filters]);

  // const handleClose = () => setShowModal(false);
  const handleAddMovie = () => {
    formToShow.current = "add";
    setIsAddMode(true);
    setShowModal(true);
  };

  const handleEdit = (movieName) => {
    const rowData = tableData.find((movie) => {
      return movie.name === movieName;
    });
    formToShow.current = "edit";
    setMovieDetails(rowData);
    setShowModal(true);
  };

  const fetchData = () => {
    axios.get("http://localhost:4000/allMovies").then((res) => {
      setTableData(res.data);
      setAllData(res.data);
      setAllAPIData(res.data);
    });
  };

  return (
    <div className="movie-wrapper">
      <Container>
        <Row>
          <Col md={12} lg={12} xl={12}>
            <h1 className="title">The Movie Website</h1>
          </Col>
        </Row>
        <Filters
          locs={extractAllLocs(allData)}
          genres={extractAllData(allData, "genre")}
          langs={extractAllData(allData, "language")}
          handleFilters={setFilters}
        />
        <Table bordered hover className="movie-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cast</th>
              <th>Language</th>
              <th>Genre</th>
              <th>Locations</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((movie) => (
              <MovieRow movieDetail={movie} handleEdit={handleEdit} />
            ))}
          </tbody>
        </Table>
        <Button onClick={() => handleAddMovie()}>Add Movie</Button>
        <MovieForm
          show={showModal}
          setShow={setShowModal}
          // movieData={formToShow.current === "add" ? {} : movieDetails}
          movieData={movieDetails}
          fetchData={fetchData}
          addMode={isAddMode}
          setAddMode={setIsAddMode}
        />
      </Container>
    </div>
  );
};

export default MovieTable;

const extractAllData = (data, param) => {
  const result = [];
  data.forEach((data) => {
    const array = data[param];
    if (Array.isArray(array)) {
      array.forEach((data) => {
        if (!result.includes(data)) {
          result.push(data);
        }
      });
    } else {
      if (!result.includes(array)) {
        result.push(array);
      }
    }
  });
  return result;
};

const extractAllLocs = (data) => {
  const result = [];
  data.forEach((data) => {
    data.location &&
      data.location.forEach((loc) => {
        if (!result.includes(loc.name)) {
          result.push(loc.name);
        }
      });
  });
  return result;
};
