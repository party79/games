import React from "react";
import PropTypes from "prop-types";
import gameItem from "../helpers/gameItem";

export const PropSquaresItem = PropTypes.arrayOf(PropTypes.number).isRequired;

export const PropHistoryItems = PropTypes.arrayOf(PropSquaresItem);

export const PropWinningItems = PropTypes.arrayOf(
  PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
).isRequired;

export const PropBoardItems = PropTypes.arrayOf(
  PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
).isRequired;

export const GameTicTacToe = new gameItem({
  type: "Tic Tac Toe",
  gridX: 3,
  gridY: 3,
  winL: 3,
  winH: true,
  winV: true,
  winD: true,
  gravity: false,
  player1: "❌",
  player2: "⭕️"
});
export const GameConnect4 = new gameItem({
  type: "Connect 4",
  gridX: 6,
  gridY: 10,
  winL: 4,
  winH: true,
  winV: true,
  winD: true,
  gravity: true,
  player1: "🔴",
  player2: "🔵"
});
export const GameList = [GameTicTacToe, GameConnect4];

export const PropGameItem = PropTypes.instanceOf(gameItem);

export const GameListContext = React.createContext(GameList);
GameListContext.propTypes = {
  value: PropTypes.arrayOf(PropGameItem.isRequired).isRequired
};

export const PropGameBoard = PropTypes.shape({
  game: PropGameItem.isRequired,
  history: PropHistoryItems.isRequired,
  stepNumber: PropTypes.number.isRequired,
  board: PropBoardItems,
  winning: PropWinningItems
});

export const GameBoardContext = React.createContext({});
GameBoardContext.propTypes = {
  value: PropGameBoard.isRequired
};
