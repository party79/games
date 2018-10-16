import React from "react";
import PropTypes from "prop-types";
import History from "./History.jsx";
import Status from "./Status.jsx";

const GameBox = ({ children, remHistory }) => (
  <React.Fragment>
    <div className="game">
      <div className="game-board">{children}</div>
      <div className="game-info">
        <Status />
      </div>
    </div>
    <div className="game-history">
      <History remHistory={remHistory} />
    </div>
  </React.Fragment>
);

GameBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  remHistory: PropTypes.func.isRequired
};

export default GameBox;
