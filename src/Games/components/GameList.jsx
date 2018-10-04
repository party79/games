import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { GameShape } from "../../constants/constants";

const History = ({ games, setGame }) => (
  <ol>
    {games.map((game, index) => (
      <li key={index}>
        <button onClick={() => setGame(index)}>{game.type}</button>
      </li>
    ))}
  </ol>
);

History.propTypes = {
  games: PropTypes.arrayOf(GameShape.isRequired).isRequired,
  setGame: PropTypes.func.isRequired
};

export default History;
