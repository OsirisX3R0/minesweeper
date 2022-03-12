import React, { useContext } from "react";
import { GameContext } from "../../Context/GameContext";

import useRemainingSpaces from "../../Hooks/useRemainingSpaces";
import { Remaining } from "../../Styles";

const Spaces = () => {
  const { grid, rows, cols, mines } = useContext(GameContext);
  const [remaining, total] = useRemainingSpaces(grid, rows, cols, mines);

  return (
    <Remaining>
      {remaining}/{total}
    </Remaining>
  );
};

export default Spaces;
