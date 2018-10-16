import React, { Component } from "react";
import GameBox from "./components/GameBox.jsx";
import Row from "./components/Row.jsx";
import Square from "./components/Square.jsx";
import { PropGameItem, GameBoardContext } from "../constants/constants";
import gameBoard from "../helpers/gameBoard";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game,
      history: [Array(props.game.squares).fill(null)],
      step: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.game.am(props.game)) {
      return {
        game: props.game,
        history: [Array(props.game.squares).fill(null)],
        step: 0
      };
    }
    return null;
  }

  addHistory(square, grid) {
    const game = this.state.game;
    if (gameBoard.amDisabled(game, grid)) {
      return;
    }
    const history = this.state.history;
    const squares = history[history.length - 1].slice();
    const [winner, draw, checkmate, checks] = gameBoard.getStatus(
      game,
      squares
    );

    if (winner || draw || checkmate || squares[square]) {
      return;
    }
    const player = this.state.step % 2 === 0 ? 1 : 2;

    if (game.gravity) {
      const gameGrid = game.grid;
      for (let x = gameGrid.x - 1; x >= 0; x--) {
        const item = x * gameGrid.y + grid.y;
        if (!squares[item]) {
          square = item;
          break;
        }
      }
    }
    squares[square] = player;

    this.setState({
      step: history.length,
      history: history.concat([squares])
    });
  }
  remHistory(move) {
    this.setState({
      step: move,
      history: this.state.history.slice(0, move + 1)
    });
  }

  render() {
    const board = new gameBoard(this.state);
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
