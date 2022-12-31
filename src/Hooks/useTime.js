import { useState, useEffect, useRef, useCallback } from "react";
import secondsHumanized from "../Utils/secondsHumanized";

const useTime = () => {
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState("");
  const interval = useRef(null);

  const startTime = useCallback(() => {
    if (!interval || !interval.current) {
      interval.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
  }, []);

  const resetTime = useCallback(() => {
    setSeconds(0);
  }, []);

  const stopTime = useCallback(() => {
    if (interval.current) clearInterval(interval.current);
  }, []);

  useEffect(() => {
    stopTime();

    return () => stopTime();
  }, [startTime, stopTime]);

  useEffect(() => {
    setTime(secondsHumanized(seconds));
  }, [seconds]);

  return { time, seconds, startTime, stopTime, resetTime };
};

export default useTime;
