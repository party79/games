import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import Games from "./Games/Games.jsx";
import { GameList } from "./Game/constants/constants";

class App extends Component {
  render() {
    return <Games games={GameList} />;
  }
}

render(<App />, document.getElementById("root"));
