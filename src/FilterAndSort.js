import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import DropDown from "./DropDown";

const FilterAndSort = (props) => {
  const langRef = useRef(null);
  const genreRef = useRef(null);
  const locRef = useRef(null);
  const sortRef = useRef(null);

  const handleChange = (e, ref) => {
    ref.current = e.target.value;
  };

  const handleApply = (loc, lang, genre, sort) => {
    props.handleFilters({ lang, loc, genre, sort });
  };

  const clear = () => {
    props.handleFilters({
      lang: "",
      loc: "",
      genre: "",
      sort: "",
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "20px" }}>
        <h4>Filter By</h4>
        <DropDown
          handleChange={handleChange}
          type="Location"
          data={props.locs}
          reference={locRef}
        />
        <DropDown
          handleChange={handleChange}
          type="Genre"
          data={props.genres}
          reference={genreRef}
        />
        <DropDown
          handleChange={handleChange}
          type="Language"
          data={props.langs}
          reference={langRef}
        />
      </div>
      <div style={{ margin: "20px" }}>
        <h4>Sort By</h4>
        <DropDown
          handleChange={handleChange}
          type="Sort"
          data={["Language", "Name"]}
          reference={sortRef}
        />
      </div>
      <Button
        onClick={() => {
          console.log(locRef, langRef, genreRef, sortRef);
          handleApply(
            locRef.current,
            langRef.current,
            genreRef.current,
            sortRef.current
          );
        }}
        style={{ marginLeft: "20px", height: "50px" }}
        variant="primary"
      >
        Apply Filters
      </Button>
      <Button
        onClick={() => {
          clear();
        }}
        variant="primary"
        style={{ marginLeft: "20px", height: "50px" }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterAndSort;

{
  /* <select
          onChange={(e) => {
            locRef.current = e.target.value;
          }}
        >
          <option>Select a Location</option>
          {props.locs.map((location) => (
            <option>{location}</option>
          ))}
        </select> */
}
{
  /* <select
          onChange={(e) => {
            genreRef.current = e.target.value;
          }}
        >
          <option>Select a Genre</option>
          {props.genres.map((genre) => (
            <option>{genre}</option>
          ))}
        </select>
        <select
          onChange={(e) => {
            langRef.current = e.target.value;
          }}
        >
          <option>Select a Language</option>
          {props.langs.map((lang) => (
            <option>{lang}</option>
          ))}
        </select> */
}
