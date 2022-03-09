import React from "react";

import Board from "./Components/board";
import { GameProvider } from "./Context/GameContext";
// import "./App.scss";

const App = () => (
  <GameProvider>
    <Board />
  </GameProvider>
);

export default App;
