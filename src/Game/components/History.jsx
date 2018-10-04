import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { HistoryItems } from "../../constants/constants";

const History = ({ history, jumpTo }) => (
  <ol>
    {history.map((step, move) => (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {move ? "Go to move #" + move : "Go to game start"}
        </button>
      </li>
    ))}
  </ol>
);

History.propTypes = {
  history: HistoryItems.isRequired,
  jumpTo: PropTypes.func.isRequired
};

export default History;
