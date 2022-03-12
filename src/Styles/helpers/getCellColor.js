import { CellStateEnum, CellFlagEnum } from "minesweeper";

import { foreground } from "../variables";

const getCellColor = (cell, adjacentFlags) => {
  if (cell.state === CellStateEnum.CLOSED) {
    switch (cell.flag) {
      case CellFlagEnum.NONE:
        return foreground;
      default:
        return "goldenrod";
    }
  } else {
    if (cell.isMine) {
      return "darkslategray";
    }

    if (cell.numAdjacentMines > 0) {
      if (adjacentFlags === cell.numAdjacentMines) return "cornflowerblue";

      if (adjacentFlags > cell.numAdjacentMines) return "crimson";
    }

    return foreground;
  }
};

export default getCellColor;
