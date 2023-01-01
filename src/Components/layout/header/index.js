import React, { useContext } from "react";
import { BoardStateEnum } from "minesweeper";

import { Head, Title } from "../../../Styles";
import Time from "./Time";
import Spaces from "./Spaces";
import { GameContext } from "../../../Context/GameContext";

const Header = () => {
  const { boardState } = useContext(GameContext);
  const title =
    boardState === BoardStateEnum.WON
      ? "Victory!"
      : boardState === BoardStateEnum.LOST
      ? "Failure..."
      : "Minesweeper.";

  return (
    <Head>
      <Spaces />
      <Title>{title}</Title>
      <Time />
    </Head>
  );
};

export default Header;
