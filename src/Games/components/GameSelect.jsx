import React from "react";
import PropTypes from "prop-types";
import { GameListContext } from "../../constants/constants";

const History = ({ setGame }) => (
  <ol>
    <GameListContext.Consumer>
      {games => (
        <React.Fragment>
          {games.map((game, index) => (
            <li key={index}>
              <button onClick={() => setGame(index)}>{game.name}</button>
            </li>
          ))}
        </React.Fragment>
      )}
    </GameListContext.Consumer>
  </ol>
);

History.propTypes = {
  setGame: PropTypes.func.isRequired
};

export default History;
