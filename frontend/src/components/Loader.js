import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      className="my-3"
      style={{
        width: "80px",
        height: "80px",
        margin: "auto",
        display: "block",
      }}
    />
  );
};

export default Loader;
