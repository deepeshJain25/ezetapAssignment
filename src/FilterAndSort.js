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
    <div className="filter-section">
      <div className="filter-by">
        <h4 className="txt">Filter By</h4>
        <div className="filter-select">
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
      </div>
      <div className="sort-by">
        <h4 className="text">Sort By</h4>
        <DropDown
          handleChange={handleChange}
          type="Sort"
          data={["Language", "Name"]}
          reference={sortRef}
        />
      </div>
      <div className="filter-button">
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
          variant="primary"
          className="apply-btn"
        >
          Apply Filters
        </Button>
        <Button
          onClick={() => {
            clear();
          }}
          variant="success"
          className="clear-btn"
        >
          Clear Filters
        </Button>
      </div>
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
