import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Game from "../Game/Game.jsx";
import { GameShape } from "../Game/constants/constants";

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: 0
    };
  }

  setGame(game) {
    this.setState({ game });
  }

  render() {
    const games = this.props.games;
    const game = games[this.state.game];
    return (
      <div>
        <div>Games!</div>
        <ul>
          {games.map((game, index) => (
            <li key={index}>
              <button onClick={() => this.setGame(index)}>{game.type}</button>
            </li>
          ))}
        </ul>
        <div>Game: {game.type}</div>
        <Game game={game} />
      </div>
    );
  }
}

Games.propTypes = {
  games: PropTypes.arrayOf(GameShape.isRequired).isRequired
};

export default Games;
