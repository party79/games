import React from "react";
import PropTypes from "prop-types";

const Row = ({ children }) => <div className="board-row">{children}</div>;

Row.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
};

export default Row;
