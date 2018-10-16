import gameBoard from "./gameBoard";
import { GeneratePlayArea } from "./tools";

class gameItem {
  constructor(game) {
    const [grid, winning] = GeneratePlayArea(game);
    this.data = { game, grid, winning };
  }

  get name() {
    return this.data.game.type;
  }
  get grid() {
    return {
      x: this.data.game.gridX,
      y: this.data.game.gridY
    };
  }
  get squares() {
    const grid = this.grid;
    return grid.x * grid.y;
  }
  get win() {
    return {
      length: this.data.game.winL,
      horizontal: this.data.game.winH,
      vertical: this.data.game.winV,
      diagonal: this.data.game.winD
    };
  }
  get gravity() {
    return this.data.game.gravity;
  }

  get game() {
    return this.data.game;
  }

  get board() {
    return new gameBoard(this);
  }

  get play() {
    return {
      grid: this.data.grid,
      winning: this.data.winning
    };
  }

  playerSymbol(player) {
    return player === 1
      ? this.data.game.player1
      : player === 2
        ? this.data.game.player2
        : "";
  }

  am(other) {
    const meGrid = this.grid;
    const meWin = this.win;
    const otherGrid = other.grid;
    const otherWin = other.win;
    return (
      this.name === other.name &&
      meGrid.x === otherGrid.x &&
      meGrid.y === otherGrid.y &&
      meWin.length === otherWin.length &&
      meWin.horizontal === otherWin.horizontal &&
      meWin.vertical === otherWin.vertical &&
      meWin.diagonal === otherWin.diagonal &&
      this.gravity === other.gravity &&
      this.playerSymbol(1) === other.playerSymbol(1) &&
      this.playerSymbol(2) === other.playerSymbol(2)
    );
  }
}

export default gameItem;
