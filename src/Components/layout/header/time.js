import React, { useContext, useEffect } from "react";
import { BoardStateEnum } from "minesweeper";

import useTime from "../../../Hooks/useTime";
import { Clock } from "../../../Styles";
import { GameContext } from "../../../Context/GameContext";

const Time = () => {
  const { grid, boardState } = useContext(GameContext);
  const { time, seconds, startTime, stopTime } = useTime();

  useEffect(() => {
    if (!seconds && grid.length) startTime();
  }, [seconds, grid, startTime]);

  useEffect(() => {
    if (boardState === BoardStateEnum.WON || boardState === BoardStateEnum.LOST)
      stopTime();
  }, [boardState, stopTime]);

  return <Clock>{time}</Clock>;
};

export default Time;
