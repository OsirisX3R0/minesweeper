import { useEffect, useMemo, useRef, useState } from "react";
import { CellStateEnum } from "minesweeper";

const useRemainingSpaces = (grid, rows, cols, mines) => {
  const spaces = useMemo(() => rows * cols - mines, [rows, cols, mines]);
  const [total, setTotal] = useState(spaces);
  const [remaining, setRemaining] = useState(spaces);
  const lastOpen = useRef(0);

  useEffect(() => {
    setTotal(spaces);
    setRemaining(spaces);
  }, [spaces]);

  useEffect(() => {
    let open =
      grid && grid.length
        ? grid.reduce((open, row) => {
            return (
              open +
              row.filter(
                (cell) => cell.state === CellStateEnum.OPEN && !cell.isMine
              ).length
            );
          }, 0)
        : 0;

    if (open !== lastOpen.current) {
      setRemaining(total - open);
      lastOpen.current = open;
    }
  }, [grid, total]);

  return [remaining, total];
  // const spaces = useMemo(() => (width * height) - mines, [width, height, mines])
  // const [remainingSpaces, setRemainingSpaces] = useState(0)
  // const [emptySpaces] = useState(spaces)
  // const [spacesLeft] = useState(spaces)

  // useEffect(() => {
  //     setRemainingSpaces(spacesLeft - openSpaces)
  // }, [spacesLeft, openSpaces, emptySpaces])

  // return [remainingSpaces, emptySpaces]
};

export default useRemainingSpaces;
