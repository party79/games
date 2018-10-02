import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { GameShape } from "../constants/constants";
import { GetStatus } from "../../helpers/tools";

const GameBox = ({
  children,
  game,
  history,
  squares,
  winning,
  stepNumber,
  jumpTo
}) => {
  const [winner, draw, checkmate, checks] = GetStatus(squares, winning, game);

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = <div>Winner: {winner}</div>;
  } else if (draw) {
    status = "Draw";
  } else if (checkmate) {
    status = <div>Checkmate: {checkmate}</div>;
  } else {
    const player = stepNumber % 2 === 0 ? game.player1 : game.player2;
    status = (
      <div>
        Player: {player}
        {checks.map((check, index) => <div key={index}>Check: {check}</div>)}
      </div>
    );
  }

  return (
    <div className="game">
      <div className="game-board">{children}</div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

GameBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  game: GameShape.isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      squares: PropTypes.arrayOf(PropTypes.number).isRequired
    })
  ).isRequired,
  squares: PropTypes.array.isRequired,
  winning: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired,
  stepNumber: PropTypes.number.isRequired,
  jumpTo: PropTypes.func.isRequired
};

export default GameBox;
