import React from "react";
import { GameBoardContext } from "../../constants/constants";

const status = board => {
  const game = board.game;
  const [winner, draw, checkmate, checks] = board.status;

  if (winner) {
    return <React.Fragment>Winner: {winner}</React.Fragment>;
  } else if (draw) {
    return <React.Fragment>Draw</React.Fragment>;
  } else if (checkmate) {
    return <React.Fragment>Checkmate: {checkmate}</React.Fragment>;
  }
  return (
    <React.Fragment>
      Player: {board.current}
      {checks.map((check, index) => <div key={index}>Check: {check}</div>)}
    </React.Fragment>
  );
};

const Status = () => (
  <GameBoardContext.Consumer>{status}</GameBoardContext.Consumer>
);

export default Status;
