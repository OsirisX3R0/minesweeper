import React, { useState, useContext } from 'react'

import Board from './Components/Board'
import Controls from './Components/Controls'
import { GameProvider } from './Context/GameContext'
import './App.scss';

const App = () => (
  <GameProvider>
    <Controls />
    <Board />
  </GameProvider>
)

export default App;
