import React, { createContext, useRef, useState } from "react";
import { createGlobalStyle } from "styled-components";
import {
  generateMineArray,
  Board,
  BoardStateEnum,
  CellStateEnum,
  CellFlagEnum,
} from "minesweeper";

import { background, foreground } from "../Styles/variables";
import { Container } from "../Styles";

export const GameContext = createContext();

const GlobalStyles = createGlobalStyle`
    body, input, button {
        background-color: ${background};
        color: ${foreground};
        font-family: 'Spartan', sans-serif;
    }
`;

export const GameProvider = ({ children }) => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [mines, setMines] = useState(25);
  let mineArray = useRef(null);
  let board = useRef(null);
  const [grid, setGrid] = useState([]);
  const [boardState, setBoardState] = useState([]);

  const generateBoard = () => {
    mineArray.current = generateMineArray({ rows, cols, mines });
    board.current = new Board(mineArray.current);
    setGrid([...board.current.grid()]);
    setBoardState(board.current.state());
  };

  const renderGrid = () => {
    setGrid([...board.current.grid()]);
  };

  const getBoardState = () => {
    setBoardState(board.current.state());
  };

  const openCell = (x, y) => {
    board.current.openCell(x, y);
    renderGrid();
    getBoardState();
  };

  const cycleCellFlag = (x, y) => {
    board.current.cycleCellFlag(x, y);
    renderGrid();
    getBoardState();
  };

  const displayValue = (cell) => {
    if (boardState === BoardStateEnum.LOST && cell.isMine) return "X";
    if (cell.state === CellStateEnum.OPEN) {
      if (cell.isMine) return "X";
      else return cell.numAdjacentMines || "O";
    } else {
      switch (cell.flag) {
        case CellFlagEnum.EXCLAMATION:
          return "!";
        case CellFlagEnum.QUESTION:
          return "?";
        default:
          return "";
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        grid,
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
      }}
    >
      <GlobalStyles />
      <Container>{children}</Container>
    </GameContext.Provider>
  );
};
