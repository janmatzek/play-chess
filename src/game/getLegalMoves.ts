import type { Board, Square, PieceType } from "../types";

type LegalMoves = string[];
type getMovesFunction = (board: Board, selectedSquare: Square) => LegalMoves;

// TODO: piece collisions

function isInsideBoard(row: number, col: number): boolean {
  if (row < 0) {
    return false;
  }
  if (row > 7) {
    return false;
  }
  if (col < 0) {
    return false;
  }
  if (col > 7) {
    return false;
  }

  return true;
}

function getPawnMoves(board: Board, selectedSquare: Square): LegalMoves {
  // TODO: en passant
  // TODO: handle pawn reaching the last row of the board
  if (!selectedSquare.piece) {
    return [];
  }

  const legalIds: string[] = [];

  const currentPosition = selectedSquare.position;

  // Pawn can move 1 square forward
  // Meaning of 'forward' is dependent on color
  const step = selectedSquare.piece.color === "white" ? 1 : -1;
  const nextSquare = `${currentPosition.rowNum + step}-${currentPosition.colNum}`;
  legalIds.push(nextSquare);

  // Pawn's first move can be two squares
  const baseRow = selectedSquare.piece.color === "white" ? 1 : 6;
  if (selectedSquare.position.rowNum === baseRow) {
    const jumpSquare = `${currentPosition.rowNum + 2 * step}-${currentPosition.colNum}`;
    legalIds.push(jumpSquare);
  }
  return legalIds;
}
function getRookMoves(board: Board, selectedSquare: Square): LegalMoves {
  if (!selectedSquare.piece) {
    return [];
  }

  const legalIds: string[] = [];

  const currentPosition = selectedSquare.position;

  // Rook moves in line - row or column
  const directions = [
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: -1, col: 0 },
  ];

  directions.forEach((direction) => {
    for (let i = 1; i < 8; i++) {
      const nextRow = currentPosition.rowNum + i * direction.row;
      const nextCol = currentPosition.colNum + i * direction.col;

      if (isInsideBoard(nextRow, nextCol)) {
        legalIds.push(`${nextRow}-${nextCol}`);
      } else break;
    }
  });

  return legalIds;
}

function getKnighMoves(board: Board, selectedSquare: Square): LegalMoves {
  if (!selectedSquare.piece) {
    return [];
  }

  const currentPosition = selectedSquare.position;

  //   Horsie does the `L`s
  const direcation = [
    { row: 2, col: -1 },
    { row: 2, col: 1 },
    { row: -2, col: -1 },
    { row: -2, col: 1 },
    { row: 1, col: 2 },
    { row: 1, col: -2 },
    { row: -1, col: 2 },
    { row: -1, col: -2 },
  ];

  const legalIds = direcation
    .map((pattern) => {
      const nextRow = currentPosition.rowNum + pattern.row;
      const nextCol = currentPosition.colNum + pattern.col;
      if (isInsideBoard(nextRow, nextCol)) {
        return `${nextRow}-${nextCol}`;
      }
    })
    .filter((val) => {
      return val !== undefined;
    });

  return legalIds;
}

function getBishopMoves(board: Board, selectedSquare: Square): LegalMoves {
  if (!selectedSquare.piece) {
    return [];
  }

  const legalIds: string[] = [];

  const currentPosition = selectedSquare.position;
  // Bishop walks the diagonal
  const directions = [
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 1 },
    { row: -1, col: -1 },
  ];

  directions.forEach((direction) => {
    for (let i = 1; i < 8; i++) {
      const nextRow = currentPosition.rowNum + i * direction.row;
      const nextCol = currentPosition.colNum + i * direction.col;
      if (!isInsideBoard(nextRow, nextCol)) {
        break;
      }
      legalIds.push(`${nextRow}-${nextCol}`);
    }
  });

  return legalIds;
}

function getKingMoves(board: Board, selectedSquare: Square): LegalMoves {
  if (!selectedSquare.piece) {
    return [];
  }

  const legalIds: string[] = [];

  const currentPosition = selectedSquare.position;

  const directions = [
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
  ];

  directions.forEach((direction) => {
    const nextRow = currentPosition.rowNum + direction.row;
    const nextCol = currentPosition.colNum + direction.col;
    if (isInsideBoard(nextRow, nextCol)) {
      legalIds.push(`${nextRow}-${nextCol}`);
    }
  });

  return legalIds;
}

function getQueenMoves(board: Board, selectedSquare: Square): LegalMoves {
  const legalIds: string[] = [];
  legalIds.push(...getRookMoves(board, selectedSquare));
  legalIds.push(...getBishopMoves(board, selectedSquare));
  return legalIds;
}

const GET_MOVE_MAP: Record<PieceType, getMovesFunction> = {
  pawn: getPawnMoves,
  rook: getRookMoves,
  knight: getKnighMoves,
  bishop: getBishopMoves,
  king: getKingMoves,
  queen: getQueenMoves,
};

export function getLegalMoves(
  board: Board,
  selectedSquare: Square | null,
): LegalMoves {
  if (selectedSquare === null) {
    return [];
  }

  if (!selectedSquare.piece) {
    return [];
  }

  const getMoves = GET_MOVE_MAP[selectedSquare.piece.type];
  const legalMap = getMoves(board, selectedSquare);
  return legalMap;
}
