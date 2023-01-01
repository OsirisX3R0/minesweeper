import React, { createContext } from "react";
import { createGlobalStyle } from "styled-components";

import { background, foreground } from "../Styles/variables";
import useDifficulty from "../Hooks/useDifficulty";
import useBoard from "../Hooks/useBoard";
import Layout from "../Components/layout";

export const GameContext = createContext();

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;  
  }

  body, input, select, button {
      background-color: ${background};
      color: ${foreground};
      font-family: 'Spartan', sans-serif;
      font-size: 12px;
  }
`;

export const GameProvider = ({ children }) => {
  const {
    grid,
    mode,
    setMode,
    rows,
    setRows,
    cols,
    setCols,
    mines,
    setMines,
    isOpenMode,
    isFlagMode,
    generateBoard,
    clearBoard,
    boardState,
    openCell,
    cycleCellFlag,
    displayValue,
    getAdjacentFlags,
  } = useBoard();
  const { difficulty, setDifficulty, resetDifficulty } = useDifficulty(
    (presets) => {
      setRows(presets.rows);
      setCols(presets.cols);
      setMines(presets.mines);
    }
  );

  const clearGame = () => {
    clearBoard();
    resetDifficulty();
  };

  return (
    <GameContext.Provider
      value={{
        grid,
        difficulty,
        setDifficulty,
        mode,
        isOpenMode,
        isFlagMode,
        setMode,
        setRows,
        rows,
        setCols,
        cols,
        setMines,
        mines,
        generateBoard,
        boardState,
        openCell,
        cycleCellFlag,
        displayValue,
        getAdjacentFlags,
        clearGame,
      }}
    >
      <GlobalStyles />
      <Layout>{children}</Layout>
    </GameContext.Provider>
  );
};
