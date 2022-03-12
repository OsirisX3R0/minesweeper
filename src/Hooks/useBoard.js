import { useRef, useState } from "react";
import {
  generateMineArray,
  Board,
  BoardStateEnum,
  CellStateEnum,
  CellFlagEnum,
} from "minesweeper";

const useBoard = (opts) => {
  let options = useRef(opts);
  let mineArray = useRef(generateMineArray(options.current));
  let board = useRef(new Board(mineArray.current));
  const [grid, setGrid] = useState(board.current.grid());
  const [boardState, setBoardState] = useState(board.current.state());

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

  return {
    grid,
    ...options.current,
    boardState,
    openCell,
    cycleCellFlag,
    displayValue,
  };
};

export default useBoard;
