export const CompareSquare = (square, player) => [!square, square === player];

export const CompareSquares = (squares, player, toWin, game) => {
  let blanks = 0;
  let me = 0;
  let other = 0;
  let completable = true;

  for (let i = 0; i < toWin.length; i++) {
    const square = toWin[i];
    const [aBlank, aMe] = CompareSquare(squares[square], player);

    blanks += aBlank ? 1 : 0;
    me += aMe ? 1 : 0;
    other += !aBlank && !aMe ? 1 : 0;

    if (completable && game.gravity) {
      if (
        square < game.gridY * (game.gridX - 1) &&
        !squares[square + game.gridY]
      ) {
        completable = false;
      }
    }
  }
  return [blanks, me, other, completable];
};

export const CompareWins = (squares, current, toWin) => {
  let missing;
  for (let i = 0; i < toWin.length; i++) {
    const square = toWin[i];
    if (!squares[square]) {
      missing = square;
      break;
    }
  }
  for (let i = 0; i < current.length; i++) {
    const toWin = current[i];
    for (let j = 0; j < toWin.length; j++) {
      if (toWin[j] === missing) {
        return false;
      }
    }
  }
  return true;
};

export const CalculateWin = (squares, winning, game) => {
  let player1checks = [];
  let player2checks = [];
  let player1canWin = 0;
  let player2canWin = 0;
  let player1hasWon = 0;
  let player2hasWon = 0;

  for (let i = 0; i < winning.length; i++) {
    const toWin = winning[i];
    const items = toWin.length;
    const [blanks, player1, player2, completable] = CompareSquares(
      squares,
      1,
      toWin,
      game
    );
    if (blanks === 1 && completable) {
      if (player1 === items - 1 && CompareWins(squares, player1checks, toWin)) {
        player1checks.push(toWin);
      }
      if (player2 === items - 1 && CompareWins(squares, player2checks, toWin)) {
        player2checks.push(toWin);
      }
    }
    player1canWin += player2 === 0 ? 1 : 0;
    player2canWin += player1 === 0 ? 1 : 0;
    player1hasWon += player1 === items ? 1 : 0;
    player2hasWon += player2 === items ? 1 : 0;
  }

  return [
    player1checks,
    player2checks,
    player1canWin,
    player2canWin,
    player1hasWon,
    player2hasWon
  ];
};

export const GetStatus = (squares, winning, game) => {
  const [
    player1checks,
    player2checks,
    player1canWin,
    player2canWin,
    player1hasWon,
    player2hasWon
  ] = CalculateWin(squares, winning, game);

  let winner;
  let draw;
  let checkmate;
  let checks = [];

  if (player1hasWon > 0) {
    winner = game.player1;
  } else if (player2hasWon > 0) {
    winner = game.player2;
  } else if (player1canWin === 0 && player2canWin === 0) {
    draw = true;
  } else if (player1checks.length > 1 && player2checks.length === 0) {
    checkmate = game.player1;
  } else if (player2checks.length > 1 && player1checks.length === 0) {
    checkmate = game.player2;
  } else {
    if (player1checks.length) {
      checks.push(game.player1);
    }
    if (player2checks.length) {
      checks.push(game.player2);
    }
  }

  return [winner, draw, checkmate, checks];
};

export const GeneratePlayArea = ({
  type,
  gridX,
  gridY,
  winL,
  winH,
  winV,
  winD,
  gravity,
  player1,
  player2
}) => {
  let board = [];
  let winning = [];

  for (let x = 0; x < gridX; x++) {
    let row = [];
    for (let y = 0; y < gridY; y++) {
      row.push(x * gridY + y);
    }
    board.push(row);
    if (winH) {
      for (let i = 0; i <= gridY - winL; i++) {
        let row = [];
        for (let y = 0; y < winL; y++) {
          row.push(x * gridY + y + i);
        }
        winning.push(row);
      }
    }
  }

  if (winV) {
    for (let y = 0; y < gridY; y++) {
      for (let i = 0; i <= gridX - winL; i++) {
        let col = [];
        for (let x = 0; x < winL; x++) {
          col.push(y + (x + i) * gridY);
        }
        winning.push(col);
      }
    }
  }

  if (winD) {
    for (let x = 0; x <= gridX - winL; x++) {
      for (let y = 0; y <= gridY - winL; y++) {
        const pos = x * gridY + y;
        let diag1 = [];
        let diag2 = [];
        for (let i = 0; i < winL; i++) {
          diag1.push(pos + i * (gridY + 1));
          diag2.push(pos + (i + 1) * (gridY - 1) - (gridY - winL));
        }
        winning.push(diag1);
        winning.push(diag2);
      }
    }
  }

  return [board, winning];
};
