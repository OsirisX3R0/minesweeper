import { useRef, useState, useCallback, useMemo } from "react";
import {
  generateMineArray,
  Board,
  BoardStateEnum,
  CellStateEnum,
  CellFlagEnum,
} from "minesweeper";

const useBoard = () => {
  const [mode, setMode] = useState("open");
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [mines, setMines] = useState(25);
  let mineArray = useRef(null);
  let board = useRef(null);
  const [grid, setGrid] = useState([]);
  const [boardState, setBoardState] = useState(null);

  const [isOpenMode, isFlagMode] = useMemo(
    () => [mode === "open", mode === "flag"],
    [mode]
  );

  const generateBoard = () => {
    mineArray.current = generateMineArray({ rows, cols, mines });
    board.current = new Board(mineArray.current);
    setGrid([...board.current.grid()]);
    setBoardState(board.current.state());
  };

  const clearBoard = () => {
    setMode("open");
    mineArray.current = null;
    board.current = null;
    setGrid([]);
    setBoardState(null);
  };

  const renderGrid = () => {
    setGrid([...board.current.grid()]);
    setBoardState(board.current.state());
  };

  const openCell = (x, y) => {
    board.current.openCell(x, y);
    renderGrid();
  };

  const cycleCellFlag = (x, y) => {
    board.current.cycleCellFlag(x, y);
    renderGrid();
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

  const searchBoard = useCallback(
    (x, y) => {
      if (x < 0 || y < 0 || x >= cols || y >= rows) return null;

      return grid && grid.length
        ? grid
            .find((_, rowIndex) => rowIndex === y)
            .find((_, cellIndex) => cellIndex === x)
        : null;
    },
    [grid, cols, rows]
  );

  const getAdjacentFlags = useCallback(
    (cell) => {
      let topLeft = searchBoard(cell.x - 1, cell.y - 1);
      let top = searchBoard(cell.x, cell.y - 1);
      let topRight = searchBoard(cell.x + 1, cell.y - 1);
      let left = searchBoard(cell.x - 1, cell.y);
      let right = searchBoard(cell.x + 1, cell.y);
      let bottomLeft = searchBoard(cell.x - 1, cell.y + 1);
      let bottom = searchBoard(cell.x, cell.y + 1);
      let bottomRight = searchBoard(cell.x + 1, cell.y + 1);

      return [
        topLeft &&
          topLeft.flag !== CellFlagEnum.NONE &&
          topLeft.state !== CellStateEnum.OPEN,
        top &&
          top.flag !== CellFlagEnum.NONE &&
          top.state !== CellStateEnum.OPEN,
        topRight &&
          topRight.flag !== CellFlagEnum.NONE &&
          topRight.state !== CellStateEnum.OPEN,
        left &&
          left.flag !== CellFlagEnum.NONE &&
          left.state !== CellStateEnum.OPEN,
        right &&
          right.flag !== CellFlagEnum.NONE &&
          right.state !== CellStateEnum.OPEN,
        bottomLeft &&
          bottomLeft.flag !== CellFlagEnum.NONE &&
          bottomLeft.state !== CellStateEnum.OPEN,
        bottom &&
          bottom.flag !== CellFlagEnum.NONE &&
          bottom.state !== CellStateEnum.OPEN,
        bottomRight &&
          bottomRight.flag !== CellFlagEnum.NONE &&
          bottomRight.state !== CellStateEnum.OPEN,
      ].filter((s) => s).length;
    },
    [searchBoard]
  );

  return {
    grid,
    mode,
    setMode,
    setRows,
    rows,
    setCols,
    cols,
    setMines,
    mines,
    isOpenMode,
    isFlagMode,
    generateBoard,
    clearBoard,
    boardState,
    openCell,
    cycleCellFlag,
    displayValue,
    getAdjacentFlags,
  };
};

export default useBoard;
