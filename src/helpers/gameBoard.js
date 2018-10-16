import { CalculateWin, GetStatus } from "./tools";

class gameBoard {
  constructor({ game, history, step }) {
    this.data = {
      game,
      history: history,
      step: step
    };
  }

  get game() {
    return this.data.game;
  }
  get grid() {
    return this.game.play.grid;
  }

  get history() {
    return this.data.history.slice(0, this.data.history.length - 1);
  }
  get squares() {
    const history = this.data.history;
    return history[history.length - 1];
  }
  get current() {
    return this.game.playerSymbol(this.step % 2 === 0 ? 1 : 2);
  }

  get step() {
    return this.data.step;
  }

  get status() {
    return gameBoard.getStatus(this.game, this.squares);
  }

  static getStatus(game, squares) {
    const [
      player1checks,
      player2checks,
      player1canWin,
      player2canWin,
      player1hasWon,
      player2hasWon
    ] = CalculateWin(squares, game.play.winning, game.game);

    let winner;
    let draw;
    let checkmate;
    let checks = [];

    if (player1hasWon > 0) {
      winner = game.playerSymbol(1);
    } else if (player2hasWon > 0) {
      winner = game.playerSymbol(2);
    } else if (player1canWin === 0 && player2canWin === 0) {
      draw = true;
    } else if (player1checks.length > 1 && player2checks.length === 0) {
      checkmate = game.playerSymbol(1);
    } else if (player2checks.length > 1 && player1checks.length === 0) {
      checkmate = game.playerSymbol(2);
    } else {
      if (player1checks.length) {
        checks.push(game.playerSymbol(1));
      }
      if (player2checks.length) {
        checks.push(game.playerSymbol(2));
      }
    }

    return [winner, draw, checkmate, checks];
  }

  amDisabled(grid) {
    return gameBoard.amDisabled(this.game, grid);
  }

  static amDisabled(game, grid) {
    return game.gravity && grid.x > 0;
  }

  player(square) {
    return this.game.playerSymbol(this.squares[square]);
  }
}

export default gameBoard;
