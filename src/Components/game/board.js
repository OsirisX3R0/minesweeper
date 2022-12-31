import React, { useContext } from "react";
import { GameContext } from "../../Context/GameContext";

import { BoardBody, BoardRow, BoardTable, Cell } from "../../Styles";
import Header from "../layout/header/header";
import Footer from "../layout/Footer";

const Board = () => {
  const {
    grid,
    mode,
    cols,
    openCell,
    cycleCellFlag,
    displayValue,
    getAdjacentFlags,
  } = useContext(GameContext);

  const onContextMenu = (e, { x, y }) => {
    e.preventDefault();
    cycleCellFlag(x, y);
  };

  const handleTouch = (x, y) => {
    if (mode === "open") openCell(x, y);
    else cycleCellFlag(x, y);
  };

  const board = grid.length ? (
    <BoardTable>
      <BoardBody width={cols}>
        {grid.map((row, rowIndex) => (
          <BoardRow key={rowIndex}>
            {row.map((cell) => (
              <Cell
                cell={cell}
                key={`${cell.x}-${cell.y}`}
                onTouchStart={() => handleTouch(cell.x, cell.y)}
                onClick={() => openCell(cell.x, cell.y)}
                onContextMenu={(e) => onContextMenu(e, cell)}
                adjacentFlags={getAdjacentFlags(cell)}
              >
                {displayValue(cell)}
              </Cell>
            ))}
          </BoardRow>
        ))}
      </BoardBody>
    </BoardTable>
  ) : null;

  return (
    <>
      {board}
      <Footer />
    </>
  );
};

export default Board;
