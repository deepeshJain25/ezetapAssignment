import React from "react";

const TheatreListing = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <p>
        <b>
          {props.data.name}
          {", "}
          {props.data.location}
        </b>
      </p>
      <p>
        {props.data.price}
        {"Rs."}
      </p>
      {props.data.shows.map((showTiming) => {
        return (
          <div
            style={{
              height: "50px",
              width: "100px",
              border: "solid 2px",
              margin: "10px",
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
