import React, { createContext } from "react";
import { createGlobalStyle } from "styled-components";

import { background, foreground } from "../Styles/variables";
import { Container } from "../Styles";
import useDifficulty from "../Hooks/useDifficulty";
import useBoard from "../Hooks/useBoard";

export const GameContext = createContext();

const GlobalStyles = createGlobalStyle`
    body, input, select, button {
        background-color: ${background};
        color: ${foreground};
        font-family: 'Spartan', sans-serif;
    }
`;

export const GameProvider = ({ children }) => {
  const {
    grid,
    rows,
    setRows,
    cols,
    setCols,
    mines,
    setMines,
    generateBoard,
    boardState,
    openCell,
    cycleCellFlag,
    displayValue,
    getAdjacentFlags,
  } = useBoard();
  const { difficulty, setDifficulty } = useDifficulty((diff, presets) => {
    if (diff !== "custom") {
      setRows(presets.rows);
      setCols(presets.cols);
      setMines(presets.mines);
    }
  });

  return (
    <GameContext.Provider
      value={{
        grid,
        difficulty,
        setDifficulty,
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
      }}
    >
      <GlobalStyles />
      <Container>{children}</Container>
    </GameContext.Provider>
  );
};
