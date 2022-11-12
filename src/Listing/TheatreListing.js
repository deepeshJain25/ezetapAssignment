import React from "react";

const TheatreListing = ({
  data: { name = "", location = "", price = "", shows = "" },
  index,
}) => {
  return (
    <div className="movie-flex">
      <p>{index + 1}.</p>
      <p>
        {name}{" "}
        {location ? (
          <b>({location})</b>
        ) : (
          <b style={{ color: "red" }}>(No location added)</b>
        )}
      </p>
      {price !== "" ? (
        <p>
          {"Rs. "}
          {price}
        </p>
      ) : (
        <p style={{ color: "red" }}>No Price Added</p>
      )}
      {!shows ? (
        <p style={{ color: "red" }}>No Shows Added</p>
      ) : (
        shows.split(",").map((showTiming) => {
          return (
            <div
              style={{
                height: "50px",
                width: "100px",
                border: "solid 2px",
                margin: "10px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ color: "green" }}>{showTiming} hrs</p>
            </div>
          );
        })
      )}
      {}
    </div>
  );
};

export default TheatreListing;
