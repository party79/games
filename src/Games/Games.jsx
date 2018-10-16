import React, { Component } from "react";
import GameSelect from "./components/GameSelect.jsx";
import Game from "../Game/Game.jsx";
import { GameListContext } from "../constants/constants";

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
    return (
      <React.Fragment>
        <div>Games!</div>
        <GameSelect setGame={game => this.setGame(game)} />
        <GameListContext.Consumer>
          {games => (
            <React.Fragment>
              <div>Game: {games[this.state.game].name}</div>
              <Game game={games[this.state.game]} />
            </React.Fragment>
          )}
        </GameListContext.Consumer>
      </React.Fragment>
    );
  }
}

export default Games;
