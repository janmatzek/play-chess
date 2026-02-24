import type {
  Piece,
  Board,
  Square,
  PieceType,
  Position,
  Color,
} from "../types";

type LegalMoves = string[];
type getMovesFunction = (board: Board, selectedSquare: Square) => LegalMoves;

// TODO: Square with King is always illegal
// TODO: king cannot go on "unsafe" squares

function isInsideBoard(position: Position): boolean {
  if (position.row < 0) {
    return false;
  }
  if (position.row > 7) {
    return false;
  }
  if (position.col < 0) {
    return false;
  }
  if (position.col > 7) {
    return false;
  }

  return true;
}

function positionToString(position: Position) {
  return `${position.row}-${position.col}`;
}

function hasOpposingKingNearby(
  board: Board,
  position: Position,
  kingColor: Color,
): boolean {
  // Check all neighboring squares to see if there is a king of opposing color
  const directions: Position[] = [
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
  ];

  const surroundingSquares = directions.map((direction) => {
    return {
      row: position.row + direction.row,
      col: position.col + direction.col,
    };
  });

  for (let i = 0; i < surroundingSquares.length; i++) {
    const piece = getPiece(board, surroundingSquares[i]);
    if (piece && piece.type === "king" && piece.color !== kingColor) {
      return true;
    }
  }
  return false;
}

function getPiece(board: Board, position: Position): Piece | null {
  if (!isInsideBoard(position)) {
    return null;
  }
  return board[position.row][position.col].piece;
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
  const nextStepPosition = {
    row: currentPosition.row + step,
    col: currentPosition.col,
  };

  const pieceOnNextSquare = getPiece(board, nextStepPosition);
  if (isInsideBoard(nextStepPosition) && pieceOnNextSquare === null) {
    legalIds.push(positionToString(nextStepPosition));
  }

  // Pawn's first move can be two squares
  const baseRow = selectedSquare.piece.color === "white" ? 1 : 6;
  if (selectedSquare.position.row === baseRow) {
    const jumpPosition = {
      row: currentPosition.row + 2 * step,
      col: currentPosition.col,
    };
    const pieceOnJumpSquare = getPiece(board, jumpPosition);
    if (pieceOnNextSquare === null && pieceOnJumpSquare === null) {
      legalIds.push(positionToString(jumpPosition));
    }
  }

  // Check front diagonals for pieces of oponent's color
  const pawnColor = selectedSquare.piece.color;
  const diagonalDirections = [
    { row: 0, col: -1 },
    { row: 0, col: 1 },
  ];
  diagonalDirections.forEach((direction) => {
    const daigonalPosition = {
      row: nextStepPosition.row,
      col: nextStepPosition.col + direction.col,
    };
    if (!isInsideBoard(daigonalPosition)) return;

    const diagonalPiece = getPiece(board, daigonalPosition);

    if (!diagonalPiece) return;
    if (diagonalPiece.color === pawnColor) return;
    if (diagonalPiece.type === "king") return;

    legalIds.push(positionToString(daigonalPosition));
  });

  return legalIds;
}

function getRookMoves(board: Board, selectedSquare: Square): LegalMoves {
  const selectedSquarePiece = selectedSquare.piece;

  if (selectedSquarePiece === null) {
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
      const nextPosition = {
        row: currentPosition.row + i * direction.row,
        col: currentPosition.col + i * direction.col,
      };

      if (isInsideBoard(nextPosition)) {
        const piece = getPiece(board, nextPosition);
        if (piece) {
          if (
            piece.color !== selectedSquarePiece.color &&
            piece.type !== "king"
          ) {
            legalIds.push(positionToString(nextPosition));
          }
          break;
        }
        legalIds.push(positionToString(nextPosition));
      } else break;
    }
  });

  return legalIds;
}

function getKnighMoves(board: Board, selectedSquare: Square): LegalMoves {
  const selectedSquarePiece = selectedSquare.piece;

  if (selectedSquarePiece === null) {
    return [];
  }

  const currentPosition = selectedSquare.position;

  //   Horsie does the `L`s
  const direction = [
    { row: 2, col: -1 },
    { row: 2, col: 1 },
    { row: -2, col: -1 },
    { row: -2, col: 1 },
    { row: 1, col: 2 },
    { row: 1, col: -2 },
    { row: -1, col: 2 },
    { row: -1, col: -2 },
  ];

  const legalIds = direction
    .map((pattern) => {
      const nextPosition = {
        row: currentPosition.row + pattern.row,
        col: currentPosition.col + pattern.col,
      };
      if (isInsideBoard(nextPosition)) {
        const piece = getPiece(board, nextPosition);
        if (!piece) {
          // If there is no piece on the square, it is legal
          return positionToString(nextPosition);
        }
        if (
          piece.color !== selectedSquarePiece.color &&
          piece.type !== "king"
        ) {
          // Square with a piece of another color is also legal
          return positionToString(nextPosition);
        }
      }
    })
    .filter((val) => {
      return val !== undefined;
    });

  return legalIds;
}

function getBishopMoves(board: Board, selectedSquare: Square): LegalMoves {
  const selectedSquarePiece = selectedSquare.piece;
  if (selectedSquarePiece === null) {
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
      const nextPosition = {
        row: currentPosition.row + i * direction.row,
        col: currentPosition.col + i * direction.col,
      };
      if (!isInsideBoard(nextPosition)) {
        break;
      }
      const piece = getPiece(board, nextPosition);

      if (!piece) {
        // If there is no piece, square is legal. Go to next in the same direction
        legalIds.push(positionToString(nextPosition));
        continue;
      }

      if (piece.color !== selectedSquarePiece.color && piece.type !== "king") {
        // Square with enemy piece is legal, but bishop cannot go further in this direction
        legalIds.push(positionToString(nextPosition));
        break;
      } else {
        // Piece of same color means the path is blocked
        break;
      }
    }
  });

  return legalIds;
}

function getKingMoves(board: Board, selectedSquare: Square): LegalMoves {
  const selectedSquarePiece = selectedSquare.piece;
  if (selectedSquarePiece === null) {
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
    const nextPosition = {
      row: currentPosition.row + direction.row,
      col: currentPosition.col + direction.col,
    };
    if (hasOpposingKingNearby(board, nextPosition, selectedSquarePiece.color)) {
      return;
    }
    if (isInsideBoard(nextPosition)) {
      const piece = getPiece(board, nextPosition);
      if (!piece) {
        // No piece means legal move
        legalIds.push(positionToString(nextPosition));
        return;
      }
      if (piece.color !== selectedSquarePiece.color && piece.type !== "king") {
        // Square with enemy piece is legal
        legalIds.push(positionToString(nextPosition));
      }
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
