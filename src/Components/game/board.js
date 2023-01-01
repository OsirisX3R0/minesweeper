import React, { useContext, useRef } from "react";

import { GameContext } from "../../Context/GameContext";
import { BoardBody, BoardRow, BoardTable, Cell } from "../../Styles";

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
  const cellRef = useRef();

  const onContextMenu = (e, { x, y }) => {
    e.preventDefault();
    cycleCellFlag(x, y);
  };

  const handleTouch = (cell, x, y) => {
    let moved = false;
    cell.current.addEventListener("ontouchmove", () => {
      moved = true;
    });
    cell.current.addEventListener("ontouchend", () => {
      if (!moved) {
        if (mode === "open") openCell(x, y);
        else cycleCellFlag(x, y);
      }
    });
  };

  const board = grid.length ? (
    <BoardTable>
      <BoardBody width={cols}>
        {grid.map((row, rowIndex) => (
          <BoardRow key={rowIndex}>
            {row.map((cell) => (
              <Cell
                ref={cellRef}
                cell={cell}
                key={`${cell.x}-${cell.y}`}
                onTouchStart={() => handleTouch(cellRef, cell.x, cell.y)}
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

  return board;
};

export default Board;
