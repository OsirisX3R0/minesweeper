import React from 'react'

import Board from './Components/Board'
import Controls from './Components/Controls'
import { GameProvider } from './Context/GameContext'
import './App.scss';
import GameWon from './Components/GameWon';

const App = () => (
  <GameProvider>
    <GameWon />
    <Controls />
    <Board />
  </GameProvider>
)

export default App;
