import React from "react";
import useBoard from "../Hooks/useBoard";

import {
  BoardBody,
  BoardRow,
  BoardTable,
  Cell,
  Container,
  // Title,
} from "../Styles";
import Header from "./header/header";

const Board = () => {
  const {
    grid,
    rows,
    cols,
    mines,
    boardState,
    openCell,
    cycleCellFlag,
    displayValue,
  } = useBoard({
    rows: 10,
    cols: 10,
    mines: 15,
  });

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
    <Container>
      <Header
        grid={grid}
        rows={rows}
        cols={cols}
        mines={mines}
        boardState={boardState}
      />
      {board}
    </Container>
  );
};

export default Board;
