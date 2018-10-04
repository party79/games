import PropTypes from "prop-types";

export const GameShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  gridX: PropTypes.number.isRequired,
  gridY: PropTypes.number.isRequired,
  winL: PropTypes.number.isRequired,
  winH: PropTypes.bool.isRequired,
  winV: PropTypes.bool.isRequired,
  winD: PropTypes.bool.isRequired,
  gravity: PropTypes.bool.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired
});

export const HistoryItem = PropTypes.shape({
  squares: PropTypes.arrayOf(PropTypes.number).isRequired
});

export const HistoryItems = PropTypes.arrayOf(HistoryItem);

export const SquaresItem = PropTypes.arrayOf(PropTypes.number).isRequired;

export const WinningItems = PropTypes.arrayOf(
  PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
).isRequired;

export const GameList = [
  {
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
  },
  {
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
  }
];
