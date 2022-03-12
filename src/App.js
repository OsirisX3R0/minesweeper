import React from "react";

import Board from "./Components/board";
import "./App.scss";
import { GameProvider } from "./Context/GameContext";

const App = () => {
  return (
    <GameProvider>
      <Board />
    </GameProvider>
  );
};

export default App;
