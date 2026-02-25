import { BoardComponent } from "./ui/Board";
import { initializeBoard, randomizedBoard } from "./game/initializeBoard";
import { useState } from "react";
import type { Square, Board, Color } from "./types";

function App() {
  const [board, setBoard] = useState<Board>(initializeBoard());
  const [boardHistory, setBoardHistory] = useState([board]);
  const [selectedSqaure, setSelectedSquare] = useState<Square | null>(null);
  const [playerColor, setPlayerColor] = useState<Color>("white");

  return (
    <>
      <div className="w-screen h-screen bg-gray-800 flex justify-center items-center">
        <div>
          <BoardComponent
            playerColor={playerColor}
            board={board}
            setBoard={setBoard}
            boardHistory={boardHistory}
            setBoardHistory={setBoardHistory}
            selectedSquare={selectedSqaure}
            setSelectedSquare={setSelectedSquare}
          ></BoardComponent>
        </div>
      </div>
    </>
  );
}

export default App;
