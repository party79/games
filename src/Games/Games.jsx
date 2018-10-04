import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import GameList from "./components/GameList.jsx";
import Game from "../Game/Game.jsx";
import { GameShape } from "../constants/constants";

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
      <React.Fragment>
        <div>Games!</div>
        <GameList games={games} setGame={game => this.setGame(game)} />
        <div>Game: {game.type}</div>
        <Game game={game} />
      </React.Fragment>
    );
  }
}

Games.propTypes = {
  games: PropTypes.arrayOf(GameShape.isRequired).isRequired
};

export default Games;
