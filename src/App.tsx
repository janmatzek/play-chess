import { BoardComponent } from "./ui/Board";
import { initializeBoard, randomizedBoard } from "./game/initializeBoard";
import { useState } from "react";
import type { Square, Color } from "./types";

function App() {
  const [boardHistory, setBoardHistory] = useState([initializeBoard()]);
  const [selectedSqaure, setSelectedSquare] = useState<Square | null>(null);
  const [playerColor, setPlayerColor] = useState<Color>("white");
  const [boardIndex, setBoardIndex] = useState<number>(boardHistory.length - 1);

  function goToNextBoard(direction: -1 | 1) {
    const newBoardIndex = boardIndex + direction;
    if (newBoardIndex <= boardHistory.length - 1 && newBoardIndex >= 0) {
      setBoardIndex(newBoardIndex);
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-800 flex justify-center items-center flex-col">
      <BoardComponent
        playerColor={playerColor}
        boardHistory={boardHistory}
        setBoardHistory={setBoardHistory}
        boardIndex={boardIndex}
        setBoardIndex={setBoardIndex}
        selectedSquare={selectedSqaure}
        setSelectedSquare={setSelectedSquare}
      ></BoardComponent>
      {/* TODO: turn history view into a separate UI component */}
      {/* TODO: use actual buttons to control the history */}
      {/* TODO: provide visual indication to user that they are viewing history */}
      <div className=" flex flex-row ">
        <div className="text-6xl" onClick={() => goToNextBoard(-1)}>
          ◀
        </div>
        <div className="text-6xl" onClick={() => goToNextBoard(1)}>
          ▶
        </div>
      </div>
    </div>
  );
}

export default App;
