import React, { useContext } from "react";
import { GameContext } from "../../Context/GameContext";

import { BoardBody, BoardRow, BoardTable, Cell } from "../../Styles";
import Header from "../header/header";

const Board = () => {
  const { grid, cols, openCell, cycleCellFlag, displayValue } =
    useContext(GameContext);

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
      <Header />
      {board}
    </>
  );
};

export default Board;
