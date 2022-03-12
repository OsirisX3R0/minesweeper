import React from "react";
import { BoardStateEnum } from "minesweeper";

import { Head, Title } from "../../Styles";
import Time from "./time";
import Spaces from "./spaces";

const Header = ({ grid, rows, cols, mines, boardState }) => {
  const title =
    boardState === BoardStateEnum.WON
      ? "Victory!"
      : boardState === BoardStateEnum.LOST
      ? "Failure..."
      : "Minesweeper.";

  return (
    <Head>
      <Spaces grid={grid} rows={rows} cols={cols} mines={mines} />
      <Title>{title}</Title>
      <Time boardState={boardState} />
    </Head>
  );
};

export default Header;
