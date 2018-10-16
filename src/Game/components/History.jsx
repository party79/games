import React from "react";
import PropTypes from "prop-types";
import { GameBoardContext, PropHistoryItems } from "../../constants/constants";

const History = ({ remHistory }) => (
  <GameBoardContext.Consumer>
    {board => (
      <ol>
        {board.history.map((step, move) => (
          <li key={move}>
            <button onClick={() => remHistory(move)}>
              {move ? "Go to move #" + move : "Go to game start"}
            </button>
          </li>
        ))}
      </ol>
    )}
  </GameBoardContext.Consumer>
);

History.propTypes = {
  remHistory: PropTypes.func.isRequired
};

export default History;
