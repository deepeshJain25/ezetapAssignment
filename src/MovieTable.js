import React, { useContext, useEffect, useState } from "react";
import { data } from "./Data";
import MovieRow from "./MovieRow";
import Filters from "./FilterAndSort";
import MovieForm from "./Forms/MovieForm";
import { Table, Button } from "react-bootstrap";
import { LocationContext } from "./Contexts/LocationContext";
import axios from "axios";

const MovieTable = () => {
  const [filters, setFilters] = useState({
    lang: "",
    loc: "",
    genre: "",
    sort: "",
  });

  const [tableData, setTableData] = useState(data);

  const [movieDetails, setMovieDetails] = useState({});

  const [showModal, setShowModal] = useState(false);

  const { setLocation } = useContext(LocationContext);

  useEffect(async () => {
    setLocation("");
  }, []);

  useEffect(() => {
    const modifiedData = data.filter((movieData) => {
      const isLang = !filters.lang || movieData.language === filters.lang;
      const isLoc = !filters.loc || movieData.locations.includes(filters.loc);
      const isGenre = !filters.genre || movieData.genre === filters.genre;

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

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleEdit = (data) => {
    setMovieDetails(data);
    setShowModal(true);
  };

  return (
    <div>
      <Filters
        locs={extractAllData(data, "locations")}
        genres={extractAllData(data, "genre")}
        langs={extractAllData(data, "language")}
        handleFilters={setFilters}
      />
      <Table bordered hover>
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
            <MovieRow
              name={movie.name}
              cast={movie.cast}
              lang={movie.language}
              genre={movie.genre}
              locations={movie.locations}
              handleEdit={handleEdit}
            />
          ))}
        </tbody>
      </Table>
      <Button onClick={() => handleShow()}>Add Movie</Button>
      <MovieForm
        show={showModal}
        setShow={setShowModal}
        movieData={movieDetails}
      />
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
        result.push(data);
      });
    } else {
      result.push(array);
    }
  });
  return result;
};

// await axios.get("http://localhost:4000/movies").then((res) => {
//   setTableData(res.data.data);
// });
