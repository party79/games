import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Square = ({ disabled, player, player1, player2, onClick }) => {
  let value;
  if (player === 1) {
    value = player1;
  } else if (player === 2) {
    value = player2;
  }
  return (
    <button className="square" disabled={disabled} onClick={onClick}>
      {value}
    </button>
  );
};

Square.propTypes = {
  disabled: PropTypes.bool,
  player: PropTypes.number,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
Square.defaultProps = {
  disabled: false,
  player: 0
};

export default Square;
