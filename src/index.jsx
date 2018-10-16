import React, { Component } from "react";
import { render } from "react-dom";
import Games from "./Games/Games.jsx";
import { GameList, GameListContext } from "./constants/constants";

class App extends Component {
  render() {
    return (
      <GameListContext.Provider value={GameList}>
        <Games />
      </GameListContext.Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
