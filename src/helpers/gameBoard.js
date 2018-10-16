import { CalculateWin, GetStatus } from "./tools";

class gameBoard {
  constructor(game) {
    this.data = {
      game,
      history: [Array(game.squares).fill(null)],
      step: 0
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
    const game = this.game;
    const [
      player1checks,
      player2checks,
      player1canWin,
      player2canWin,
      player1hasWon,
      player2hasWon
    ] = CalculateWin(this.squares, game.play.winning, game.game);

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

  player(square) {
    return this.game.playerSymbol(this.squares[square]);
  }
  amDisabled(grid) {
    return this.game.gravity && grid.x > 0;
  }

  addHistory(square, grid) {
    if (this.amDisabled(grid)) {
      return;
    }
    const game = this.game;
    const squares = this.squares.slice();
    const [winner, draw, checkmate, checks] = this.status;

    if (winner || draw || checkmate || squares[square]) {
      return;
    }
    const player = this.step % 2 === 0 ? 1 : 2;

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

    this.data.step = this.data.history.length;
    this.data.history = this.data.history.concat([squares]);
  }

  remHistory(move) {
    this.data.step = move;
    this.data.history = this.history.slice(0, move + 1);
  }
}

export default gameBoard;
