import minesweeper from "minesweeper";
import { useRef, useState } from "react";

const useBoard = (opts) => {
  let options = useRef(opts);
  let mineArray = useRef(minesweeper.generateMineArray(options.current));
  let board = useRef(new minesweeper.Board(mineArray.current));
  const [grid, setGrid] = useState(board.current.grid());
  const [boardState, setBoardState] = useState(board.current.state());

  const renderGrid = () => {
    setGrid(board.current.grid());
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

  return { grid, ...options.current, boardState, openCell, cycleCellFlag };
};

export default useBoard;
