import React, { Component } from "react";
import GameBox from "./components/GameBox.jsx";
import Row from "./components/Row.jsx";
import Square from "./components/Square.jsx";
import { PropGameItem, GameBoardContext } from "../constants/constants";

class Game extends Component {
  constructor(props) {
    super(props);
    const board = props.game.board;
    this.state = { board: board, step: board.step };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.board.game.am(props.game)) {
      const board = props.game.board;
      return { board: board, step: board.step };
    }
    return null;
  }

  addHistory(square, grid) {
    debugger;
    const board = this.state.board;
    board.addHistory(square, grid);
    this.setState({ step: board.step });
  }
  remHistory(move) {
    const board = this.state.board;
    board.remHistory(move);
    this.setState({ step: board.step });
  }

  render() {
    const board = this.state.board;
    const grid = board.grid;
    return (
      <GameBoardContext.Provider value={board}>
        <GameBox remHistory={move => this.remHistory(move)}>
          {grid.map((row, x) => (
            <Row key={x}>
              {row.map((square, y) => (
                <Square
                  key={y}
                  square={square}
                  grid={{ x, y }}
                  addHistory={() => this.addHistory(square, { x, y })}
                />
              ))}
            </Row>
          ))}
        </GameBox>
      </GameBoardContext.Provider>
    );
  }
}

Game.propTypes = {
  game: PropGameItem
};

export default Game;
