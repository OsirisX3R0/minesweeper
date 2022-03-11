import React from "react";
import { BoardStateEnum } from "minesweeper";
import useBoard from "../Hooks/useBoard";
import { BoardBody, BoardRow, BoardTable, Cell } from "../Styles";

const Board = () => {
  const { grid, cols, boardState, openCell, cycleCellFlag, displayValue } =
    useBoard({
      rows: 10,
      cols: 10,
      mines: 15,
    });

  const title =
    boardState === BoardStateEnum.WON
      ? "Victory!"
      : boardState === BoardStateEnum.LOST
      ? "Failure..."
      : "Minesweeper.";

  const onContextMenu = (e, cell) => {
    e.preventDefault();
    cycleCellFlag(cell.x, cell.y);
  };

  const board = grid.length ? (
    <BoardTable>
      <BoardBody width={cols}>
        {grid.map((row, rowIndex) => (
          <BoardRow key={rowIndex}>
            {row.map((cell) => (
              <Cell
                cell={cell}
                width={cols}
                key={`${cell.x}-${cell.y}`}
                onClick={() => openCell(cell.x, cell.y)}
                onContextMenu={(e) => onContextMenu(e, cell)}
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
      <h1>{title}</h1>
      {board}
    </>
  );
};

export default Board;
