import { BoardComponent } from "./ui/Board";
import { initializeBoard, randomizedBoard } from "./game/initializeBoard";
import { useState } from "react";
import { HistoryControl } from "./ui/HistoryControl";
import type { Square, Color } from "./types";

function App() {
  const [boardHistory, setBoardHistory] = useState([initializeBoard()]);
  const [selectedSqaure, setSelectedSquare] = useState<Square | null>(null);
  const [playerColor, setPlayerColor] = useState<Color>("white");
  const [boardIndex, setBoardIndex] = useState<number>(boardHistory.length - 1);

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
      {/* TODO: provide visual indication to user that they are viewing history */}
      <HistoryControl
        boardHistory={boardHistory}
        boardIndex={boardIndex}
        setBoardIndex={setBoardIndex}
      ></HistoryControl>
    </div>
  );
}

export default App;
