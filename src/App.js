import React from "react";

import Game from "./Components/game/Game";
import "./App.scss";
import { GameProvider } from "./Context/GameContext";

const App = () => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
};

export default App;
