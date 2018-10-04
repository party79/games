import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  GameShape,
  SquaresItem,
  WinningItems
} from "../../constants/constants";
import { GetStatus } from "../../helpers/tools";

const Status = ({ squares, winning, game, stepNumber }) => {
  const [winner, draw, checkmate, checks] = GetStatus(squares, winning, game);

  if (winner) {
    return <React.Fragment>Winner: {winner}</React.Fragment>;
  } else if (draw) {
    return <React.Fragment>Draw</React.Fragment>;
  } else if (checkmate) {
    return <React.Fragment>Checkmate: {checkmate}</React.Fragment>;
  }
  const player = stepNumber % 2 === 0 ? game.player1 : game.player2;
  return (
    <React.Fragment>
      Player: {player}
      {checks.map((check, index) => <div key={index}>Check: {check}</div>)}
    </React.Fragment>
  );
};

Status.propTypes = {
  squares: SquaresItem.isRequired,
  winning: WinningItems.isRequired,
  game: GameShape.isRequired,
  stepNumber: PropTypes.number.isRequired
};

export default Status;
