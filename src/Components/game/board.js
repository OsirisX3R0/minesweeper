import React, { useContext } from "react";
import { GameContext } from "../../Context/GameContext";

import { BoardBody, BoardRow, BoardTable, Cell } from "../../Styles";
import Header from "../header/header";
import Footer from "../footer/Footer";

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

  const handleClick = (x, y) => {
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
                onClick={() => handleClick(cell.x, cell.y)}
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
      <Header />
      {board}
      <Footer />
    </>
  );
};

export default Board;
