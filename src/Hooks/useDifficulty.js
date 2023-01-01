import { useState, useEffect, useCallback } from "react";

const DIFFICULTY_DEFAULT = "medium";
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
  const [difficulty, setDifficulty] = useState(DIFFICULTY_DEFAULT);
  const difficultyChangeCallback = useCallback(callback, []);

  useEffect(() => {
    if (difficulty !== "custom")
      difficultyChangeCallback(DIFFICULTY_PRESETS[difficulty]);
  }, [difficulty, difficultyChangeCallback]);

  const resetDifficulty = () => setDifficulty(DIFFICULTY_DEFAULT);

  return { difficulty, setDifficulty, resetDifficulty };
};

export default useDifficulty;
