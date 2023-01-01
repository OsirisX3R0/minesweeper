import { useState, useEffect, useCallback } from "react";

const DIFFICULTY_PRESETS = {
  easy: {
    rows: 8,
    cols: 8,
    mines: 10,
  },
  medium: {
    rows: 16,
    cols: 16,
    mines: 40,
  },
  hard: {
    rows: 25,
    cols: 25,
    mines: 100,
  },
};

const useDifficulty = (callback) => {
  const [difficulty, setDifficulty] = useState("medium");
  const difficultyChangeCallback = useCallback(callback, []);

  useEffect(() => {
    if (difficulty !== "custom")
      difficultyChangeCallback(DIFFICULTY_PRESETS[difficulty]);
  }, [difficulty, difficultyChangeCallback]);

  return { difficulty, setDifficulty };
};

export default useDifficulty;
