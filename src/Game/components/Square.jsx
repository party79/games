import React from "react";
import PropTypes from "prop-types";
import { GameBoardContext } from "../../constants/constants";

const button = (board, grid, square, addHistory) => (
  <button
    className="square"
    disabled={board.amDisabled(grid)}
    onClick={addHistory}
  >
    {board.player(square)}
  </button>
);

const Square = ({ grid, square, addHistory }) => (
  <GameBoardContext.Consumer>
    {board => button(board, grid, square, addHistory)}
  </GameBoardContext.Consumer>
);

Square.propTypes = {
  grid: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  square: PropTypes.number.isRequired,
  addHistory: PropTypes.func.isRequired
};

export default Square;
