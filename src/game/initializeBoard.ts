import type { Board, Square, Piece, Color, PieceType } from "../types";

const BACK_ROW: PieceType[] = [
  "rook",
  "knight",
  "bishop",
  "queen",
  "king",
  "bishop",
  "knight",
  "rook",
];

function getColor(rowNum: number, colNum: number): Color {
  let color: Color;
  if (rowNum % 2 === 0) {
    if (colNum % 2 === 0) {
      color = "black";
    } else {
      color = "white";
    }
  } else {
    if (colNum % 2 === 0) {
      color = "white";
    } else {
      color = "black";
    }
  }
  return color;
}

function getPiece(rowNum: number, colNum: number): Piece | null {
  let piece: Piece | null = null;
  switch (rowNum) {
    case 0:
      piece = {
        type: BACK_ROW[colNum],
        color: "white",
      };
      break;
    case 1:
      piece = {
        type: "pawn",
        color: "white",
      };
      break;
    case 6:
      piece = {
        type: "pawn",
        color: "black",
      };
      break;
    case 7:
      piece = {
        type: BACK_ROW[colNum],
        color: "black",
      };
      break;
    default:
      piece = null;
  }
  return piece;
}

export function initializeBoard(): Board {
  const board: Board = [];

  for (let row = 0; row < 8; row++) {
    const currentRow: Square[] = [];
    for (let col = 0; col < 8; col++) {
      const color = getColor(row, col);
      const piece = getPiece(row, col);

      const square: Square = {
        color: color,
        piece: piece,
        position: {
          row: row,
          col: col,
        },
      };
      currentRow.push(square);
    }
    board.push(currentRow);
  }
  return board;
}

export function randomizedBoard(): Board {
  const board: Board = [];

  for (let row = 0; row < 8; row++) {
    const currentRow: Square[] = [];
    for (let col = 0; col < 8; col++) {
      const color = getColor(row, col);
      const randRow = Math.round(Math.random() * 7);
      const randCol = Math.round(Math.random() * 7);
      const piece = getPiece(randRow, randCol);

      const square: Square = {
        color: color,
        piece: piece,
        position: {
          row: row,
          col: col,
        },
      };
      currentRow.push(square);
    }
    board.push(currentRow);
  }
  return board;
}
