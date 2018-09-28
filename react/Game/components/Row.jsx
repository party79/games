import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

const Row = ({children}) => {
  return <div className="board-row">{children}</div>;
};

Row.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.element.isRequired
  ).isRequired
};

export default Row;

