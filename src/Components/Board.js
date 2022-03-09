import React from "react";
import useBoard from "../Hooks/useBoard";

const Board = () => {
  const { grid, boardState, openCell, cycleCellFlag } = useBoard({
    rows: 3,
    cols: 3,
    mines: 3,
  });
  return <div></div>;
};

export default Board;
