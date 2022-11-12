import React from "react";

const TheatreListing = ({
  data: { name = "", location = "", price = "", shows = "" },
}) => {
  return (
    <div className="movie-flex">
      <p>
        <b>
          {name}
          {", "}
          {location}
        </b>
      </p>
      <p>
        {price}
        {"Rs."}
      </p>
      {shows.split(",").map((showTiming) => {
        return (
          <div
            style={{
              height: "50px",
              width: "100px",
              border: "solid 2px",
              margin: "10px",
              borderRadius: "10px",
            }}
          >
            <p>{showTiming}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TheatreListing;
