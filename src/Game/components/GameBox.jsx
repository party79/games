import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import History from "./History.jsx";
import Status from "./Status.jsx";
import {
  GameShape,
  HistoryItems,
  SquaresItem,
  WinningItems
} from "../../constants/constants";

const GameBox = ({
  children,
  game,
  history,
  squares,
  winning,
  stepNumber,
  jumpTo
}) => (
  <div className="game">
    <div className="game-board">{children}</div>
    <div className="game-info">
      <Status
        squares={squares}
        winning={winning}
        game={game}
        stepNumber={stepNumber}
      />
      <History history={history} jumpTo={jumpTo} />
    </div>
  </div>
);

GameBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  game: GameShape.isRequired,
  history: HistoryItems.isRequired,
  squares: SquaresItem.isRequired,
  winning: WinningItems.isRequired,
  stepNumber: PropTypes.number.isRequired,
  jumpTo: PropTypes.func.isRequired
};

export default GameBox;
