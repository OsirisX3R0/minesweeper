import React, { useEffect } from "react";
import { BoardStateEnum } from "minesweeper";

import { Head, Title, Clock, Remaining } from "../Styles";
import useTime from "../Hooks/useTime";

const Header = ({ boardState }) => {
  const { time, stopTime } = useTime();

  useEffect(() => {
    if (boardState === BoardStateEnum.WON || boardState === BoardStateEnum.LOST)
      stopTime();
  }, [boardState, stopTime]);

  const title =
    boardState === BoardStateEnum.WON
      ? "Victory!"
      : boardState === BoardStateEnum.LOST
      ? "Failure..."
      : "Minesweeper.";

  return (
    <Head>
      <Remaining>100/100</Remaining>
      <Title>{title}</Title>
      <Clock>{time}</Clock>
    </Head>
  );
};

export default Header;
