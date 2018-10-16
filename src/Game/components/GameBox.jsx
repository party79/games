import React from "react";
import PropTypes from "prop-types";
import History from "./History.jsx";
import Status from "./Status.jsx";

const GameBox = ({ children, remHistory }) => (
  <div className="game">
    <div className="game-board">{children}</div>
    <div className="game-info">
      <Status />
      <History remHistory={remHistory} />
    </div>
  </div>
);

GameBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  remHistory: PropTypes.func.isRequired
};

export default GameBox;
