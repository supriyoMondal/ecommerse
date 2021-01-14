import React from "react";
import PropTypes from "prop-types";

const getStarType = (val, comparTwo) => {
  return val >= comparTwo
    ? "fas fa-star"
    : val >= comparTwo - 0.5
    ? "fas fa-star-half-alt"
    : "far fa-star";
};

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i style={{ color }} className={getStarType(value, 1)} />
      </span>
      <span>
        <i style={{ color }} className={getStarType(value, 2)} />
      </span>
      <span>
        <i style={{ color }} className={getStarType(value, 3)} />
      </span>
      <span>
        <i style={{ color }} className={getStarType(value, 4)} />
      </span>
      <span>
        <i style={{ color }} className={getStarType(value, 5)} />
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  text: "",
  color: "#f8e825",
};

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
