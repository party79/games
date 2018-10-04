import React, { Component } from "react";
import ReactDOM from "react-dom";
import GameBox from "./components/GameBox.jsx";
import Row from "./components/Row.jsx";
import Square from "./components/Square.jsx";
import { GameShape } from "../constants/constants";
import { GetStatus, GeneratePlayArea } from "../helpers/tools";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = Game.buildBoard(props.game);
  }

  static getDerivedStateFromProps(props, current_state) {
    if (
      current_state.game.type !== props.game.type ||
      current_state.game.gridX !== props.game.gridX ||
      current_state.game.gridY !== props.game.gridY ||
      current_state.game.winL !== props.game.winL ||
      current_state.game.winH !== props.game.winH ||
      current_state.game.winV !== props.game.winV ||
      current_state.game.winD !== props.game.winD ||
      current_state.game.gravity !== props.game.gravity ||
      current_state.game.player1 !== props.game.player1 ||
      current_state.game.player2 !== props.game.player2
    ) {
      return Game.buildBoard(props.game);
    }
    return null;
  }

  static buildBoard(game) {
    const [board, winning] = GeneratePlayArea(game);
    return {
      game,
      history: [
        {
          squares: Array(game.gridX * game.gridY).fill(null)
        }
      ],
      stepNumber: 0,
      board,
      winning
    };
  }

  handleClick(i, x, y) {
    const game = this.state.game;
    if (game.gravity && x > 0) {
      return;
    }

    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const [winner, draw, checkmate, checks] = GetStatus(
      current.squares,
      this.state.winning,
      this.state.game
    );

    if (winner || draw || checkmate || squares[i]) {
      return;
    }
    const player = this.state.stepNumber % 2 === 0 ? 1 : 2;

    if (game.gravity) {
      for (let x = game.gridX - 1; x >= 0; x--) {
        const item = x * game.gridY + y;
        if (!squares[item]) {
          i = item;
          break;
        }
      }
    }
    squares[i] = player;

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    const history = this.state.history.slice(0, step + 1);

    this.setState({
      history,
      stepNumber: step
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const game = this.state.game;
    const winning = this.state.winning;
    const stepNumber = this.state.stepNumber;

    return (
      <GameBox
        game={game}
        history={history}
        squares={current.squares}
        winning={winning}
        stepNumber={stepNumber}
        jumpTo={step => this.jumpTo(step)}
      >
        {this.state.board.map((row, x) => (
          <Row key={x}>
            {row.map((square, y) => (
              <Square
                disabled={game.gravity && x > 0}
                key={y}
                player={current.squares[square]}
                player1={game.player1}
                player2={game.player2}
                onClick={() => this.handleClick(square, x, y)}
              />
            ))}
          </Row>
        ))}
      </GameBox>
    );
  }
}

Game.propTypes = {
  game: GameShape.isRequired
};

export default Game;
