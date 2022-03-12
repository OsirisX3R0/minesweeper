import React, { useEffect } from "react";
import { BoardStateEnum } from "minesweeper";

import useTime from "../../Hooks/useTime";
import { Clock } from "../../Styles";

const Time = ({ boardState }) => {
  const { time, stopTime } = useTime();

  useEffect(() => {
    if (boardState === BoardStateEnum.WON || boardState === BoardStateEnum.LOST)
      stopTime();
  }, [boardState, stopTime]);

  return <Clock>{time}</Clock>;
};

export default Time;
