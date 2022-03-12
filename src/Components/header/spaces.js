import React from "react";

import useRemainingSpaces from "../../Hooks/useRemainingSpaces";
import { Remaining } from "../../Styles";

const Spaces = ({ grid, rows, cols, mines }) => {
  const [remaining, total] = useRemainingSpaces(grid, rows, cols, mines);

  return (
    <Remaining>
      {remaining}/{total}
    </Remaining>
  );
};

export default Spaces;
