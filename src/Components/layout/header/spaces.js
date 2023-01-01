import React, { useContext } from "react";
import { FaRegSquare } from "react-icons/fa";

import { GameContext } from "../../../Context/GameContext";
import useRemainingSpaces from "../../../Hooks/useRemainingSpaces";
import { MarginRight, Remaining } from "../../../Styles";

const Spaces = () => {
  const { grid, rows, cols, mines } = useContext(GameContext);
  const [remaining, total] = useRemainingSpaces(grid, rows, cols, mines);

  return (
    <Remaining>
      <MarginRight amount="0.25rem">
        <FaRegSquare />
      </MarginRight>
      {remaining}/{total}
    </Remaining>
  );
};

export default Spaces;
