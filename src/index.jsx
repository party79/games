import React, { Component } from "react";
import { render } from "react-dom";
import Games from "./Games/Games.jsx";
import {
  GameTicTacToe,
  GameConnect4,
  GameListContext
} from "./constants/constants";

class App extends Component {
  render() {
    return (
      <GameListContext.Provider value={[GameTicTacToe, GameConnect4]}>
        <Games />
      </GameListContext.Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
